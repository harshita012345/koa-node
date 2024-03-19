const authSchema = require("../schemas/authSchema");

// register user
const createUser = async (ctx) => {
    const response = await authSchema.create(ctx);
    if(response) return response
    else return;
};

// login user
const loginUser = async (ctx) => {
    const response = await authSchema.findOneAndUpdate({ email: ctx.email }, ctx, { new: true });
    if(response) return response
    else return;
};

module.exports = { createUser, loginUser };