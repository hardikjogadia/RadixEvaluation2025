const jwt = require('jsonwebtoken');
const vendorModel = require('../models/vendorModel');

exports.checkAuthentication = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
        const vendor = await vendorModel.findById(decoded.id);

        if (!vendor) {
            return res.status(401).json({
                status: 'fail',
                message: 'Vendor no longer exists'
            });
        }

        req.vendor = vendor;
        next();
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid token'
        });
    }
};