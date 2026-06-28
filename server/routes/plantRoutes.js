const express = require('express');

const router = express.Router();

const {
    addPlant,
    getPlants,
    getPlantById,
    updatePlant,
    deletePlant,
    addReview
} = require('../controllers/plantController');


// Get All Plants
router.get('/', getPlants);

// Get Single Plant
router.get('/:id', getPlantById);

// Add Plant
router.post('/', addPlant);

// Update Plant
router.put('/:id', updatePlant);

// Delete Plant
router.delete('/:id', deletePlant);

router.post(

  "/:id/review",

  addReview

);

module.exports = router;