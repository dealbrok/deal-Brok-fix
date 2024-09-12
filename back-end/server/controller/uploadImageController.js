const { v2: cloudinary } = require('cloudinary')


class uploadController {
    static async uploadImage(req, res, next) {
        try {
            cloudinary.config({
                cloud_name: 'drkfb0ifx',
                api_key: '274539168649744',
                api_secret: '0dxx_glDpFolCYe2gC6NkIjkPZs'
            })

            const file = req.file

            if (!file) {
                return res.status(400).send('No file upload')
            }

            const base64 = file.buffer.toString("base64")

            const result = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${base64}`
            )

            //upload image when using socket.io
            res.status(200).json({
                message: "Image upload successfully",
                imageUrl: result.secure_url
            })

        } catch (error) {
            console.log('Error uploading image', error);
            res.status(500).send('Failed to upload image')
        }
    }
}

module.exports = uploadController