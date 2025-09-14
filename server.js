const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const connectMongo = require('./server/database/connect');
const path = require('path');

const PORT = process.env.PORT || 3100;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // đảm bảo dùng đúng thư mục views

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // hỗ trợ parse JSON cho API
app.use(express.static('assets'));
app.use(morgan('tiny'));

// Connect to Database
connectMongo();

// Load the routes
app.use('/', require('./server/routes/routes'));

// 404 handler
app.use((req, res, next) => {
    const error = new Error("Page Not Found");
    error.status = 404;
    res.status(404).render('error', {
        title: '404 Not Found',
        message: error.message,
        error
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("🔥 Error caught:", err.message);

    res.status(err.status || 500);
    res.render("error", {
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : {}
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    console.log(`Welcome to the Drug Monitor App at http://localhost:${PORT}`);
});