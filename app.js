const express = require('express');
const logger =require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');


const app = express();

app.use(cors());
app.use(express.json());
app.use(logger(process.env.NODE_ENV === 'dev' ? 'dev' : 'tiny'));


app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter);

app.use((req,res,next)=>{
    next({status: 404, message:"Not Found"});
});

app.use((err, req, res, next) => { 
    const { status = 500, message = "Internal Server Error"} = err;
    res.status(status).json({ message });
});

module.exports = app;