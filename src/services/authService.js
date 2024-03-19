const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, loginUser } = require("../controllers/authController");
const authSchema = require("../schemas/authSchema");

// create user service
const createUserService = async (ctx) => {
    try {
        let user = ctx.request.body;

        const findUser = await authSchema.findOne({ email: user?.email });
        if(findUser) return ctx.body = { message: 'User already exist!' };

        const hashPass = await bcrypt.hash(user.password,  10);

        user = await createUser({ ...user, password: hashPass });
        if(user) {
            ctx.response.status = 200;
            ctx.body = { message: 'User created successfully!', data: user }
        } else {
            ctx.body = { message: 'Unable to created user!' }
        }
    } catch (error) {
        ctx.body = { message: error.message }
    }
};

// login user service
const loginUserService = async (ctx) => {
    try {
        let user = ctx.request.body;

        const findUser = await authSchema.findOne({ email: user?.email });
        if(!findUser) return ctx.body = { message: 'User not exist!' };

        const matchPass = await bcrypt.compare(user.password, findUser.password);
        if(!matchPass) return ctx.body = { message: 'Password not matched!' };

        const token = jwt.sign(user, 'koa-node', { expiresIn: '1h' });

        user = await loginUser({ ...user, accessToken: token });
        if(user) {
            ctx.response.status = 200;
            ctx.body = { message: 'User login successfully!', data: user }
        } else {
            ctx.body = { message: 'Unable to login user!' }
        }
    } catch (error) {
        ctx.body = { message: error.message }
    }
};

module.exports = { createUserService, loginUserService };