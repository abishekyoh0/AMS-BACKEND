import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    resident_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true
    },

    flat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
      required: true
    },

   bill_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Bill",
  default: null
},

    invoice_number: {
      type: String,
      required: true,
      unique: true
    },

    billing_month: {
      type: String,
      required: true
    },

    bill_amount: {
      type: Number,
      required: true
    },

    extra_charges: {
      type: Number,
      default: 0
    },

    total_amount: {
      type: Number,
      required: true
    },

    payment_method: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Net Banking"],
      required: true
    },

    payment_status: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Paid"
    },

    paid_on: {
      type: Date,
      default: Date.now
    },

    receipt_url: {
      type: String,
      default: ""
    },

    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }

  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);