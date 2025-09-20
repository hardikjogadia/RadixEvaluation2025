const express = require("express");
const morgan = require("morgan");
const authRouter = require("./routes/authRoute");
const viewRouter = require("./routes/viewRoute");
const vendorRouter = require("./routes/vendorRoute");
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use("/api/auth/vendor", authRouter);
app.use("/api/vendors", vendorRouter);
app.use("/", viewRouter);

module.exports = app;
