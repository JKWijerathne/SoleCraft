import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// Helper: get uploaded image path
const getImagePath = (req) => {
  if (!req.file) return null;

  // If using multer diskStorage
  return `/uploads/${req.file.filename}`;

  // If you use Cloudinary later, change this to:
  // return req.file.path;
};

// Helper: convert checkbox/string values to boolean
const parseBoolean = (value) => {
  if (value === true) return true;
  if (value === false) return false;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'on') return true;
  return false;
};

// Helper: parse sizes from FormData
const parseSizes = (sizes) => {
  if (!sizes) return [];

  if (Array.isArray(sizes)) {
    return sizes;
  }

  try {
    const parsed = JSON.parse(sizes);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return sizes
      .split(',')
      .map((size) => size.trim())
      .filter(Boolean);
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

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
    });
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

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: 'Cannot delete your own account',
      });
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
      name,
      description,
      price,
      category,
      gender,
      type,
      occasion,
      sizes,
      countInStock,
      stock,
      isSale,
      sale,
      discountPrice,
    } = req.body;

    const imagePath = getImagePath(req);

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: 'Name, description, price, and category are required',
      });
    }

    if (!imagePath) {
      return res.status(400).json({
        message: 'Product image is required',
      });
    }

    const saleStatus = parseBoolean(isSale ?? sale);
    const stockValue = countInStock ?? stock ?? 0;

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      image: imagePath,
      category,

      gender,
      type,
      occasion,
      sizes: parseSizes(sizes),
      countInStock: Number(stockValue),
      stock: Number(stockValue),
      isSale: saleStatus,
      sale: saleStatus,
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
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

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const {
      name,
      description,
      price,
      category,
      gender,
      type,
      occasion,
      sizes,
      countInStock,
      stock,
      isSale,
      sale,
      discountPrice,
    } = req.body;

    const imagePath = getImagePath(req);

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price !== undefined ? Number(price) : product.price;
    product.category = category ?? product.category;

    if (imagePath) {
      product.image = imagePath;
    }

    // Optional fields. These work only if your Product model has them.
    product.gender = gender ?? product.gender;
    product.type = type ?? product.type;
    product.occasion = occasion ?? product.occasion;

    if (sizes !== undefined) {
      product.sizes = parseSizes(sizes);
    }

    if (countInStock !== undefined || stock !== undefined) {
      const stockValue = countInStock ?? stock;
      product.countInStock = Number(stockValue);
      product.stock = Number(stockValue);
    }

    if (isSale !== undefined || sale !== undefined) {
      const saleStatus = parseBoolean(isSale ?? sale);
      product.isSale = saleStatus;
      product.sale = saleStatus;
    }

    if (discountPrice !== undefined) {
      product.discountPrice =
        discountPrice === '' ? undefined : Number(discountPrice);
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

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

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

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

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

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.deleteOne();

    res.json({ message: 'Order removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};