import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, "A product id is required"],
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: [true, "A product name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "A product description is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "A category is required"],
      trim: true,
      index: true,
    },

    subCategory: {
      type: String,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "A product price is required"],
      min: [0, "Price cannot be negative"],
    },

    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
      
      validate:{

        validator:function(el){
           return discount > this.price },

        message:"discount cannot be greater than price "   
      }


    },


    stock: {
      type: Number,
      required: [true, "Stock is required"],
      default: 0,
      min: [0, "Stock cannot be negative"],
    },

    images: {
      type: [String],
      default: [],
    },

    thumbnail: {
      type: String,
      trim: true,
    },

    colors: {
      type: [String],
      default: [],
    },

    sizes: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },


    ratingsQuantity: {
      type: Number,
      default: 0,
      min: [0, "Ratings quantity cannot be negative"],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;