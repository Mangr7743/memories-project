// Create the handlers for our routes
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// router.get handler for /posts
export const getPosts = async (req, res) => {

    // try and catch to find all posts
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json( {message:error.message} );
    }

}


// router.post handler for /posts
export const createPost = async (req, res) => {
    // get body parser to find these posts
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPost = new PostMessage({ title, message, selectedFile, creator, tags });

    // Successfull completion of creating post
    res.status(201).json(newPost);
    
    try {
        await newPost.save();
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const { title, message, selectedFile, creator, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { title, message, selectedFile, creator, tags }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const {id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    await PostMessage.findByIdAndRemove(_id);

    console.log('delete');

    res.json( { message: 'Post deleted successfully' } );
}

export const likePost = async (req, res) => {
    const {id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true} );

    res.json({updatedPost});
}