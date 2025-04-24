# 🛍️ Redux E-Commerce

This project is a simple e-commerce application built using React and Redux. It demonstrates state management with Redux for adding, removing, and managing items in a shopping cart and includes Firebase Auth, Firestore storage, and Razorpay integration.

🔗 **Live Demo:** [https://sid-store.vercel.app/](https://sid-store.vercel.app/)

## 🚀 Features

- Add/remove products from the cart
- Update product quantities
- Display total price and item count
- Persistent state using Redux
- User login/signup via Firebase Authentication
- Sync and store cart data in Firestore for logged-in users
- Checkout integration with Razorpay (test mode)
- Responsive UI with smooth animations using Motion & Lenis

## 🔐 Firebase Integration

- **Authentication**: Firebase Auth is used to handle user login and signup with email/password or with Google.
- **Firestore**: When a user is authenticated, their cart is synced and stored in Firestore. This ensures data persistence across sessions and devices.

## 🛠️ Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/redux-ecomCart.git
    ```
2. Navigate to the project directory:
    ```bash
    cd redux-ecomCart
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:

    Create a `.env` file in the root directory and add your Firebase and Razorpay credentials:

    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    VITE_RAZORPAY_KEY=your_razorpay_test_key
    ```

## ▶️ Usage

1. Start the development server:
    ```bash
    npm start
    ```
2. Open your browser and navigate to `http://localhost:5173`.

## 📂 Folder Structure

```
redux-ecomCart/
├── public/            # Static assets
├── src/
│   ├── app/           # Redux actions, and reducers
│   ├── assets/        # Other assets
│   ├── components/    # Reusable components
│   ├── store/         # Redux store
│   ├── util/          # Firebase utility
│   ├── App.jsx        # Main app component
│   ├── firebase.js    # Firebase config file
│   └── main.jsx       # Entry point
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## 🛠️ Technologies Used

- React
- Redux Toolkit
- JavaScript (ES6+)
- Tailwind CSS
- Framer Motion
- Firebase (Auth + Firestore)
- Lenis (smooth scrolling)
- Razorpay (test mode)
- Vite (build tool)

## 🧾 Credits

- 🛍️ **FakeStoreAPI** - For providing the backend product data  
  [https://fakestoreapi.in](https://fakestoreapi.in)

## 📦 Deployment

This app is deployed using **Vercel**:  
🌐 [https://sid-store.vercel.app/](https://sid-store.vercel.app/)

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a branch, make changes, and submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
