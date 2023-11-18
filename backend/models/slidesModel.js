import mongoose from 'mongoose'

const slideSchema = mongoose.Schema({
    images:[{
        type : String,
    }],
}, {
    timestamps: true
})



const Slide = mongoose.model('Slide', slideSchema)

export default Slide