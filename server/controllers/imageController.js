import axios from "axios";
import userModel from "../models/userSchema.js";
import FormData from "form-data";

const generateImages = async (req, res) => {
    try {
        
        const userId = req.userId;
        const prompt = req.body.prompt;

        const user = await userModel.findById(userId);

        if(!user || !prompt) {
            return res.json({success: false, message: "Missing details"});
        }
        if(user.creditBalance === 0 || userModel.creditBalance < 0){
            return res.json({success: false, message: "You have no credits left.", credits: user.creditBalance});
        }

        const formData = new FormData();
        formData.append('prompt', prompt); 
        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_KEY,
           },
           responseType: 'arraybuffer'
        });
        const base64image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64image}`;

        await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance-1});

        res.json({success: true, message: "Image generated", creditBalance: user.creditBalance - 1, resultImage});

    } catch (error) {
        console.error(error);
        res.json({success: false, message: "Error generarting image.", creditBalance: user.creditBalance - 1, resultImage});
    }
};

export default generateImages;