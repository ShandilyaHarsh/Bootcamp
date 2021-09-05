const express = require('express');
const dotenv = require('dotenv');
const morgan=require('morgan');
const connectDB=require('./config/db');
const colors=require('colors');
const errorHandler=require('./middleware/error')

//Route files
const bootcamps=require('./routes/bootcamps');

//Load env file 
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// body parser
app.use(express.json());

//DEV logging middleware
if(process.env.NODE_ENV==='development')
{
  app.use(morgan('dev'));
}


//mount routers 
app.use('/api/v1/bootcamps',bootcamps)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;



const server=app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle Unhandled rejections
process.on('unhandledRejection',(err,promise)=>{
  console.log(`Error:${err.message}`.red);
  //close server and exit process
  server.close(()=>process.exit(1));
})