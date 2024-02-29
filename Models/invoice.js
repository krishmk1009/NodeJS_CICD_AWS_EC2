import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    productRate: {
        type: Number,
        required: true,
    },
    productGst: {
        type: Number,
        required: true,
    }
});

const invoiceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    customerDetails: [{
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        }
    }],
    companyDetails: [{
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        }
    }],
    products: [productSchema],
    total: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
