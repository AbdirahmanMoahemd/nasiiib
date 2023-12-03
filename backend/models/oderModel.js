import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        images: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        sizes: [
          {
            type: String,
          },
        ],
        colors: [
          {
            type: String,
          },
        ],
        name: { type: String },
        images: [
          {
            type: String,
          },
        ],
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    status: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      phoneNumber: { type: String },
      country: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_adress: { type: String },
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderedAt: {
      type: Number,
    },
    paidAt: {
      type: Date,
    },
    date: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Oder = mongoose.model("Oder", orderSchema);

export default Oder;
