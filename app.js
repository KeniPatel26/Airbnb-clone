const express=require("express");
const app=express();
const mongoose=require("mongoose");
const ejs=require("ejs");
const Listing=require("./models/listing");
const path=require("path");
const methiodOverride=require("method-override");
const ejsMate=require("ejs-mate");

app.engine("ejs",ejsMate);

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";


async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
 .then(()=>{
    console.log("connected to mongodb");
})
 .catch((err)=>{
    console.log("error connecting to mongodb", err);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(methiodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.send("hello, i am root");
})

//index route to show all listings
app.get("/listings",async(req,res)=>{
    const allListings =await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
 
});

app.get("/listing/new", async(req,res)=>{
    res.render("listings/new.ejs");
})

//show route to show details of a particular listing
app.get("/listing/:id", async(req,res)=>{
    let {id} = req.params; 
    const listing = await Listing.findById(id);

    res.render("./listings/show.ejs",{listing});

});

app.post("/listings", async(req,res)=>{
   const newListing=new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
});

//edit route to show edit form for a particular listing

app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});


});

//update route to update a particular listing

app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listing/${id}`);
});


//delete route to delete a particular listing

app.delete("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log("deleted listing:", deletedListing);
    res.redirect("/listings");
})
// app.get("/testlistning",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"Cozy Cottage",
//         description:"A charming cottage in the countryside.",
//         Image:"",
//         price: 1500,
//         location: "Countryside",
//         Country: "USA"
//     })

//     await sampleListing.save();
//     console.log("sample listing saved");
//     res.send("sample listing created");
// });

app.listen(8080 ,()=>{
    console.log("server is listening on port 8080");
});
