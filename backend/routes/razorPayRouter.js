const express = require("express");
var router = express.Router();
const axios = require("axios");
const Razorpay = require("razorpay");
const request = require("request");

const RazorPayKeys = {
  IdKey: "insert from the apis in razor pay dash board",
  SecretKey: "insert from the apis in razor pay dash board",
};

const razorpayInstance = new Razorpay({
  key_id: RazorPayKeys.IdKey,
  key_secret: RazorPayKeys.SecretKey,
});

router.get("/order", (req, res) => {
  try {
    const options = {
      amount: 500 * 100,
      currency: "INR",
      receipt: "receipt#1",
    };

    razorpayInstance.orders.create(options, function (err, order) {
      console.log("error while creating order ", order);
      if (err) {
        return res.status(500).json({
          message: "there has been a error",
          error: err,
        });
      }
      res.status(200).json(order);
    });
  } catch (error) {
    console.log(error);
  }
});

// capturing a payment
router.post("/capture/:paymentId", (req, res) => {
  try {
    return request(
      {
        method: "POST",
        url: `https://${RazorPayKeys.IdKey}:${RazorPayKeys.SecretKey}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: 10 * 100,
          currency: "INR",
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: "Something error!s",
          });
        }
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
