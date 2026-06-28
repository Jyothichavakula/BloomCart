const Plant = require('../models/Plant');


// ADD PLANT
const addPlant = async (req, res) => {

    try {

        const {
            name,
            price,
            image,
            description,
            category
        } = req.body;

        const plant = await Plant.create({

            name,
            price,
            image,
            description,
            category

        });

        res.status(201).json(plant);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// GET ALL PLANTS
const getPlants = async (req, res) => {

    try {

        const plants = await Plant.find();

        res.json(plants);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET SINGLE PLANT
const getPlantById = async (req, res) => {

    try {

        const plant = await Plant.findById(req.params.id);

        res.json(plant);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE PLANT
const updatePlant = async (req, res) => {

    try {

        const updatedPlant = await Plant.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        res.json(updatedPlant);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// DELETE PLANT
const deletePlant = async (req, res) => {

    try {

        await Plant.findByIdAndDelete(req.params.id);

        res.json({
            message: "Plant Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const addReview = async (req,res)=>{

  try{

    const plant =
      await Plant.findById(
        req.params.id
      );

    plant.ratings.push({

      user:
        req.body.user,

      rating:
        req.body.rating,

      comment:
        req.body.comment

    });

    await plant.save();

    res.json({

      message:
        "Review Added"

    });

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};


module.exports = {

    addPlant,
    getPlants,
    getPlantById,
    updatePlant,
    deletePlant,
    addReview

    

};