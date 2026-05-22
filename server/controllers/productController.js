import Product from '../models/Product.js';
import { uploadToCloudinary } from '../utils/imageUpload.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  const {
    name, price, description, category, countInStock,
    type, occasion, style, sizes, isSale, discountPrice,
  } = req.body;

  try {
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    // sizes may come as a comma-separated string from FormData
    const sizesArray = sizes
      ? String(sizes).split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const product = new Product({
      name,
      price,
      description,
      image: imageUrl || 'https://via.placeholder.com/150',
      category,
      countInStock,
      type: type || '',
      occasion: occasion || '',
      style: style || '',
      sizes: sizesArray,
      isSale: isSale === 'true' || isSale === true,
      discountPrice: discountPrice ? Number(discountPrice) : 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  const {
    name, price, description, category, countInStock,
    type, occasion, style, sizes, isSale, discountPrice,
  } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      product.type = type !== undefined ? type : product.type;
      product.occasion = occasion !== undefined ? occasion : product.occasion;
      product.style = style !== undefined ? style : product.style;
      product.isSale = isSale !== undefined
        ? (isSale === 'true' || isSale === true)
        : product.isSale;
      product.discountPrice = discountPrice !== undefined
        ? Number(discountPrice)
        : product.discountPrice;

      if (sizes !== undefined) {
        product.sizes = String(sizes).split(',').map((s) => s.trim()).filter(Boolean);
      }

      if (req.file) {
        product.image = await uploadToCloudinary(req.file.buffer);
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
