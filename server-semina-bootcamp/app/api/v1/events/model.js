const mongoose = require('mongoose')

const ticketCategoriesSchema = new mongoose.Schema({
    type: {
        type:String,
        required: [true, 'Tipe tiket harus diisi']
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    statusTicketCategories: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    expired: {
        type: Date
    }
})

const EventShcema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Judul harus diisi'],
            minLenght: 3,
            maxLength: 50
        },
        date: {
            type: Date,
            required: [true, 'Tanggal dan waktu harus diisi']
        },
        about: {
            type: String
        },
        tagline: {
            type: String,
            required: [true, 'Tagline harus diisi']
        },
        keyPoint: {
            type: [String],
        },
        venueName: {
            type: String,
            required: [true, 'Tempat harus diisi']
        },
        statusEvent: {
            type: String,
            enum: ['Draft', 'Published'],
            default: 'Draft'
        },
        tickets: {
            type: [ticketCategoriesSchema],
            required: true
        },
        image: {
            type: mongoose.Types.ObjectId,
            ref: 'Image',
            required: true
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true
        },
        talent: {
            type: mongoose.Types.ObjectId,
            ref: 'Talent',
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Event', EventShcema)