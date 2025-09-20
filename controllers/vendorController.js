const vendorModel = require(`${__dirname}/../models/vendorModel`);

exports.getAllVendor = async (req, res) => {
    try {
        const vendors = await vendorModel.find();
        res.status(200).json({status: "success", data: { vendors }});
    } catch (err) {
        res.status(500).json({status: "fail", message: err.message});
    } 
};

exports.saveVendor = async (req, res) => {
    try {
        const newVendor = await vendorModel.create(req.body);
        res.status(201).json({status: "success", data: { vendor: newVendor }});
    } catch (err) {
        res.status(500).json({status: "fail", message: err.message});
    }
};

exports.getVendor = async (req, res) => {
    try {
        const vendor = await vendorModel.findById(req.params.id);
        console.log(vendor);
        if (!vendor) {
            return res.status(404).json({status: "fail", message: "Vendor not found"});
        }
        res.status(200).json({status: "success", data: { vendor }});
    } catch (err) {
        res.status(500).json({status: "fail", message: err.message});
    } 
};

exports.updateVendor = async (req, res) => {
    try {
        const vendor = await vendorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendor) {
            return res.status(404).json({status: "fail", message: "Vendor not found"});
        }
        res.status(200).json({status: "success", data: { vendor }});
    } catch (err) {
        res.status(500).json({status: "fail", message: err.message});
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        console.log(req.params.id);
        const vendor = await vendorModel.findByIdAndDelete(req.params.id);
        res.status(204).json({status: "success", data: null});
    } catch (err) {
        res.status(500).json({status: "fail", message: err.message});
    }
};

exports.verifyVendor = async (req, res) => {
    try {
        console.log(req.params.id);
        const vendor = await vendorModel.findByIdAndUpdate(
            req.params.id, 
            { isVerified: true }
        );
        if (!vendor) {
            return res.status(404).json({status: "fail", message: "Vendor not found"});
        }
        res.status(200).json({status: "success", data: { vendor }});
    } catch (err) {
        res.status(500).json({status: "fail", message: err.message});
    }
};
