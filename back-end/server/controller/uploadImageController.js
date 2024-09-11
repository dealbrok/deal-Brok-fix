const { v2: cloudinary } = require('cloudinary')
const { User, Room, Upload } = require('../models')

class uploadController {
    static async uploadImage(req, res, next) {
        try {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            })

            const file = req.file

            const base64 = file.buffer.toString("base64")

            const output = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${base64}`
            )

            //testing upload image manually
            const UserId = 1
            const RoomId = 1

            await Upload.create({ message: output.secure_url, UserId, RoomId })

            //upload image when using socket.io
            /*
            let uploadImg = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64}`)
      
            res.status(200).send({
              message: "Successfully upload image",
              imageUrl: result.secure_url
            })
            */

            res.status(200).json({
                message: "Successfully upload image",
                imageUrl: output.secure_url
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = uploadController