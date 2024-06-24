const asyncHandler = require('express-async-handler')
const Equipment = require('../models/equipmentModel')
const Category = require('../models/categoryModel')


async function getCatName(arrEqipObjs){
   // console.log(arrEqipObjs);          
    for(let i=0;i<arrEqipObjs.length;i++){                        
        var tmpArrEquipObj = arrEqipObjs[i].toObject();
        tmpArrEquipObj.categoryName = (await Category.findById(arrEqipObjs[i].categoryId)).name;
        arrEqipObjs[i] = tmpArrEquipObj;                 
    }     
    return arrEqipObjs;
}


//GET
const getEquip = asyncHandler(async (req, res) => {
    // res.status(200).json({message: 'Code to get all Equipments'});
    //console.log(req.body);
    
    if (req.query.categoryId){
        //console.log(req.body.categoryId);
        const equipByCatId = await Equipment.find({categoryId: req.query.categoryId});
        //console.log(equipByCatId);
            if(!equipByCatId){
                res.status(400);
                throw new Error('Category does not have Equipments.');
            } else {
                //res.status(200).json(equipByCatId);                    
                var updAllEquipbyCatID = await getCatName(equipByCatId);        
                res.status(200).json(updAllEquipbyCatID);
            }
    } else if (req.query.id) {
        const equipById = await Equipment.findById(req.query.id);
        if(!equipById){
            res.status(400);
            throw new Error('Equipment not found.');
        } else{
            //res.status(200).json(equipById);
            var updAllEquipbyID = await getCatName(equipById);        
            res.status(200).json(updAllEquipbyID);
        }
    } else{
        const allEquipments = await Equipment.find();         
        //res.status(200).json(allEquipments);

        var updAllEquip = await getCatName(allEquipments);        
        res.status(200).json(updAllEquip);
    }        
})

//POST
const createEquip = asyncHandler(async (req,res) => {
    //console.log(req.body);
    if(!req.body.name || !req.body.categoryId){
        //res.status(400).json({message: 'Please enter Equipment details...'});
        res.status(400);
        throw new Error('CategoryID or Equipment Name missing ..');
    }
    //res.status(200).json({message: 'Code to create a new Equipment'});
    const newEquip = await Equipment.create({
        categoryId : req.body.categoryId,
        name : req.body.name,        
        description: req.body.description,
        price : req.body.price,
        images: req.body.images,
        equipFilterAttr: req.body.equipFilterAttr
        //currencyCode : req.body.currencyCode
    });
    res.status(200).json(newEquip);
})


//PUT
const updateEquip = asyncHandler(async (req,res) => {
    //res.status(200).json({message: `Code to update an Equipment : ${req.params.id}`});
    const upEquip = await Equipment.findById(req.params.id);
    if(!upEquip){
        res.status(400);
        throw new Error('Equipment not found.');
    }

    const updEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updEquipment);
})

//DELETE
const deleteEquip = asyncHandler(async (req,res) => {
    //res.status(200).json({message: `Code to delete an Equipment : ${req.params.id}`});
    const delEquip = await Equipment.findById(req.params.id)
    if(!delEquip){
        res.status(400)
        throw new Error('Equipment not found')
    }
    await Equipment.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = { getEquip, createEquip, updateEquip, deleteEquip};