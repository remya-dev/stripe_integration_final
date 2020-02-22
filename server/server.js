const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { resolve } = require("path");



app.get("/", (req, res) => {
  res.send("Hello from API");
});

app.get("/public-key", (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.get("/product-details", (req, res) => {
  let data = getProductDetails();
  res.send(data);
});

app.post("/create-payment-intent", async (req, res) => {
  const body = req.body;
  const productDetails = getProductDetails();

  const options = {
    ...body,
    amount: productDetails.amount,
    currency: productDetails.currency
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create(options);
    res.json(paymentIntent);
	fs.appendFileSync('Output.txt', 'From API    ' +paymentIntent.id+ '\n');


  } catch (err) {
    res.json(err);
  }


});

let getProductDetails = () => {
  return { currency: "SGD", amount: 1200 };
};

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  let event;

  try {
    event = JSON.parse(request.body);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!')
	fs.appendFileSync('Output.txt', 'From Stripe CLI    ' +paymentIntent.id+ '\n');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!')
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
});
app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));