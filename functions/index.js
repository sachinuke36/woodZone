const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51PCOnGSF0RAghyHwuHNUSvE6F2COrFp4Nfp8zhpcBT5dCCXNoIF0GUzVcjhKBDWCS33Pwhi22xwMW1z6aVohzAoA00hjQ047ZN');

// App config
const app = express();

// Middlewares
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'], // Add other allowed methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Add other allowed headers if needed
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
});

app.post('/payment/create', async (req, res) => {
    try {
        const { total } = req.body;
            console.log('body.........',req.body);
        // Validate total
        if (typeof total !== 'number' || total <= 0) {
            throw new Error('Invalid total amount');
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'inr',
        });

        // Send client secret in response
        res.status(201).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).send({ error: 'An error occurred while processing the payment' });
    }
});

// Listen command
exports.api = functions.https.onRequest(app);
