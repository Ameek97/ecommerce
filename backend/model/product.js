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
      validate: {
        validator: function (value) {
          return value == null || value < this.price;
        },
        message: "Discount price should be lower than the product price",
      },
    },

    currency: {
      type: String,
      default: "USD",
      trim: true,
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

    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot be above 5"],
      set: (value) => Math.round(value * 10) / 10,
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
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;