import mongoose from 'mongoose'

const settingsSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
        
    },

}, {
    timestamps: true
})
settingsSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


const Settings = mongoose.model('Settings', settingsSchema)

export default Settings