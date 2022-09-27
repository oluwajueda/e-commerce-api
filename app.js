require ('dotenv').config();
require('express-async-errors')
const mongoose = require('mongoose');

const express = require('express')
const app = express()

//rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser');

const fileUpload = require('express-fileupload')

//routers
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')
const reviewRouter = require('./routes/reviewRoute')
const orderRouter = require('./routes/orderRoute')
const rateLimiter =require('express-rate-limit')
const helmet =require('helmet')
const xss =require('xss-clean')
const cors =require('cors')
const mongoSanitize = require('express-mongo-sanitize')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')



app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 60,
}))

app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

app.use(morgan('tiny'))

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'))

app.use(fileUpload());




app.get('/', (req,res)=>{
    res.send('e-commerce api')
})
app.get('/api/v1', (req,res)=>{
  // console.log(req.cookies);
  console.log(req.signedCookies);
    res.send('e-commerce api')
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)





mongoose.connect( `mongodb+srv://olamide:3435@nodeexpressprojects.vti0k.mongodb.net/e-commerce?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



app.listen(5000, () => {
  console.log("Server is running at port 5000");
});



