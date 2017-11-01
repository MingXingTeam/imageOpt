const router = require('koa-router')();

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const uploadAPI = require('../api/uploadAPI')
const fs = require('fs')
const path = require('path')

const optJpg = (image) => {
    return imagemin([image], 'optimages', {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({quality: '65-80'})
        ]
    })
}

let getRateSave = (fileA, fileB) => {
    "use strict";

}

router.post('/upload', async (ctx, next) => {
    await uploadAPI.upload(ctx, next).then((file) => {
        "use strict";
        const imgPath = file.imgPath
        optJpg(imgPath).then((files) => {
            console.log(files)
        })
    })
    ctx.body = {
        result: 'ok'
    }
})

module.exports = router