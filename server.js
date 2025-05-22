const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
require('./config/passport');
const cors = require('cors'); //  Allow frontend to access backend
require('dotenv').config();

// Import routes
const BookRoutes = require('./routes/Booking');
const passwordRoutes = require('./routes/password');
const propertyRoutes = require('./routes/property.route');
const leadRoutes = require('./routes/lead.route');
const vendorsRoutes = require('./routes/vendorsRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const builderRoutes = require('./routes/builderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const brokerRoutes = require('./routes/brokerRoutes');
const reportRoutes = require('./routes/reportRoutes');
const clientRoutes = require('./routes/clientRoutes');
const calenderRoutes = require('./routes/calenderRoutes');
const userRoutes = require('./routes/userRoutes');
const propertyGetRoutes = require("./routes/PropertyGet.router");
const userDashboardRoutes = require('./routes/userdashboardRoutes');
const maintenancerequestRoutes = require('./routes/maintenancerequestRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const rentalpaymentRoutes = require('./routes/rentalpaymentRoutes');
const propertydashboardRoutes = require('./routes/propertydashboardRoutes');


const app = express();

app.use(cors()); 
app.use(express.json());


// Connect to MongoDB
connectDB();


app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/authRoutes'));
app.use('/password', require('./routes/password'));
app.use('/auth', passwordRoutes);
app.use('/api', BookRoutes);
app.use('/property', propertyRoutes);
app.use("/api/propertiesGet", propertyGetRoutes);
app.use('/lead', leadRoutes);
app.use('/vendors', vendorsRoutes);
app.use('/enquiry', enquiryRoutes);
app.use('/admin', adminRoutes);
app.use('/broker', brokerRoutes);
app.use('/builder', builderRoutes);
app.use('/report', reportRoutes);
app.use('/client', clientRoutes);
app.use('/calender', calenderRoutes);
app.use('/user', userRoutes);
app.use('/userdashboard', userDashboardRoutes);
app.use('/maintenancerequest', maintenancerequestRoutes);
app.use('/rentalpayment', rentalpaymentRoutes);
app.use('/tenant', tenantRoutes);
app.use('/propertydashboard', propertydashboardRoutes);




app.get('/', (req, res) => res.send("Welcome to Node Auth API"));



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

 