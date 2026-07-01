import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { uploadToCloudinary } from '../utils/imageUpload.js';


// Helper: convert various truthy representations to boolean
const parseBoolean = (value) => {
  if (value === true || value === 'true' || value === 'on') return true;
  if (value === false || value === 'false' || value === 'off') return false;
  return false;
};

// Helper: parse sizes from FormData
const parseSizes = (sizes) => {
  if (!sizes) return [];
  if (Array.isArray(sizes)) return sizes;
  try {
    const parsed = JSON.parse(sizes);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return sizes.split(',').map((s) => s.trim()).filter(Boolean);
  }
};

// @desc    Get admin dashboard summary stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    res.json({ totalUsers, totalProducts, totalOrders, totalRevenue, recentOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await user.deleteOne();
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get all products for admin
// @route   GET /api/admin/products
// @access  Private/Admin
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product with uploaded image
// @route   POST /api/admin/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name, description, price, category,
      gender, type, occasion, sizes,
      countInStock, isSale, discountPrice,
    } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: 'Name, description, price, and category are required',
      });
    }

    // FIX: image now uploaded to Cloudinary (was local disk path before).
    // adminRoutes.js must pass the file through upload.single('image') multer middleware.
    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required' });
    }
    const imageUrl = await uploadToCloudinary(req.file.buffer, 'products');

    const saleStatus = parseBoolean(isSale);

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      image: imageUrl,
      category,
      gender: gender || '',
      type: type || '',
      occasion: occasion || '',
      sizes: parseSizes(sizes),
      countInStock: Number(countInStock ?? 0),
      // FIX: removed phantom field writes — product.stock and product.sale
      // do not exist in the Product schema and were silently ignored before.
      isSale: saleStatus,
      discountPrice: discountPrice ? Number(discountPrice) : 0,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update product with optional new image
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const {
      name, description, price, category,
      gender, type, occasion, sizes,
      countInStock, isSale, discountPrice,
    } = req.body;

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price !== undefined ? Number(price) : product.price;
    product.category = category ?? product.category;
    product.gender = gender ?? product.gender;
    product.type = type ?? product.type;
    product.occasion = occasion ?? product.occasion;

    if (sizes !== undefined) {
      product.sizes = parseSizes(sizes);
    }

    if (countInStock !== undefined) {
      // FIX: only writing to the real schema field countInStock.
      // The phantom product.stock write has been removed.
      product.countInStock = Number(countInStock);
    }

    if (isSale !== undefined) {
      // FIX: only writing to the real schema field isSale.
      // The phantom product.sale write has been removed.
      product.isSale = parseBoolean(isSale);
    }

    if (discountPrice !== undefined) {
      product.discountPrice = discountPrice === '' ? 0 : Number(discountPrice);
    }

    // FIX: image now uploaded to Cloudinary (consistent with productController.js)
    if (req.file) {
      product.image = await uploadToCloudinary(req.file.buffer, 'products');
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark order as delivered
// @route   PUT /api/admin/orders/:id/deliver
// @access  Private/Admin
export const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (!order.isPaid) {
      return res.status(400).json({
        message: 'Order must be paid before marking as delivered',
      });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await order.deleteOne();
    res.json({ message: 'Order removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};