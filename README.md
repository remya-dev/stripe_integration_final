# PaymentIntents One-time payments using REACT

This sample shows how to build a card form to take a payment using the [Payment Intents API](https://stripe.com/docs/payments/payment-intents), [Stripe Elements](https://stripe.com/payments/elements) and [React](https://reactjs.org/).

## Features

This sample consists of a `client` in React and a `server` in Node.

## How to run locally

To run this sample locally you need to start both a local dev server for the `front-end` and another server for the `back-end`.

You will need a Stripe account with its own set of [API keys](https://stripe.com/docs/development#api-keys).

Follow the steps below to run locally.

**1. Clone and configure the sample**

**Installing and cloning manually**

```
git clone https://github.com/remya-dev/stripe_integration_final
```

Copy the .env_sample file into a file named .env in the folder of the server you want to use. For example:

```
cp .env_sample server/.env
```

You will need a Stripe account in order to run the demo. Once you set up your account, go to the Stripe [developer dashboard](https://stripe.com/docs/development#api-keys) to find your API keys. Run stripe listen for webhook secret key

```
STRIPE_PUBLISHABLE_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
STRIPE_WEBHOOK_SECRET=<replace-with-your-webhook-secret-key>
```

### Install Node modules
1. Go to `/server`
2. Run $ npm install stripe --save

### Running the API server

1. Go to `/server`
2. npm start

1. Go to `/client`'
2. Run $ npm install --save react-stripe-elements

### Running the React client

1. Go to `/client`
2. Run npm start and your default browser should now open with the front-end being served from `http://localhost:3000/`.
3. Enter your name and Stripe test card details.
4. Hit "Pay"
5. `/server/Output.txt` is the log file that contains successful payment IDs. When using the API server, it logs as `From API ....`

### Testing webhooks locally

1. Go to `/server`. (make sure your server is also running in another terminal via npm start and you have Stripe CLI installed)
2. Run $stripe listen --forward-to http://localhost:4242/webhook
3. The server is ready to listen.
4. Go to `/client` and run the command $ stripe trigger payment_intent.succeeded.
5. On the 'Listen' tab this should be seen ... [200 POST] OK payment_intent.succeeded.
6. You should also see “PaymentIntent was successful!” printed in the terminal tab your server is running.
7. In `/server/Output.txt`, a succesfull paymentIntent id log mentioning `From Stripe CLI...`

