import express from 'express';
import cors from 'cors';
import  mongoose from "mongoose";

import { MongoClient } from "mongodb";
const app = express();


const PORT = 3001;
app.use(express.json());
app.use(cors()); 


mongoose.connect(
    "mongodb+srv://rehmnshs27:Norc4fZixqnKp5FN@cluster1.n5blfjm.mongodb.net/post?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
  const db = mongoose.connection;
  db.on("error", (error) => {
    console.error("Error connecting to the database:", error);
  });
  
  db.once("open", () => {
    console.log("Connected to the DB");
  });
  const UserSchema = new mongoose.Schema({
    username: String,
    data: [String],
  
  });
  const User = mongoose.model("post", UserSchema);
  app.get("/", async (req, res) => {
  res.send('nuh')
});
  app.post("/putID", async (req, res) => {
    const username = req.body.username;
    const data = req.body.postText;
  
    try {

      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        
      if (!existingUser.data.includes(data))  {
        
          existingUser.data.push(data);
          await existingUser.save();
          console.log("Post added to the user's data");
          res.status(200).json(existingUser);
        } else {
          console.log("user and postText already exists");
          res.status(400).send("Post already exists in the user's data");
        }
      } else {
        const newUser = new User({ username, data});
        await newUser.save();
        console.log("User created successfully");
        res.status(201).json(newUser); 
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error"); 
    }
  });

app.get("/getIDS", async (req, res) => {
    try {
      const userName = req.query.username;

      const allData = await User.find({ username: userName });
  
      res.json(allData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

