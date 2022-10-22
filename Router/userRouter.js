import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import user from "../Model/userModel.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await user.deleteMany({}); 
    const createdUsers = await user.insertMany(data.users);
    res.send({ createdUsers })
})
);

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const userOne = await user.findOne({ email: req.body.email });
    if (userOne) {
        if (bcrypt.compareSync(req.body.password, userOne.password)) {
            res.send({
                _id: userOne._id,
                name: userOne.name,
                email: userOne.email,
                isAdmin: userOne.isAdmin,
                token: generateToken(userOne),
            });
            return;
        }
    }
    res.status('401').send({ message: "Invalid Username or Password" })
}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const createUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await createUser.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
    });
}));

userRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const userData = await user.findById(req.params.id);
    if (userData) {
        res.send(userData);
    } else {
        res.status(404).send({ message: "User Not Found" });
    }
}));

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const userData = await user.findById(req.user._id);
    if (userData){
        userData.name = req.body.name || userData.name;
        userData.email = req.body.email || userData.email;
        if (req.body.password){
            userData.password = bcrypt.hashSync(req.body.password,8);
        }
        const updatedUser = await userData.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        });
    }
}))

export default userRouter;