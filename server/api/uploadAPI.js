const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')

const uploadAPI = {}

const getSuffix = (fileName) => {
    return fileName.split('.').pop()
}

const rename = (fileName) => {
    const randomStr = Math.random().toString(16).substr(2);
    return `${randomStr}_${fileName.substr(0, fileName.indexOf("."))}.${getSuffix(fileName)}`;
}

const mkdirsSync = (dirname) => {
    if (fs.existsSync( dirname )) {
        return true
    } else {
        if (mkdirsSync( path.dirname(dirname)) ) {
            fs.mkdirSync( dirname )
            return true
        }
    }
}

uploadAPI.upload = (ctx, next) => {
    "use strict";
    const _emmiter = new Busboy({headers: ctx.req.headers})
    const filePath = path.join( path.resolve('./'), 'uploadimages')
    const confirm = mkdirsSync(filePath)
    if (!confirm) {
        return
    }
    console.log('start uploading...')
    return new Promise((resolve, reject) => {
        _emmiter.on('file', function (fieldname, file, filename, encoding, mimetype) {
            const fileName = rename(filename)
            const saveTo = path.join(path.join(filePath, fileName))
            file.pipe(fs.createWriteStream(saveTo))
            file.on('end', function () {
                resolve({
                    imgPath: `${filePath}/${fileName}`,
                    imgKey: fileName
                })
            })
        })

        _emmiter.on('finish', function () {
            console.log('finished...')
        })

        _emmiter.on('error', function (err) {
            console.log('err...')
            reject(err)
        })

        ctx.req.pipe(_emmiter)
    })
}

module.exports = uploadAPI