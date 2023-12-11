import asyncHandler from "express-async-handler";
import Orders from "../models/orderModel.js";
import Product from "../models/productModels.js";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    products,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (products && products.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Orders({
      products,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      status: 0,
      shippingPrice,
      totalPrice,
      orderedAt: new Date().getTime(),
    });

    const createdOrder = await order.save();
    if (createdOrder) {
      const config = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      };

      let transporter = nodemailer.createTransport(config);

      var mailGenerator = new Mailgen({
        theme: "default",
        product: {
          // Appears in header & footer of e-mails
          name: "Mailgen",
          link: "https://mailgen.js/",
          // Optional product logo
          // logo: 'https://mailgen.js/img/logo.png'
        },
      });

      var email = {
        body: {
          name: "HIILKAAB",
          intro: "NEW ORDER",
          table: {
            data: [
              {
                oderId: order._id,
                name: req.user.name,
                phone: req.user.phone,
              },
            ],
          },
          action: {
            instructions: "To get full details, please click here:",
            button: {
              color: "#22BC66", // Optional action button color
              text: "See the order",
              link: `https://nasiib.onrender/order/${order._id}`,
            },
          },

          outro: "MAHADSANID",
        },
      };

      var emailBody = mailGenerator.generate(email);

      let message = {
        from: "developerkaahiye@gmail.com",
        to: "kaah6978@gmail.com",
        subject: "NEW ORDER",
        html: emailBody,
      };

      transporter.sendMail(message);

      res.status(201).json(createdOrder);
    } else {
      res.status(500).json({ error: "test" });
    }
  }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItemsEvc = asyncHandler(async (req, res) => {
  const {
    products,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (products && products.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Orders({
      products,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      status: 1,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      orderedAt: new Date().getTime(),
    });

    const createdOrder = await order.save();
    const config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    };

    let transporter = nodemailer.createTransport(config);

    var mailGenerator = new Mailgen({
      theme: "default",
      product: {
        // Appears in header & footer of e-mails
        name: "Mailgen",
        link: "https://mailgen.js/",
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      },
    });

    var email = {
      body: {
        name: "HIILKAAB",
        intro: "NEW ORDER",
        table: {
          data: [
            {
              oderId: order._id,
              name: req.user.name,
              phone: req.user.phone,
            },
          ],
        },
        action: {
          instructions: "To get full details, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "See the order",
            link: `https://nasiib.onrender/order/${order._id}`,
          },
        },

        outro: "MAHADSANID",
      },
    };

    var emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL,
      to: "kaah6978@gmail.com",
      subject: "NEW ORDER",
      html: emailBody,
    };

    transporter.sendMail(message);
    res.status(201).json(createdOrder);
  }
});

export const addOrderItems2 = asyncHandler(async (req, res) => {
  try {
    const {
      cartproducts,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
    } = req.body;
    let products = [];

    for (let i = 0; i < cartproducts.length; i++) {
      let product = await Product.findById(cartproducts[i].product.id);
      if (product) {
        if (product.countInStock >= cartproducts[i].quantity) {
          product.countInStock -= cartproducts[i].quantity;
          products.push({
            product,
            quantity: cartproducts[i].quantity,
            name: product.name,
            images: cartproducts[i].images,
            price: cartproducts[i].price,
            sizes: cartproducts[i].sizes,
            colors: cartproducts[i].colors,
          });
          await product.save();
        } else {
          return res
            .status(400)
            .json({ message: `${product.name} is out of stock!` });
        }
      } else {
        return res.status(404).json({ message: `not found!` });
      }
    }

    let user = await User.findById(req.user);
    user.cart = [];
    user = await user.save();

    let order = new Orders({
      products,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      status: 0,
      orderedAt: new Date().getTime(),
    });
    order = await order.save();

    const config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    };

    let transporter = nodemailer.createTransport(config);

    var mailGenerator = new Mailgen({
      theme: "default",
      product: {
        // Appears in header & footer of e-mails
        name: "Mailgen",
        link: "https://mailgen.js/",
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      },
    });

    var email = {
      body: {
        name: "HIILKAAB",
        intro: "NEW ORDER",
        table: {
          data: [
            {
              oderId: order._id,
              name: req.user.name,
              phone: req.user.phone,
            },
          ],
        },
        action: {
          instructions: "To get full details, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "See the order",
            link: `https://nasiib.onrender/order/${order._id}`,
          },
        },

        outro: "MAHADSANID",
      },
    };

    var emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL,
      to: "kaah6978@gmail.com",
      subject: "NEW ORDER",
      html: emailBody,
    };

    transporter.sendMail(message);

    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.id)
    .populate("user")
    .populate("products.product")
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid2 = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // order.paymentResult = {
    //   id: req.body.id,
    //   status: req.body.status,
    //   update_time: req.body.update_time,
    //   phoneNumber: req.body.phoneNumber
    // }
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Orders.find({ user: req.user._id })
    .populate("user")
    .populate("products.product")
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrdersAll = asyncHandler(async (req, res) => {
  const orders = await Orders.find({});

  let counter2 = 0;
  for (let i = 0; i < orders.length; i++) {
    counter2++;
  }
  let allOrder;
  const orders2 = await Orders.find({ isPaid: true });
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  let real = addDecimals(
    (allOrder = orders2.reduce((acc, item) => acc + item.totalPrice, 0))
  );
  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }
  let real2 = kFormatter(real);
  counter2 = kFormatter(counter2);
  res.json({ counter2, real, real2 });
});

// @desc    Get All orders
// @route   GET /api/orders
// @access  Private/admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Orders.find({})
    .populate("user")
    .populate("products.product")
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get All orders
// @route   GET /api/orders
// @access  Private/admin
export const getRecentOrders = asyncHandler(async (req, res) => {
  const start = new Date().toDateString();

  const orders = await Orders.find({ createdAt: { $gte: start } })
    .populate("user")
    .populate("products.product")
    .sort({ createdAt: -1 });

  res.json(orders);
});

// @desc    Get All orders
// @route   GET /api/orders
// @access  Private/admin
export const getRecentOrders2 = asyncHandler(async (req, res) => {
  const start = new Date().toDateString();

  const orders = await Orders.find({ createdAt: { $gte: start } })
    .populate("user")
    .populate("products.product")
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrdersApp = asyncHandler(async (req, res) => {
  try {
    const orders = await Orders.find({ user: req.params.id })
      .populate("user")
      .populate("products.product")
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Get All orders
// @route   GET /api/orders
// @access  Private/admin
export const getOrdersByPhone = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const user = await User.find({ phone: phone });

  if (user) {
    const orders = await Orders.find({ user: user })
      .populate("user")
      .populate("products.product")
      .sort({ createdAt: -1 });
    res.json(orders);
  }
});

// @desc    Get All orders
// @route   GET /api/orders
// @access  Private/admin
export const getOrdersByPendding = asyncHandler(async (req, res) => {
  try {
    const orders = await Orders.find({ status: 0 })
      .populate("user")
      .populate("products.product")
      .sort({ createdAt: -1 });

    if (orders) {
      res.json(orders);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Get All orders
// @route   GET /api/orders
// @access  Private/admin
export const getOrdersByProcess = asyncHandler(async (req, res) => {
  try {
    const orders = await Orders.find({ status: 1 })
      .populate("user")
      .populate("products.product")
      .sort({ createdAt: -1 });
    if (orders) {
      res.json(orders);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Get All orders
// @route   GET /api/orders
// @access  Private/admin
export const getOrdersByComplete = asyncHandler(async (req, res) => {
  try {
    const orders = await Orders.find({ status: 3 })
      .populate("user")
      .populate("products.product")
      .sort({ createdAt: -1 });
    if (orders) {
      res.json(orders);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Get All orders
// @route   GET /api/orders
// @access  Private/admin
export const getAllOrdersApp = asyncHandler(async (req, res) => {
  const orders = await Orders.find({})
    .populate("user")
    .populate("products.product")
    .sort({ createdAt: -1 });
  res.json(orders);
});

// change orders status
export const changeOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { id, status, isPaid, isDelivered } = req.body;
    let order = await Orders.findById(id);
    if (order) {
      order.status = status;
      order.isPaid = isPaid;
      if (isPaid) {
        order.paidAt = Date.now();
      }

      order.isDelivered = isDelivered;
      if (isDelivered) {
        order.deliveredAt = Date.now();
      }

      order = await order.save();
      res.json(order);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
