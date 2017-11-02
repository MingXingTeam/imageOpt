// const imageOptmin = require('imageoptim')

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminWebp = require('imagemin-webp');
const imageminGuetzli = require('imagemin-guetzli')


const imageAPI = {}

imageAPI.optJPG = (image) => {
    return imagemin([image], 'optimages', {
        plugins: [
            imageminJpegtran()
        ]
    })
}

imageAPI.convertToProgressiveJPG = (image) => {
    return imagemin([image], 'optimages', {
        progressive: true,
        plugins: [
            imageminJpegtran()
        ]
    })
}

imageAPI.optMozJPG = (image) => {
    return imagemin([image], 'optimages', {
        plugins: [
            imageminMozjpeg({
                quality: 80
            })
        ]
    })
}

imageAPI.optGuetzli =  (image) => {
    return imagemin([image], 'optimages', {
        plugins: [
            imageminGuetzli({
                quality: 80
            })
        ]
    })
}

imageAPI.optPNG = (image) => {
    return imagemin([image], 'optimages', {
        plugins: [
            imageminPngquant({quality: '80'})
        ]
    })
}


imageAPI.convertToWebp = (image) => {
    "use strict";
    return imagemin([image], 'optimages', {
        use: [
            imageminWebp({quality: 80})
        ]
    })
}

module.exports = imageAPI