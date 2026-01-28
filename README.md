# **RESTAURANT CHATBOT**

A backend-driven chatbot system that streamlines restaurant ordering through an intuitive state-based conversation flow.

## 🎯 Problem
Restaurants need a simple way for customers to place orders without complex apps or human intervention.

## ✨ Solution
A fully-functional chatbot API that guides customers through an intuitive, multi-stage ordering process:
- Browse restaurant menu
- Select food items
- Review and confirm orders
- Process payments (Paystack integration - not implemented yet)
- Track order status
- Cancel or modify orders as needed

## 🚀 Key Features

### State-Driven Architecture
The chatbot uses a finite state machine with distinct conversation stages:
- **START**: Initial greeting and menu discovery
- **MENU**: Browse available menu items
- **ORDERING**: Add items to cart with quantities
- **CHECKOUT**: Review order details and total price
- **PAYMENT**: Process payment through Paystack API
- **COMPLETED**: Order confirmation
- **CANCELLED**: Order cancellation handling

### Order Management
- Create and persist orders to database
- Track multiple items per order
- Automatic price calculation
- Order history and status tracking
- Support for order cancellation

### Database Integration
- MongoDB for persistent data storage
- Models for: Orders, Menu Items, Sessions, Payments
- Automatic session creation per device
- Menu item seeding functionality

## 🛠️ Tech Stack
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **TypeScript** | Type-safe development |
| **Express.js** | Web framework & routing |
| **MongoDB** | Database |
| **Mongoose** | ODM for MongoDB |
| **Paystack API** | Payment processing |
| **UUID** | Session identification |

## 📋 Project Structure
```
src/
├── chat/                 # Chatbot logic
│   ├── chatController.ts # Main chat endpoint handler
│   ├── chatRouter.ts     # Chat routes
│   ├── chatState.ts      # State definitions
│   ├── stateRouter.ts    # State transition logic
│   └── handler/          # State-specific handlers
│       ├── startHandler.ts
│       ├── selectionHandler.ts
│       ├── orderingHandler.ts
│       ├── currentOrderHandler.ts
│       ├── checkoutHandler.ts
│       ├── paymentHandler.ts
│       ├── orderHistoryHandler.ts
│       └── cancelOrderHandler.ts
├── models/              # Database schemas
│   ├── orderModel.ts
│   ├── menuItemModel.ts
│   ├── sessionModel.ts
│   └── paymentModel.ts
├── service/             # Business logic
│   ├── sessionService.ts
│   └── paystackService.ts
├── utils/               # Helper functions
│   ├── getMenuItems.ts
│   ├── selectMenuItems.ts
│   └── showMenuItems.ts
├── middlewares/         # Express middleware
│   └── deviceMiddleware.ts
├── types/               # TypeScript definitions
├── dbconfig/            # Database configuration
├── seed/                # Database seeding
└── app.ts & server.ts   # Application entry points

public/                  # Frontend assets
├── index.html
├── script.js
└── style.css
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance
- Paystack account (for payment simulation)

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd restaurant-chatbot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB and Paystack credentials

# Seed the database with menu items
npm run seed:menu

# Start the development server
npm run dev
```

### Building for Production
```bash
# Compile TypeScript to JavaScript
npm run build

# Start the production server
npm start
```

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript (outputs to `dist/`)
- `npm start` - Run the compiled production build
- `npm run seed:menu` - Populate database with menu items

## 📡 API Endpoints

### Chat Endpoint
**POST** `/chat`

Send a message to the chatbot:
```json
{
  "message": "start"
}
```

Response:
```json
{
  "replyMessage": "Welcome to Restaurant ChatBot! What would you like to do?"
}
```

The chatbot manages session state automatically based on device ID (via cookies).

## 💡 Notes
- Sessions are stored per device/client
- Orders are persisted in MongoDB
- Payment processing simulated through Paystack API - not implement yet
- All user interactions tracked and saved
- Database seeding script populates initial menu items
- Build output is generated in the `dist/` directory (added to `.gitignore`)
- Production server runs from compiled JavaScript files