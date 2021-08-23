const mongoose = require('mongoose');
const cities = require('./cities');
const {
    places,
    descriptors
} = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connections error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '611fccf6227bb43ce84735fa',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam delectus quas soluta accusantium, illo consectetur nulla quo mollitia est aliquam a debitis. Facere, laboriosam. Illum eveniet incidunt explicabo esse corporis.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [{
                    url: 'https://res.cloudinary.com/dbxyomfle/image/upload/v1629583504/YelpCamp/sm7xmrprhurfk1mnfnud.jpg',
                    filename: 'YelpCamp/hy0driakvoken6di8f9b'
                },
                {
                    url: 'https://res.cloudinary.com/dbxyomfle/image/upload/v1629582319/YelpCamp/e6kqxyaflzkdaqhk4nvv.jpg',
                    filename: 'YelpCamp/hv4flczlkuefvfa6pngt'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})