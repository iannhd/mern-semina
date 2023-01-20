const Categories = require('./model');
const mongoose = require('mongoose')
const { ObjectID } = require( 'bson');
const create = async (req, res, next) => {
    try {
        const {name} = req.body
        const result = await Categories.create({name})
        res.status(201).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const result = await Categories.find().select('_id name')
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        let  {id}  = req.params

        const result = await Categories.findOne({ id})
        
        if(! result ) return res.status(404).json({
            message: "Id Categories tidak ditemukan"
        })

        res.status(200).json({
            data:result
        })
    
    } catch (error) {
        next(error.message)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const {name} = req.body

        const result = await Categories.findByIdAndUpdate(
            { _id:id },
            { name },
            { runValidators: true}
        )

        res.status(200).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index,
    find,
    update
}