const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const listingSchema= new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    Image: { type: String,
        default:"https://unsplash.com/photos/a-house-with-a-blue-front-door-and-a-brown-front-door-xaqsFfoEq3o",
        set:(v)=>v===""?"https://unsplash.com/photos/a-house-with-a-blue-front-door-and-a-brown-front-door-xaqsFfoEq3o":v,
     },
    price : { type: Number, required: true },
    location: { type: String},
    country : { type: String},
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;