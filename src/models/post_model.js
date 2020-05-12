import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
    title: String,
    tags: String,
    contents: String,
    coverUrl: String,
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
