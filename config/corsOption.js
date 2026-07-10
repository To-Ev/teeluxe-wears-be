
const allowedCors = process.env.ALLOWED_ORIGINS.split(',');

corsOption = {
    origin: (origin, callback) =>{
        if(allowedCors.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error(`Not allowed by cors!`));
        }
    },
    credentials: true
};

module.exports = corsOption