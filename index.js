const express = require('express');
const mongoose = require('mongoose');
const app = express();
const BlogPostModel = require('./models/blogpost');
mongoose.connect('mongodb+srv://dhruvvadoliya1:OOs2YX7Myn4KPuEe@blog-api.zwtfhkn.mongodb.net/blog-api?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const port = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/blog', async (req, res) => {
    console.log("req.body", req)
    let blogPost = new BlogPostModel({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });
    blogPost = await blogPost.save();


    res.send(blogPost);
});

app.get('/api/blog', async (req, res) => {
    console.log("req.body", req)
    let blogPosts = await BlogPostModel.find();

    res.send(blogPosts);
});

app.get('/api/blog/:id', async (req, res) => {
    console.log("req.body", req)
    let blogPost = await BlogPostModel.findById(req.params.id);

    res.send(blogPost);
});

app.delete('/api/blog/:id', async (req, res) => {
    console.log("req.body", req)
    let result = await BlogPostModel.deleteOne({ _id: req.params.id });
    res.send(result);
});







app.listen(port, () => console.log(`Listening on port ${port}...`));


// const mongoose = require('mongoose');
