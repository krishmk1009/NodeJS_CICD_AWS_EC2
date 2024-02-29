import Invoice from "../Models/invoice.js";

export const newInvoice = async (req, res) => {
    try {
        const { user, name, products, total, customerDetails, companyDetails } = req.body;

        
        const newCustomerDetails = customerDetails.map(customer => ({
            name: customer.name,
            address: customer.address
        }));

        const newCompanyDetails = companyDetails.map(company => ({
            name: company.name,
            address: company.address
        }));

        const invoice = new Invoice({
            user,
            name,
            products,
            total,
            customerDetails: newCustomerDetails,
            companyDetails: newCompanyDetails
        });

        await invoice.save();
        res.status(201).json({ success: true, message: "Invoice created successfully", invoice });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to create invoice", error: error.message });
    }
};

export const getAllInvoicesUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const invoices = await Invoice.find({ user: userId }).select('-_id -__v');
        res.status(200).json({ success: true, invoices });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch invoices", error: error.message });
    }
};
