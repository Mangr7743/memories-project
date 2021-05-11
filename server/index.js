// import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
//import dotenv from 'dotenv';

// Import routes
import postRoutes from './routes/posts.js';

//dotenv.config();

// Initialize express app
const app = express();

// Setup bodyparser and cors
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors({origin: true, credentials: true}));

// setup route link/posts
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello to memories API');
});

// setup mongodb atlas connection
const PORT = process.env.PORT || 5000;

// setup mongoose conenction with mongodb with promises
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error));

// set mongoose usefindandmodify
mongoose.set('useFindAndModify', false);