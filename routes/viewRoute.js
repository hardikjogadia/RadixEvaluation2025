const fs = require("fs");
const express = require("express");
const indexHtml = fs.readFileSync(`${__dirname}/../public/index.html`, 'utf-8');
const registerHtml = fs.readFileSync(`${__dirname}/../public/register.html`, 'utf-8');
const loginHtml = fs.readFileSync(`${__dirname}/../public/login.html`, 'utf-8');
const updateHtml = fs.readFileSync(`${__dirname}/../public/update.html`, 'utf-8');
const vendorDashboardHtml = fs.readFileSync(`${__dirname}/../public/vendor-dashboard.html`, 'utf-8');

const viewLandingPage = (req, res) => {
    res.writeHead(200, {
        "Content-type": "text/html"
    });
    res.end(indexHtml);
};

const vendorDashboard = (req, res) => {
    res.writeHead(200, {
        "content-type": "text/html"
    })
    res.end(vendorDashboardHtml);
};

const updateVendorPage = (req, res) => {
    res.writeHead(200, {
        "content-type": "text/html"
    })
    res.end(updateHtml);
};

const getRegisterPage = (req, res) => {
    res.writeHead(200, {
        "content-type": "text/html"
    })
    res.end(registerHtml);
};

const getLoginPage = (req, res) => {
    res.writeHead(200, {
        "content-type": "text/html"
    })
    res.end(loginHtml);
};

const router = express.Router();

router.route("/").get(viewLandingPage);
router.route("/vendor-dashboard").get(vendorDashboard);
router.route("/register").get(getRegisterPage);
router.route("/login").get(getLoginPage);
router.route("/update/:id").get(updateVendorPage);
module.exports = router;