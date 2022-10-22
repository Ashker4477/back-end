import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
}, {
    timestamps: true
});

const user = mongoose.model("user", userSchema);

export default user;