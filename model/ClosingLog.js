const mongoose = require("mongoose");

const closingLogSchema = new mongoose.Schema({
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserDB", 
        required: true 
    },
    action: { 
        type: String, 
        default: "Year Closing" 
    },
    clearedOrders: { type: Number, default: 0 },
    resetRevenue: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ClosingLog", closingLogSchema);
