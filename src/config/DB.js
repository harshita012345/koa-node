const { default: mongoose } = require("mongoose")

const DBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log('Connection successfully done.');
        }).catch(() => {
            console.log('Connection not established.');
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = DBConnect;