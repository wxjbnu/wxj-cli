// import cheerio from 'cheerio'
// import fs from 'fs'
// import path from 'path'

const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
require('colors');

const buildxml = require('./compile-xml.js')
const buildjs = require('./compile-script.js')
// const buildstyle = require('./compile-style.js')

compile()
function compile() {
    getPages()
}

/**
 * 获取pages文件夹内容
 */
function getPages() {
    // 找到需要编译的文件夹 page表示页面
    let dir = path.join(process.cwd(),'src','pages')
    var files = fs.readdirSync(dir);
    var fileDist = path.join(process.cwd(),'dist','pages')
    // 循环生成所有页面
    files.map(function (file,i) {
        let src = path.join(dir,files[i])
        let xmlstr = null
        let jsstr = null
        let cssstr = null
        let dist = path.join(fileDist,file.replace(/.wxj/,'')+'.vue')
        if(getExt(src)=='.wxj'){
            fs.readFile(src, 'utf8', function (err, data) {
                xmlstr = buildxml(data,file)
                jsstr = buildjs(data,file)
                // cssstr = buildstyle(files[i])

                // 保存xml
                if(!fs.existsSync(path.join(process.cwd(),'dist')))
                    fs.mkdirSync(path.join(process.cwd(),'dist'))

                if(!fs.existsSync(path.join(process.cwd(),'dist','pages')))
                    fs.mkdirSync(path.join(process.cwd(),'dist','pages'))
                
                console.log(dist)
                // console.log(xmlstr+jsstr)
                fs.writeFile(dist, xmlstr+jsstr, function (err) {
                    if (err) throw err;
                        console.log(`${dist}保存完成`.green)
                });
            })
        }
        // genFiles(src,files[i].split('.')[0])
    })
}

/**
 * 获取文件后缀
 * @param {*} filepath 
 */
function getExt(filepath){
    let info = path.parse(filepath);
    return info.ext;
}

module.exports = compile