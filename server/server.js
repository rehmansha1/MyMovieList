import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import axios from "axios";
import fs from "fs";
dotenv.config();
const app = express();

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");
const ymd = `${year}${month}${day}`;
const PORT = 3001;
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.SERVER_FMID_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Error connecting to the database:", error);
});

db.once("open", () => {
  console.log("Connected to the DB");
});
const UserSchema = new mongoose.Schema({
  username: String,
  Movies: [
    {
      title: String,
      URL: String,
      id: String,
    },
  ],
  Series: [
    {
      name: String,
      URL: String,
      id: String,
    },
  ],
  Completed: {
    movies: [
      {
        name: String,
        imageurl: String,
        id: String,
        review: String,
        stars: String,
      },
    ],
    series: [
      {
        name: String,
        imageurl: String,
        id: String,
        review: String,
        stars: String,
      },
    ],
  },
  Playlist: [
    {
      name: String,
      items: [
        {
          name: String,
          URL: String,
          id: String,
          movie:String,
        },
      ],
    },
  ],
  Notify: [
    {
      name: String,
      id: String,
      date: String,
    },
  ],
  Stills: [
    {
      Movie: String,
      id: String,
      imageUrl: String,
    },
  ],
});
const ReviewSchema = new mongoose.Schema({
  Reviews: {
    Movies: [
      {
        Name: String,
        id: String,
        Rev: String,
        Stars: String,
      },
    ],
    Series: [
      {
        Name: String,
        id: String,
        Rev: String,
        Stars: String,
      },
    ],
  },
});

const User = mongoose.model("post", UserSchema);
const Review = mongoose.model("Review", ReviewSchema);

app.get("/", async (req, res) => {
  res.send("nuh");
});
app.post("/putIDSeries", async (req, res) => {
  const encryptedText = req.body.username;
  var decryptedBytes = CryptoJS.AES.decrypt(
    encryptedText,
    `${process.env.SERVER_ENCRYPT_KEY}`
  );
  var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const id = req.body.id;
  const url = req.body.url;
  const name = req.body.name;
  try {
    let existingUser = await User.findOne({ username });
    if (!existingUser) {
      // If user doesn't exist, create a new user
      existingUser = new User({
        username: username,
        Movies: [],
        Series: [],
      });
    }
    if (existingUser) {
      if (!existingUser.Series) {
        existingUser.Series = [];
      }

      const seriesExists = existingUser.Series.some(
        (series) => series.id.toString() === id.toString()
      );

      if (!seriesExists) {
        existingUser.Series.push({ name, URL: url, id }); // Use URL instead of url
        await existingUser.save();
        console.log("series is added to users db");
        res.status(200).json({ message: "Series added to your watchlist ;)" });
      } else {
        res.status(200).json({ message: "Series already exists " });
        console.log("Series Already exists");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/putIDMovies", async (req, res) => {
  const encryptedText = req.body.username;
  var decryptedBytes = CryptoJS.AES.decrypt(
    encryptedText,
    `${process.env.SERVER_ENCRYPT_KEY}`
  );
  var username = decryptedBytes.toString(CryptoJS.enc.Utf8);

  const title = req.body.title;
  const url = req.body.url;
  const id = req.body.id;
  try {
    let existingUser = await User.findOne({ username });

    if (!existingUser) {
      // If user doesn't exist, create a new user
      existingUser = new User({
        username: username,
        Movies: [],
        Series: [],
      });
    }

    if (!existingUser.Movies) {
      existingUser.Movies = [];
    }

    const movieExists = existingUser.Movies.some(
      (movie) => movie.id.toString() === id.toString()
    );

    if (!movieExists) {
      existingUser.Movies.push({ title, URL: url, id }); // Use URL instead of url
      await existingUser.save();
      res.status(200).json({ message: "Movie added to your Watchlist ;)" });
      console.log("Movie is added to users db");
    } else {
      res
        .status(200)
        .json({ message: "Movie already exists in your Watchlist" });

      console.log("Movie Already exists");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/getIDS", async (req, res) => {
  try {
    const encryptedText = req.query.username;

    if (!encryptedText.includes("gmail.com")) {
      const urldecodedEncryptedText = decodeURIComponent(encryptedText);
      var decryptedBytes = CryptoJS.AES.decrypt(
        urldecodedEncryptedText,
        `${process.env.SERVER_ENCRYPT_KEY}`
      );
      var userName = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const allData = await User.find({ username: userName });
      res.json(allData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/getNOTFIYLIST", async (req, res) => {
  try {
    const encryptedText = req.query.username;
if(!encryptedText){
  res.json('no noti list');
}
else if(encryptedText){
    if (!encryptedText.includes("gmail.com")) {
      const urldecodedEncryptedText = decodeURIComponent(encryptedText);
      var decryptedBytes = CryptoJS.AES.decrypt(
        urldecodedEncryptedText,
        `${process.env.SERVER_ENCRYPT_KEY}`
      );
      var userName = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const allData = await User.find({ username: userName });
      const filteredItems = allData[0].Notify.filter((item) => {
        return parseInt(ymd) >= parseInt(item.date.split("-").join(""));
      });
      if (filteredItems.length > 0) {
        res.json(filteredItems);
      } else {
        res.status(204).send();
        console;
      }
    }
  }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/getstillslist", async (req, res) => {
  try {
    const encryptedText = req.query.username;

    if (!encryptedText.includes("gmail.com")) {
      const urldecodedEncryptedText = decodeURIComponent(encryptedText);
      var decryptedBytes = CryptoJS.AES.decrypt(
        urldecodedEncryptedText,
        `${process.env.SERVER_ENCRYPT_KEY}`
      );
      var userName = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const allData = await User.find({ username: userName });
      res.json(allData[0].Stills);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.delete("/delete", async (req, res) => {
  try {
    const encryptedText = req.body.username;
    const id = req.body.id;
    const type = req.body.type;

    var decryptedBytes = CryptoJS.AES.decrypt(
      encryptedText,
      `${process.env.SERVER_ENCRYPT_KEY}`
    );
    var username = decryptedBytes.toString(CryptoJS.enc.Utf8);

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dataArray = type === "movies" ? user.Movies : user.Series;

    const index = dataArray.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "ID not found" });
    }

    dataArray.splice(index, 1);

    await user.save();

    console.log("Deleted " + id);
    return res.json({ message: "ID deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});
app.post("/completed/movies", async (req, res) => {
  try {
    const { imageurl, name, id, review, stars } = req.body;
    const encryptedText = req.body.username;
    var decryptedBytes = CryptoJS.AES.decrypt(
      encryptedText,
      `${process.env.SERVER_ENCRYPT_KEY}`
    );
    var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const user = await User.findOne({ username });
    if (user) {
      if (user.Completed.movies.some((item) => item.id == id)) {
        res.status(201).json("arleady exists from completed movies");
      } else {
        user.Completed.movies.push({ name, imageurl, id, review, stars });
        await user.save();
        res.status(201).json("Movie review added successfully");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/completed/series", async (req, res) => {
  try {
    const { imageurl, name, id, review, stars } = req.body;
    const encryptedText = req.body.username;
    var decryptedBytes = CryptoJS.AES.decrypt(
      encryptedText,
      `${process.env.SERVER_ENCRYPT_KEY}`
    );
    var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
    // Find the user by username
    const user = await User.findOne({ username });
    // Find the user by username
    if (user) {
      if (user.Completed.series.some((item) => item.id == id)) {
        res.status(201).json("arleady exists from completed series");
      } else {
        // Add the completed series to the Completed series array
        user.Completed.series.push({ name, imageurl, id, review, stars });

        // Save the updated user document
        await user.save();

        res.status(201).json("Completed series added successfully");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/removecompleted", async (req, res) => {
  try {
    const encryptedText = req.body.username;
    const id = req.body.id;
    const movie = req.body.movie;
    var decryptedBytes = CryptoJS.AES.decrypt(
      encryptedText,
      `${process.env.SERVER_ENCRYPT_KEY}`
    );
    var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const user = await User.findOne({ username });
    if (user) {
      if (movie == "true") {
        user.Completed.movies = user.Completed.movies.filter(
          (item) => item.id.toString() !== id.toString()
        );

        await user.save();
        res.status(201).json("Movie removed successfully");
      } else {
        user.Completed.series = user.Completed.series.filter(
          (item) => item.id.toString() !== id.toString()
        );
        await user.save();

        res.status(201).json("Movie removed successfully");
      }
    } else {
      console.log("user doesnt exist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/getCompletedList", async (req, res) => {
  try {
    const encryptedText = req.body.username;
    var decryptedBytes = CryptoJS.AES.decrypt(
      encryptedText,
      `${process.env.SERVER_ENCRYPT_KEY}`
    );
    var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const user = await User.findOne({ username });
    if (user) {
      const list = user.Completed;
      res.json({ list: list });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/putnotifylist", async (req, res) => {
  try {
    const encryptedText = req.body.username;
    const id = req.body.id;
    const name = req.body.name;
    const date = req.body.date;
    var decryptedBytes = CryptoJS.AES.decrypt(
      encryptedText,
      `${process.env.SERVER_ENCRYPT_KEY}`
    );
    var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const user = await User.findOne({ username });
    if (user) {
      const idExists = user.Notify.some(
        (item) => item.id.toString() === id.toString()
      );
      if (!idExists) {
        user.Notify.push({ name, id, date });
        await user.save();
        res
          .status(201)
          .json({ message: "Completed notified list updated successfully" });
      } else {
        res
          .status(201)
          .json({ message: "Completed notified list item already exists" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/removeidfromnotlist", async (req, res) => {
  try {
    const encryptedText = req.body.username;
    const id = req.body.id;
    var decryptedBytes = CryptoJS.AES.decrypt(
      encryptedText,
      `${process.env.SERVER_ENCRYPT_KEY}`
    );
    var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const user = await User.findOne({ username });
    if (user) {
      user.Notify = user.Notify.filter(
        (item) => item.id.toString() !== id.toString()
      );
      await user.save();
      res.status(201).json({ message: "deleted successfully" });
    } else {
      res.status(201).json({ message: "user doesnt exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/removeimageurl", async (req, res) => {
  try {
    const encryptedText = req.body.username;
    const imageUrl = req.body.imageUrl;
    var decryptedBytes = CryptoJS.AES.decrypt(
      encryptedText,
      `${process.env.SERVER_ENCRYPT_KEY}`
    );
    var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const user = await User.findOne({ username });
    if (user) {
      user.Stills = user.Stills.filter(
        (item) => item.imageUrl.toString() !== imageUrl.toString()
      );
      await user.save();
      res.status(201).json({ message: " img deleted successfully" });
    } else {
      res.status(201).json({ message: "user doesnt exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/putstill", async (req, res) => {
  try {
    const encryptedText = req.body.username;
    const id = req.body.id;
    const imageUrl = req.body.imageUrl;
    const Movie = req.body.movie;
    var decryptedBytes = CryptoJS.AES.decrypt(
      encryptedText,
      `${process.env.SERVER_ENCRYPT_KEY}`
    );
    var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const user = await User.findOne({ username });
    if (user) {
      const imgexists = user.Stills.some(
        (item) => item.imageUrl.toString() === imageUrl.toString()
      );
      if (!imgexists) {
        user.Stills.push({ Movie, id, imageUrl });
        await user.save();
        res.status(201).json({ message: "Added to your liked stills ;)" });
      } else {
        res
          .status(201)
          .json({ message: "already exists on your liked stills " });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/getuserrecommadations", async (req, res) => {
  const encryptedText = req.body.username;
  if(encryptedText){
  var decryptedBytes = CryptoJS.AES.decrypt(
    encryptedText,
    `${process.env.SERVER_ENCRYPT_KEY}`
  );
  var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const user = await User.findOne({ username });
  if (user) {
    const seriesArray = user.Series;

    if (seriesArray.length > 0) {
      res.json({ id: seriesArray[seriesArray.length - 1].id });
    } else {
      console.log("No series found.");
    }
  } else {
    console.log("User not found.");
  }
}
});

app.post("/putPublicReview", async (req, res) => {
  const id = req.body.id;
  const Rev = req.body.review;
  const Stars = req.body.stars;
  const movie = req.body.movie;
  const encryptedText = req.body.name;
  var decryptedBytes = CryptoJS.AES.decrypt(
    encryptedText,
    `${process.env.SERVER_ENCRYPT_KEY}`
  );
  var Name = decryptedBytes.toString(CryptoJS.enc.Utf8);

  //const result= Review.Movie.some((item)=> item.Id,item.Name === Id,Name );
  const existingReview = await Review.findById("663dc969dd1ca4e06a9276be");

  if (
    existingReview.Reviews.Movies.some(
      (item) => item.id == id && item.Name == Name
    )
  ) {
    console.log(
      existingReview.Reviews.Movies.some(
        (item) => item.id == id && item.Name == Name
      )
    );
    res.status(201).json("alreadys exists rev public");
  } else {
    console.log(
      existingReview.Reviews.Movies.some(
        (item) => item.id == id && item.Name == Name
      )
    );

    existingReview.Reviews.Movies.push({ id, Name, Rev, Stars, movie });
    res.status(201).json({ message: "Added to your liked stills" });
    await existingReview.save();
  }
});
app.post("/getplaylist", async (req, res) => {
  const encryptedText = req.body.username;
  var decryptedBytes = CryptoJS.AES.decrypt(
    encryptedText,
    `${process.env.SERVER_ENCRYPT_KEY}`
  );
  var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
  let existingUser = await User.findOne({ username });
  if (existingUser.Playlist.length >= 0) {
    let list = [];
    for (let i = 0; i < existingUser.Playlist.length; i++) {
      list.push(existingUser.Playlist[i].name);
    }

    res.json(list);
  }
});
app.post("/addtoexistingplaylist", async (req, res) => {
  const number = req.body.playlistname;
  console.log(number);
  const id = req.body.id;
  const url = req.body.url;
  const title = req.body.title;
  const movie = req.body.movie;
  const encryptedText = req.body.username;
  var decryptedBytes = CryptoJS.AES.decrypt(
    encryptedText,
    `${process.env.SERVER_ENCRYPT_KEY}`
  );

  var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
  let existingUser = await User.findOne({ username });
  const s = {
    name: title,
    URL: url,
    id: id,
    movie:movie,
  };

  if (existingUser) {
    if (existingUser.Playlist) {
      for (let i = 0; i < existingUser.Playlist.length; i++) {
        if (i == number) {
          
          let exists = existingUser.Playlist[i].items.some((item)=>item.id === s.id)
          if (exists == false){
          existingUser.Playlist[i].items.push(s);
          res.json('added to list')
          console.log('added to the list')
          break
          }
          else{
            res.json(`already exists on the ${ existingUser.Playlist[i].name}`)
            console.log('already exists on the list')
          break
          }
          
        }
      }
    }
    existingUser.save();
  } else {
    console.log("playlist doesnt exist what? ");
  }
});
app.post("/deleteplaylistname", async (req, res) => {

  const index = req.body.index;
  let name = req.body.name;
  const encryptedText = req.body.username;
  var decryptedBytes = CryptoJS.AES.decrypt(
    encryptedText,
    `${process.env.SERVER_ENCRYPT_KEY}`
  );
  var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
  let existingUser = await User.findOne({ username });
  console.log(index,name)
  if (existingUser) {
    if (existingUser.Playlist) {
      for (let i = 0; i < existingUser.Playlist.length; i++) {
        if (i == index ) {
          
          existingUser.Playlist.splice(index, 1);
          res.status(200).json(`deleted playlist ${name}`)
          console.log('deleted playlist ',name)
          break
          }
          
          
        }
    

        
        
      }
    }
    existingUser.save();
  } );
app.post("/getlistpl", async (req, res) => {
  const number = req.body.namepl;
  const encryptedText = req.body.username;
  var decryptedBytes = CryptoJS.AES.decrypt(
    encryptedText,
    `${process.env.SERVER_ENCRYPT_KEY}`
  );
  var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
  let existingUser = await User.findOne({ username });
  if (existingUser) {
    if (existingUser.Playlist) {
      for (let i = 0; i < existingUser.Playlist.length; i++) {
        if (i == number) {
          res.json(existingUser.Playlist[i].items);
        }
      }
    }
  }
});
app.post("/sendplaylistnew", async (req, res) => {
  const name = req.body.playlistname;
  const id = req.body.id;
  const url = req.body.url;
  const title = req.body.title;
  const movie = req.body.movie;
  const encryptedText = req.body.username;
  var decryptedBytes = CryptoJS.AES.decrypt(
    encryptedText,
    `${process.env.SERVER_ENCRYPT_KEY}`
  );
  var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
  let existingUser = await User.findOne({ username });
  const s = {
    name: name,
    items: [{ name: title, URL: url, id: id,movie:movie }],
  };
  let t = false;
  if (existingUser) {
    if (existingUser.Playlist.length >= 1) {
      for (let i = 0; i < existingUser.Playlist.length; i++) {
        if (name === existingUser.Playlist[i].name) {
          console.log("already exists");
          t = true;
          break;
        }
      }
      if (!t) {
        existingUser.Playlist.push(s);
        existingUser.save();
        res.status(200).json("created playlist")
        console.log("playlist saved ", name);
      }
    } else {
      existingUser.Playlist.push(s);
      existingUser.save();
      res.status(200).json("created playlist")
      console.log("playlist saved ", name);
    }
  }
});
app.post("/deleteformplaylistitem", async (req, res) => {
  const name = req.body.playlistname;
  const title = req.body.title;
  const id = req.body.id;
  const index  = req.body.index;
  console.log(title,id,index)
 const encryptedText = req.body.username;
  var decryptedBytes = CryptoJS.AES.decrypt(
    encryptedText,
    `${process.env.SERVER_ENCRYPT_KEY}`
  );
  var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
  let existingUser = await User.findOne({ username });

  if (existingUser) {
    if (existingUser.Playlist.length >= 1) {
          for (let j = 0; j < existingUser.Playlist[index].items.length; j++)
            {
              console.log(existingUser.Playlist[index].items[j].name,title)
            if (existingUser.Playlist[index].items[j].name === title && existingUser.Playlist[index].items[j].id == id ){
              existingUser.Playlist[index].items.splice(j,1);
              existingUser.save();
              res.status(200).json('deleted')
              console.log('deleted')
              break;
            }
            }
        
        }
      }
  
    } );
    app.post("/renameplaylist", async (req, res) => {
      const index  = req.body.index;
      const renametext = req.body.renametext;
     const encryptedText = req.body.username;
      var decryptedBytes = CryptoJS.AES.decrypt(
        encryptedText,
        `${process.env.SERVER_ENCRYPT_KEY}`
      );
      var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
      let existingUser = await User.findOne({ username });
    
      if (existingUser) {
        if (existingUser.Playlist[index]) {
              existingUser.Playlist[index].name = renametext;
              existingUser.save();
              res.status(200).json('renamed')
            }
        }
        });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
