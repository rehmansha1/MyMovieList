import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const app = express();

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
        title: String,
        URL: String,
        id: String,
        content: String,
        stars: String,
      },
    ],
    series: [
      {
        name: String,
        URL: String,
        id: String,
        content: String,
        stars: String,
      },
    ],
  },
});


const User = mongoose.model("post", UserSchema);
app.get("/", async (req, res) => {
  res.send("nuh");
});
app.post("/putIDSeries", async (req, res) => {
  const username = req.body.username;
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
        res.status(200).json({ message: "Series added successfully" });
      } else {
        console.log("Series Already exists");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/putIDMovies", async (req, res) => {
  const username = req.body.username;
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
      res.status(200).json({ message: "Movie added successfully" });
      console.log("Movie is added to users db");
    } else {
      console.log("Movie Already exists");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
app.delete("/delete", async (req, res) => {
  try {
    const { username, id, type } = req.body;

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
app.post('/completed/movies', async (req, res) => {
  try {
    const { username, title, URL, id, content, stars } = req.body;
    
    // Find the user by username
    const user = await User.findOne({ username });

    // Add the completed movie to the Completed movies array
    user.Completed.movies.push({ title, URL, id, content, stars });

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: 'Completed movie added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/completed/series', async (req, res) => {
  try {
    const { username, name, URL, id, content, stars } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Add the completed series to the Completed series array
    user.Completed.series.push({ name, URL, id, content, stars });

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: 'Completed series added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
