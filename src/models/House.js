import { Schema, model } from "mongoose";

const HouseSchema = new Schema({
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
});


HouseSchema.virtual('thumbnail_url').get(function(){
    const encodedFilename = encodeURIComponent(this.thumbnail);
    return `http://localhost:3333/files/${encodedFilename}`;
})

export default model('House', HouseSchema);