import Product from "./../model/product.js";
import errApp from "../../errorApp.js";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      products,
    });
  } catch (err) {
    return next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new errApp("Product not found", 404));}

    res.status(200)
    .json({
      product,
    });
  } catch (err) {
    return next(err);}
};


const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      product,
    });
  } catch (err) {
    return next(err);
  }
};



const updateProduct = async(req, res, next )=>{
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new errApp("Product not found", 404));
    }

    const { name, price, description, category, stock } = req.body;

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;

    const updatedProduct = await product.save();

    res.status(200).json({
      product: updatedProduct,
    });
  } catch (err) {
    return next(err);
  }
};

export { getAllProducts, getProductById, createProduct, updateProduct };





const deleteProduct = async(req, res, next )=>{

   const prod = await Product.findById(req.params.id);
   
  if(!prod){return next(new errApp("Product not found", 404));}
   
   await Product.findByIdAndDelete(req.params.id);

   res.status(200)
      .json({status: "success"}) 

};

export { deleteProduct };