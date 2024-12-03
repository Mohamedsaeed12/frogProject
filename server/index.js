require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require("mongoose");
const helmet = require("helmet");
const { checkJwt } = require("./middleware/auth");
const apiRoutes = require("./routes/api");
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Importing new routes
const usersRoute = require("./routes/users");
const createUserRoute = require("./routes/create-user");
const loginRoute = require("./routes/login");
const resetPasswordRoute = require("./routes/reset-password");
const completeProfileRoute = require("./routes/complete-profile");
const deleteUserRoute = require("./routes/delete-user");
const userProfileRoute = require("./routes/user-profile");
const updateProfileRoute = require("./routes/update-profile");
const createEventRoute = require("./routes/create-event");
const eventsRoute = require("./routes/events");
const incidentReportRoute = require("./routes/incident-report");

// Setting up routes
app.use("/users", usersRoute);
app.use("/update-user", userProfileRoute);
app.use("/create-user", createUserRoute);
app.use("/resend-email", createUserRoute);
app.use("/login", loginRoute);
app.use("/reset-password", resetPasswordRoute);
app.use("/complete-profile", completeProfileRoute);
app.use("/delete-user/", deleteUserRoute);
app.use("/user-profile/", userProfileRoute);
app.use("/update-profile/", updateProfileRoute);
app.use("/create-event", createEventRoute);
app.use("/events", eventsRoute);
app.use("/incident-report", incidentReportRoute);

// Importing API routes
const apiRoutes = require("./routes/api");

// Setting up API routes
app.use("/api", apiRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



