const { default: mongoose } = require("mongoose")

const AuthSchema = new mongoose.Schema({
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    accessToken: { type: String }
})

module.exports = mongoose.model('user', AuthSchema);