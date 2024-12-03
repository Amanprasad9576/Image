import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import multer from 'multer';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import  { options } from './utils/swaggerOption.js';
import ip  from 'ip';
import { rateLimit } from 'express-rate-limit'


const PORT = 3000; // port number


const app = express(); // create express app server instance
const upload =multer();
  
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.use('/api',apiRouter);

app.get('/ping',  (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.user);
    const ipaddr =ip.address();
    return res.json({ message: 'pong' +ipaddr});
});

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 30 sec
	limit: 5, // Limit each IP to 5 requests per `window` 
	
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});


