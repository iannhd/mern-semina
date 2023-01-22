const Categories = require('../../api/v1/categories/model')
const { BadRequest, NotFoundError } = require('../../errors')

const getAllCategories = async () => {
    const result = await Categories.find()

    return result
}


const createCategories = async (req) => {
    
    const { name } = req.body

    const check = await Categories.findOne({name})

    if(check) throw new BadRequest('Kategori Nama duplikat')
    
    const result = await Categories.create({name})
    
    return result
}

const getOneCategories = async (req, res) => {
    let  {id}  = req.params

    const result = await Categories.findOne({_id:id})
    console.log(result, "================>");
    if(!result ) throw new NotFoundError(`Tidak ada Kategori dengan id : ${id}`)

    return result
}

const updateCategories = async (req) => {
    const { id } = req.params
    const {name} = req.body

    const check = await Categories.findOne({
        name,
        id: {$ne:id}
    })

    if(check) throw new BadRequest('Kategori Nama duplikat')

    const result = await Categories.findOneAndUpdate(
        {_id: id},
        { name },
        { new:true, runValidators:true}
    )

    if(! result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`)

    return result
}

const deleteCategories = async (req) => {

    const { id } = req.params

    const result = await Categories.findOne({
        _id:id
    })

    console.log(result);

    if(!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`)

    await result.remove()

    return result

}

const checkCategories = async (id) => {
    

    const result = await Categories.findOne({
        _id : id
    })

    if (! result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`)

    return result
}
module.exports = {getAllCategories, createCategories, getOneCategories, updateCategories, deleteCategories, checkCategories}