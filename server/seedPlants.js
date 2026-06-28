const mongoose = require('mongoose');

require('dotenv').config();

const Plant = require('./models/Plant');


const plants = [

    {
        name: 'Snake Plant',
        price: 499,
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
        description: 'Low maintenance indoor air purifier plant'
    },

    {
        name: 'Aloe Vera',
        price: 299,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
        description: 'Medicinal indoor succulent plant'
    },

    {
        name: 'Peace Lily',
        price: 599,
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32a8bce?auto=format&fit=crop&w=800&q=80',
        description: 'Beautiful flowering indoor plant'
    },

    {
        name: 'Money Plant',
        price: 399,
        image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
        description: 'Popular indoor decorative plant'
    },

    {
        name: 'Areca Palm',
        price: 899,
        image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=800&q=80',
        description: 'Large decorative palm plant'
    },

    {
        name: 'Spider Plant',
        price: 349,
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
        description: 'Easy maintenance hanging plant'
    }

];


mongoose.connect(process.env.MONGO_URI)

.then(async () => {

    console.log('MongoDB Connected');


    await Plant.deleteMany();

    await Plant.insertMany(plants);

    console.log('Plants Added Successfully 🌱');

    process.exit();

})

.catch((error) => {

    console.log(error);

});