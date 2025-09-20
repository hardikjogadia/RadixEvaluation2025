const { body, validationResult } = require('express-validator');

exports.validateVendor = [
    body('company_name').notEmpty().withMessage('Company name is required'),
    body('contact_person').notEmpty().withMessage('Contact person is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').if((value, { req }) => req.method === 'POST')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/).withMessage('Password must contain uppercase, lowercase and symbol'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),
    body('business').isIn(['Manufacturer', 'Distributor', 'Wholesaler', 'Retailer', 'Service']).withMessage('Invalid business type'),
    body('gst_no').custom((value, { req }) => {
        if (req.body.country && req.body.country.toLowerCase() === 'india') {
            if (!value || value.length !== 15) {
                throw new Error('GST number must be 15 characters for India');
            }
        } else if (!value) {
            throw new Error('GST number is required');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'fail',
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        next();
    }
];
