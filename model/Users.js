const mongoose = require('mongoose')
const { Schema } = mongoose;


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/, "Please enter a valid Email address"],
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        roles: {
            Customer: {
                type: Number,
                default: 2001
            },
            Admin: Number,
            Courier: Number,
            Editor: Number
        },
        refreshToken: String
    },
    {timestamps: true}
);

const UserDB = mongoose.model("UserDB", userSchema)

module.exports = UserDB