require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express'); // Include the express module
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const linksRoutes = require('./src/routes/linksRoutes');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const cors = require('cors');

let isConnected = false;
const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  if (!process.env.MONGO_URI) {
    throw new Error('Database configuration error: MONGO_URI is not defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error) {
    isConnected = false;
    console.error('MongoDB connection error:', error.message);
    throw new Error('Database connection failed');
  }
};

// Initial connection attempt
connectDB().catch(() => {});

const app = express(); // Instantiate express app.

// Ensure DB is connected for serverless invocations (e.g. Vercel)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  // Skip JSON middleware for the webhook endpoint
  if (req.originalUrl.startsWith('/payments/webhook')) {
    return next();
  }

  express.json()(req, res, next);
});

app.use(cookieParser());

const clientUrls = (process.env.CLIENT_URL || '')
  .split(',')
  .map(url => url.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://affiliate-link-sharing.vercel.app',
  'https://magical-mousse-326f31.netlify.app',
  ...clientUrls
].map(url => url.replace(/\/+$/, ''));

// Safe request logging (no sensitive data logged)
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/auth')) {
    console.log(
      `[Auth API] ${req.method} ${req.originalUrl} | Origin: ${req.headers.origin || 'same-origin'} | DB ReadyState: ${mongoose.connection.readyState} | Has MONGO_URI: ${Boolean(process.env.MONGO_URI)} | Has JWT_SECRET: ${Boolean(process.env.JWT_SECRET)}`
    );
  }
  next();
});

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  const cleanOrigin = origin.replace(/\/+$/, '');

  if (defaultAllowedOrigins.includes(cleanOrigin)) return true;
  if (/^https?:\/\/localhost(:\d+)?$/.test(cleanOrigin)) return true;
  if (/^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(cleanOrigin)) return true;

  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith('.vercel.app') || hostname === 'vercel.app') return true;
    if (hostname.endsWith('.netlify.app') || hostname === 'netlify.app') return true;
  } catch (e) {
    // If URL parsing fails, ignore
  }

  return false;
};

const corsOptions = {
  origin: function (origin, callback) {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-razorpay-signature', 'x-forwarded-for']
};

app.use(cors(corsOptions));
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Affiliate Link Sharing API is running' });
});
app.use('/auth', authRoutes);
app.use('/links', linksRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);

// Global Error Handler to return standard JSON
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5001;

// Only start the server if this file is run directly (not imported as a module)
if (require.main === module) {
  app.listen(PORT, (error) => {
    if (error) {
      console.log('Error starting the server: ', error);
    } else {
      console.log(`Server is running at http://localhost:${PORT}`);
    }
  });
}

module.exports = app;