const vendorModel = require(`${__dirname}/../models/vendorModel`);

exports.authenticateVendor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const vendor = await vendorModel.findOne({ email, isVerified: true });
        if (!vendor) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }
        const isMatch = await vendor.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                status: "fail", 
                message: "Invalid email or password"
            });
        }
        const token = vendor.generateAuthToken();
        res.status(200).json({
            status: "success",
            token,
            data: {
                vendor
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.saveVendor = async (req, res) => {
    try {
        const newVendor = await vendorModel.create(req.body);
        res.status(201).json({status: "success", data: {
            vendor: newVendor
        }});
    } catch (err) {
        res.status(500).json({status: "fail", message: err.message});
    }
};