# Affiliate Link Sharing Platform

A full-stack MERN application aimed at helping users share affiliate links, track their performance through analytics, and manage subscriptions via payment integration.

## Features

- **User Authentication**: Secure login and registration using JWT and Google OAuth.
- **Link Management**: Create, update, delete, and share affiliate links.
- **Analytics Dashboard**: Track clicks and engagement for your shared links.
- **Payment Integration**: Razorpay integration for subscription management and credit purchases.
- **Role-Based Access Control**: Manage permissions for different user roles.
- **Responsive UI**: Built with React and Material UI for a seamless experience across devices.

## Tech Stack

### Frontend
- **React.js**: UI Library
- **Redux Toolkit**: State Management
- **Material UI (MUI)**: Component Library
- **Bootstrap**: Styling Framework
- **Chart.js**: Analytics Visualization
- **Axios**: HTTP Client

### Backend
- **Node.js & Express**: Server Runtime and Framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication
- **Razorpay**: Payment Gateway
- **Nodemailer**: Email Services
- **Cloudinary**: Image Management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AffiliateLinkSharing.git
   cd AffiliateLinkSharing
   ```

2. **Install Dependencies**

   **Server:**
   ```bash
   cd server
   npm install
   ```

   **Client:**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Server Environment Variables**
   Create a `.env` file in the `server` directory (use `.env.example` as a reference):
   ```env
   MONGO_URI=mongodb://localhost:27017/affiliate_link_sharing
   JWT_SECRET=your_secret_key
   JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   PORT=5001
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

2. **Client Configuration**
   Check `client/src/config` for any necessary frontend configurations.

### Running the Application

1. **Start the Server**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:5001`.

2. **Start the Client**
   ```bash
   cd client
   npm start
   ```
   The application will run on `http://localhost:3000`.

## License
This project is licensed under the ISC License.
