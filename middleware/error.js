const errorResponse=require('../utils/errorResponse');

const errorHandler=(err,req,res,next)=>{
    let error={...err}
    error.message=err.message;
    //Log to console for dev
    console.log(err.stack.red);

    //Mongoose bad objectId
    if(err.name==='CastError')
    {
        const message = `Resource not found with id of ${err.value}`;
        error=new errorResponse(message,404);

    }

    console.log(err.name);
    res.status(error.statusCode||500).json({
        success:false,
        error:error.message||'Server Error'
    });

}

module.exports=errorHandler;