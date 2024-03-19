const koa = require('koa');
const bodyParser = require('koa-bodyparser');

const DBConnect = require('./src/config/DB');
const authRoute = require('./src/routers/authRoute');
require('dotenv').config();

const app = new koa();
app.proxy = true

// db connection
DBConnect();

const port = process.env.PORT || 3000;

app.use(bodyParser());

app.use(authRoute.routes()).use(authRoute.allowedMethods());

app.listen(port, () => {
    console.log(`🚀 Server is running on port http://localhost:${port}/`);
});
