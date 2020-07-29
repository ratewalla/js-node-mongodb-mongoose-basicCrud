const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testDB', {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));   // logs error or success message
db.once('open', function() {
  console.log("we're connected!");
});

const fruitSchema = new mongoose.Schema({ // defines schema
    name:{
        type: String,
        required: [true,"need a name"]  // validation
    } ,
    rating: {
        type:Number,
        min: 1,
        max: 10,
        required: [true, "need a number between 1 and 10"]
    },
    review: String
});

const personSchema = new mongoose.Schema({ // defines schema
    name: String,
    age: Number,
    favouriteFruit: fruitSchema // embeds fruit document into person document
});

const Fruit = mongoose.model("Fruit", fruitSchema); // creates model

const Person = mongoose.model("Person", personSchema); // creates model

// const fruit = new Fruit({ // creates a new fruit
//     rating: 5,
//     review: "its okay"
// });



// const orange = new Fruit({ // creates a new fruit
//     name: "orange",
//     rating: 6,
//     review: "its good"
// });

const banana = new Fruit({ // creates a new fruit
    name: "banana",
    rating: 2,
    review: "bleh"
});

banana.save();


/////////////// CREATE /////////////////



// Fruit.insertMany([apple,orange,pineapple],(err)=>{
//     if(err){
//         console.log(err);
//     } else console.log("successfully added fruits!");
// }); // saves fruit

// const person = new Person({ // creates a new person
//     name: "Bob",
//     age: 35,
// });

// const person = new Person({ // creates a new person with a favourite fruit
//     name: "Jim",
//     age: 25,
//     favouriteFruit: pear
// });

// person.save();







//////////////// READ ///////////////////



// Fruit.find((err,fruits)=>{
//     if(err){
//         console.log(err);
//     } else {
//         fruits.forEach(fruit => {
//         console.log(fruit.name);
//     });
//     }
//     db.close();
// }); // finds fruit









/////////////// UPDATE ///////////////////




// Fruit.updateOne({_id:"5f2154ad8ab10b4604ce5d43"},{name:"peach"},(err)=>{ // takes three params including callback function
//     if(err){
//         console.log(err);
//     } else {
//         console.log("updated successfully");
//     }
//     db.close();
// }); // updates fruit


Person.updateOne({name:"Jimbob"},{favouriteFruit:banana},(err)=>{ // takes three params including callback function
    if(err){
        console.log(err);
    } else {
        console.log("updated successfully");
    }
    db.close();
}); // updates person, adds relationship





///////////////// DELETE /////////////////

// Fruit.deleteOne({name:"peach"},(err)=>{ // takes two params including callback function
//     if(err){
//         console.log(err);
//     } else {
//         console.log("deleted successfully");
//     }
//     db.close();
// }); // deletes fruit


// Person.deleteMany({name:/Hobnob/},(err)=>{ // takes two params including callback function
//     if(err){
//         console.log(err);
//     } else {
//         console.log("deleted successfully");
//     }
//     db.close();
// }); // deletes fruit