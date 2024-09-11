const { Room } = require("../models")

class RoomController {
    static async postData(req, res, next) {
        try {
            const { name, token } = req.body

            console.log(req.body);
            await Room.create({ name, token })

            res.status(201).json({ message: "Add Room Success" })
        } catch (err) {
            next(err)
        }
    }

    static async fetchData(req, res, next) {
        try {
            const data = await Room.findAll()

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async fetchId(req, res, next) {
        try {
            const { id } = req.params

            const data = await Room.findByPk(id)
            if (!data) throw ({ name: "Not Found" })

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = RoomController