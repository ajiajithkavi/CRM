const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
require('./config/passport');
const cors = require('cors'); // ✅ Allow frontend to access backend
require('dotenv').config();
const BookRoutes = require('./routes/Booking');

const passwordRoutes = require('./routes/password');

const app = express();

app.use(cors()); // ✅ Allow cross-origin requests (if calling from frontend)


// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));
app.use('/password', require('./routes/password'));
app.use('/auth', passwordRoutes);
app.use('/api', BookRoutes);


app.get('/', (req, res) => res.send("Welcome to Node Auth API"));



app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });



