const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        picture: {
            type: String,
            default: "https://i.ibb.co/fx3WgVG/pro1.png"
        },
    },
    {
        timestamps: true,
    }
);


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password)
}


userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt)
})





const User = mongoose.model("User", userSchema);
module.exports = User;