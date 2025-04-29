const { where } = require("sequelize");
const { Room } = require("../models")

class RoomController {
    static async postData(req, res, next) {
        try {
            const { name, token } = req.body
       
           const res =  await Room.create({ name, token })

            console.log(res);

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

    static async validationRoom(req,res,next){
        try {
            const { id } = req.params
            console.log(id);
        } catch (err) {
            next(err)
        }
    }

    static async fetchId(req, res, next) {
        try {
            const { id } = req.params

            const data = await Room.findByPk(id)
            console.log(data);
            if (!data) throw ({ name: "Not Found" })

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async deleteRoomById(req, res, next) {
        try {
            const { id } = req.params

            const findRoom = await Room.findByPk(id)

            if (!findRoom) throw ({
                name: 'Not Found'
            })

            await Room.destroy({
                where: {
                    id
                }
            })

            res.status(200).json({
                message: `Success delete room by id ${id}`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = RoomController