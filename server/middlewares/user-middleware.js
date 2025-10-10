import jwt from "jsonwebtoken";

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const error = {
            status: 400,
            message: "Fill the inputs properly",
            extraDetails: err.errors ? err.errors[0].message: "Validation Error"
        };

        console.error(error);
        next(error);
    }
};

const userAuth = async (req, res, next) => {
    const {token} = req.headers;

    if(!token){
        return res.json({success: false, message: "Token not found. Login again"});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded token: ", tokenDecode);
        
        if(tokenDecode.userId){
            req.userId = tokenDecode.userId;
            return next();
        }else{
            return res.json({success: false, message: "Not authorized. login again"})
        }
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export default {validate, userAuth};