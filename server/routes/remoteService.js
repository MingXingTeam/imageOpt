const router = require('koa-router')();
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const math = require('mathjs')

const uploadAPI = require('../api/uploadAPI')
const imageAPI = require('../api/imageAPI')

let getCompressRate = (originPath, pathB) => {
    "use strict";
    let originSize = fs.statSync(originPath).size
    console.log(originSize)
    if(fs.statSync(pathB).size == 0) return 0;
    return `${math.round((originSize - fs.statSync(pathB).size) / originSize * 100, 2)}`;
}

router.post('/upload', async (ctx, next) => {
    //原始图片
    let fileObj = await uploadAPI.upload(ctx, next)
    let originPath = fileObj.imgPath;
    console.log(originPath)
    let suffix = fileObj.suffix
    console.log(suffix)
    if(suffix.toLowerCase() == 'jpg') {
        //jpg优化
        let jpgStart = Date.now();
        let jpgFileObj = await imageAPI.optJPG(originPath)
        let jpgEnd = Date.now();
        let jpgPath = jpgFileObj[0].path;
        console.log(jpgFileObj)

        //convertToProgressiveJPG
        let jpgProgStart = Date.now();
        let jpgProgFileObj = await imageAPI.convertToProgressiveJPG(originPath)
        let jpgProgEnd = Date.now();
        let jpgProgPath = jpgProgFileObj[0].path;
        console.log(jpgFileObj)

        //mozJPG
        let mozJPGStart = Date.now();
        let mozJPGFileObj = await imageAPI.optMozJPG(originPath)
        let mozJPGEnd = Date.now()
        let mozJPGPath = mozJPGFileObj[0].path

        // let guetzliStart = Date.now();
        // let guetzliFileObj = await imageAPI.optGuetzli(originPath)
        // let guetzliEnd = Date.now()
        // let guetliPath = guetzliFileObj[0].path

        //转为webP
        let webpStart = Date.now();
        let webPFileObj = await imageAPI.convertToWebp(originPath)
        let webpPath = webPFileObj[0].path;
        let webpEnd = Date.now();

        // console.log(fileObj2)
        ctx.body = {
            //压缩比，压缩时间
            jpg: [getCompressRate(originPath, jpgPath), jpgEnd-jpgStart],
            webp: [getCompressRate(originPath, webpPath), webpEnd-webpStart],
            mozJPG: [getCompressRate(originPath, mozJPGPath),mozJPGEnd-mozJPGStart],
            progressive: [getCompressRate(originPath, jpgProgPath),jpgProgEnd-jpgProgStart],
            // guetzli: [getCompressRate(originPath, guetliPath),guetzliEnd-guetzliStart]
        }
    } else if(suffix.toLowerCase() == 'png') {

        //压缩PNG
        let imageMinOptStart = Date.now();
        let imageMinOptFileObj = await imageAPI.optPNG(originPath)
        let imageMinOptPath = imageMinOptFileObj[0].path;
        let imageMinOptEnd = Date.now();

        //转为webP
        let webpStart = Date.now();
        let webPFileObj = await imageAPI.convertToWebp(originPath)
        let webpPath = webPFileObj[0].path;
        let webpEnd = Date.now();

        ctx.body = {
            imageMin: [getCompressRate(originPath, imageMinOptPath), imageMinOptEnd-imageMinOptStart],
            webp: [getCompressRate(originPath, webpPath), webpEnd-webpStart]
            // guetzli: [getCompressRate(originPath, guetliPath),guetzliEnd-guetzliStart]
        }
    }
})

module.exports = router