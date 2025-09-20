const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const vendorSchema = mongoose.Schema({
    company_name: {type: String, required: true},
    contact_person: {type: String, required: true}, 
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    business: {type: String, enum: ['Manufacturer', 'Distributor', 'Wholesaler', 'Retailer', 'Service']},
    country: {type: String, required: true},
    gst_no: {type: String, required: true},
    address: {type: String, max: 255},
    logo: {type: String},
    isVerified: {type: Boolean, default: false}
});

vendorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

vendorSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

vendorSchema.methods.generateAuthToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'fallback-secret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

const model = mongoose.model('VendorMaster', vendorSchema);
module.exports = model;
