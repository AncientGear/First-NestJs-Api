import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    imgUrl: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});