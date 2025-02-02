# Book-Shop

A robust and efficient backend application built using **Express.js** , **Mongoose** and **TypeScript**. This project is designed to serve as a boilerplate for creating scalable server-side applications.

---

## 🚀 Live Demo
https://book-shop-kappa-woad.vercel.app


---

## 🛠 Features

- **TypeScript Support:** Leveraging the power of TypeScript for better type safety and development experience.
- **Express Framework:** A minimal and flexible Node.js web application framework for building robust APIs.
- **Environment Management:** Easily configurable environment variables using `dotenv`.
- **Code Quality Tools:** Integrated with **ESLint** and **Prettier** for consistent code formatting and linting.
- **Hot Reloading:** Development with `ts-node-dev` for live updates without restarting the server.
- **Modular Structure:** Clean and maintainable code structure for scalability.

---

## 🛑 Prerequisites

Ensure you have the following installed:

- **Node.js** (version 16 or above)
- **npm** (or **yarn**, depending on your preference)

---

## 🛠️ Setup and Usage

### Step 1: Clone the Repository

```bash
git clone https://github.com/MdSaifulIslamRafsan/Book-Shop.git
cd Book-Shop
```
### Step 2: Install Dependencies
npm install
### Step 3: Configure Environment Variables
Create a .env file in the root directory and add your configuration. Example:
```sh
PORT=5000
DB_URL=your_database_url
```

### Step 4: Run the Application
Development Mode:
```sh
npm run start:dev
```

Production Mode:
```sh
npm run build
npm run start or npm run start:prod
```

### Step 5: Lint and Format Code
 
- To check for linting errors:

```sh
npm run lint
```

- To automatically fix linting issues:

```sh
npm run lint:fix
```

- To format code using Prettier:

```sh
npm run format
```
📚 Technologies Used
- Backend: Node.js, Express.js
- Programming Language: TypeScript
- Database: MongoDB (with mongoose for schema management)
- Environment Management: dotenv
- **Development Tools:**
- ESLint: Ensures code quality and consistency.
- Prettier: For automatic code formatting.
- ts-node-dev: Enables hot-reloading in development.

📂 Project Structure
```sh
├── .env                         # Environment variables
├── .eslint.config.mjs           # ESLint configuration
├── .prettierrc.json             # Prettier configuration
├── package-lock.json            # Automatically generated lock file (npm)
├── package.json                 # Project metadata and dependencies
├── README.md                    # Project documentation
├── tsconfig.json                # TypeScript configuration
└── src
    ├── app.ts                   # Main application entry point (for middleware, error handling)
    ├── server.ts                # Server setup (API initialization)
    ├── config.ts                # Configuration settings for the application (e.g., database, API keys)
    └── modules
        ├── products             # Folder for the products module
            ├── product.controller.ts  # Controller handling API requests for products
            ├── product.interface.ts   # TypeScript interfaces for product data
            ├── product.model.ts       # Mongoose model for product schema
            ├── product.router.ts      # Routing logic for product-related endpoints
            └── product.service.ts     # Business logic related to products
        ├── orders               # Folder for the orders module
            ├── order.controller.ts    # Controller for managing order requests
            ├── order.interface.ts     # Interfaces for order data
            ├── order.model.ts         # Mongoose model for order schema
            ├── order.router.ts        # Routing logic for order-related endpoints
            └── order.service.ts        
```
### 🤝 Contribution
We welcome contributions to enhance this project! Please feel free to fork the repository, submit pull requests, or report issues.
### 📞 Support
If you encounter any issues or have suggestions, please feel free to contact the author at:

### Email: mdsaifulislamrafsan099@gmail.com
