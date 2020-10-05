const express = require('express')
const Joi = require('joi')

const router = express.Router()

const schema = Joi.object({
    photoUrl: Joi.string().required(),
    title: Joi.string().required(),
    location: Joi.string().required(),
    date: Joi.string().required()
})

const photos = [
    {
        id: 1,
        photoUrl: "https://www.wallpapertip.com/wmimgs/3-35636_download-nature-wallpapers-full-hd-1080p-photo-desktop.jpg",
        title: "Nature 1",
        location: "Test location",
        date: "5-10-2020"
    },
    {
        id: 2,
        photoUrl: "https://i.pinimg.com/originals/7b/50/20/7b5020dd70445976171bf410b149ef39.jpg",
        title: "Nature 2",
        location: "Test location",
        date: "5-10-2020"
    },
    {
        id: 3,
        photoUrl: "https://images.hdqwalls.com/download/nature-dream-4k-up-1920x1080.jpg",
        title: "Nature 3",
        location: "Test location",
        date: "5-10-2020"
    }
]

router.get('/', (req, res) => {
    res.render('index', {layout: false, photos: photos})
})

router.post('/', (req, res) => {
    const {error, value} = schema.validate(req.body)

    if (error) {
        res.status(400).send(error.message)
        return
    }

    const photo = {
        id: undefined,
        photoUrl: value.photoUrl,
        title: value.title,
        location: value.location,
        date: value.date
    }

    if (photos.length > 0) {
        photo.id = photos[photos.length - 1].id + 1
    } else {
        photo.id = 1
    }

    photos.push(photo)
    res.send(photo)
})

router.delete('/:id', (req, res) => {
    const photo = photos.find(c => c.id === parseInt(req.params.id))

    if (!photo) {
        res.status(404).send('photo with specified field "id" not found')
        return
    }

    const index = photos.indexOf(photo)

    photos.splice(index, 1)
    res.send(photo)
})

module.exports = router