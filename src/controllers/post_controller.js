import Post from '../models/post_model';

export const createPost = (req, res) => {
    const post = new Post();
    post.title = req.body.title;
    post.tags = req.body.tags;
    post.contents = req.body.contents;
    post.coverUrl = req.body.coverUrl;
    post.author = req.user._id;

    post.save().then((result) => {
        res.json({ message: 'Post created!' });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
    Post.find().then((result) => {
        res.json({ result });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
    const { id } = req.params;
    Post.findById(id).populate('author').then((result) => {
        // populate(author);
        res.json({ result });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

export const deletePost = (req, res) => {
    const { id } = req.params;
    console.log(id);
    Post.findByIdAndDelete(id).then((result) => {
        res.json({ message: 'Post deleted!' });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};
export const updatePost = (req, res) => {
    const { id } = req.params;
    Post.findByIdAndUpdate(id, req.body).then((result) => {
        res.json({ message: 'Post updated!' });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};
