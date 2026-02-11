const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory store for OTPs (In production, use Redis/Database)
const otpStore = {};

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify Transporter
transporter.verify((error, success) => {
    if (error) {
        console.log('Error with email server:', error);
    } else {
        console.log('Email server is ready to take messages');
    }
});

// Helper to generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Route: Send OTP
app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const otp = generateOTP();
    otpStore[email] = {
        otp,
        expires: Date.now() + 10 * 60 * 1000 // 10 minutes expiry
    };

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP - Health & Wellness',
        text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
        res.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
});

// Route: Verify OTP
app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const record = otpStore[email];

    if (!record) {
        return res.status(400).json({ success: false, message: 'OTP not found. Request a new one.' });
    }

    if (Date.now() > record.expires) {
        delete otpStore[email];
        return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    if (record.otp === otp) {
        delete otpStore[email]; // Clear OTP after success
        // In a real app, you might issue a temporary token here to allow password reset
        res.json({ success: true, message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
