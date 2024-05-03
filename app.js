const express = require('express');
const app = express();
const cors = require('cors');
const path =  require('path');
const multer  = require('multer');
const { v4: uuidv4 } = require('uuid');



const port = 8080;

app.use(cors());

// Middleware to parse JSON-encoded data
app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'mini-project/src')));
// Serve static files
app.use(express.static('uploads'));

//To show All cardsonShows

let users = [
  {
    username: 'rajesh_kumar',
    email: 'rajesh.kumar@example.com',
    password: 'Rajesh@123'
  },
  {
    username: 'neha_sharma',
    email: 'neha.sharma@example.com',
    password: 'Neha@567'
  },
  {
    username: 'suresh_patel',
    email: 'suresh.patel@example.com',
    password: 'Suresh@999'
  }
];


let indianCartoons = [
  { 
    name: "Chhota Bheem",
    description: "Adventure of a brave and intelligent boy in the fictional town of Dholakpur.",
    image : "https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABVzPv8MvxySOa7RmGnDVxKIfCTnwDKqSDmHRd8FtV3TQLbt8TL0gCCQNjlFGCKSh2sVrkWFeahW0sUxxI1r7y2-b2PegcN2OrYHC.jpg?r=8f1",
    id : uuidv4()
  },
  { 
    name: "Motu Patlu",
    description: "Two friends and their humorous adventures in Furfuri Nagar.",
    image : "https://imageio.forbes.com/specials-images/imageserve/62e7ea9338bfea373fe75386/Inspired-by-the-yesteryear-comics-characters-from-the-Hindi-comics--LotPot----Motu/0x0.jpg?format=jpg&crop=671,377,x0,y9,safe&width=960",
    id : uuidv4()
  },
  { 
    name: "Shin Chan",
    description: "Mischievous adventures of a 5-year-old boy.",
    image  : "https://images.herzindagi.info/image/2022/Mar/shinchan-story-in-hindi.jpg",
    id : uuidv4()
  },
  { 
    name: "Pakdam Pakdai (Rat-A-Tat)",
    description: "Comedy featuring a cat-and-mouse chase between Doggy Don and the mice brothers, Colonel and Chhotu.",
    image : "https://m.media-amazon.com/images/S/pv-target-images/bf1cfe078867bd9e1a3bd4c7fe77150245b1ba08b13b5937cc89b5f22163b31f.jpg",
    id : uuidv4()
  },
  { 
    name: "Roll No 21",
    description: "Adventures of Kris, a student who fights against evil.",
    image : "https://i.pinimg.com/originals/d3/4d/dc/d34ddc0622a6d2369bc122c52e9be126.png",
    id : uuidv4()
  },
  { 
    name: "Doraemon",
    description: "Adventures of a robotic cat named Doraemon and his friend Nobita.",
    image : "https://i.pinimg.com/736x/f9/bd/e7/f9bde7fd9a9878c769c69c06f3870125.jpg",
    id : uuidv4()
  }
];




app.get('/', (req, res) => {
    res.send(indianCartoons);
});

app.get('/:id'  , (req , res) => {
  let { id } = req.params;
  let Cartoon = indianCartoons.find((obj) => obj.id == id);
  res.send(Cartoon);
})
  

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Create multer instance with the storage configuration
const upload = multer({ storage });

app.post('/', upload.single('image') , (req, res) => {
  // console.log(res)
  const { name, description , image } = req.body;
  try{
    if(image){
      console.log("Image is present in req.body")
    }
  }
  catch(e){
    console.log("Wrong image provided"+e);
  }
  indianCartoons.push({name , description , image , id : uuidv4()});
  res.send("New Cartoon Added Successfully");
});
  

app.post('/signUp' , (req , res) => {
  let {username , email , password} = req.body;
  users = users.push({username , email , password});
  
})

app.patch('/:id' , (req , res) => {
  let { id } = req.params;
  let { name, description } = req.body;
  let cartoonToBeUpdated = indianCartoons.find((obj) => obj.id == id);
  cartoonToBeUpdated.name = name;
  cartoonToBeUpdated.description = description;
  res.send("Patch Request Working");
})
  


app.delete('/:id' , (req , res) => {
  let {id} = req.params;
  indianCartoons = indianCartoons.filter((obj) => obj.id != id)
  res.send("Deletion Successful");
})

app.listen(port , ()=>{
    console.log("Server is Listening at port 8080");
})

