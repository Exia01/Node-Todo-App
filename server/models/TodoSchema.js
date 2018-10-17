const mongoose = require("mongoose");
const Schema = mongoose.Schema;



/* Define Model (Blueprint) */
const TodoSchema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, "Item/Todo  must be at least two characters"],
        minlength: [2, "Todo must be at least two characters"],
        maxlength: [64, "Please keep todo item under 64 characters."]
    },

}, {
        timestamps: true
    });

/* Export MODEL*/
mongoose.model('Todo', TodoSchema);