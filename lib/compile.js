// import cheerio from 'cheerio'
// import fs from 'fs'
// import path from 'path'

const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const buildxml = require('./compile-xml.js')
const buildjs = require('./compile-script.js')
// const buildstyle = require('./compile-style.js')


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
        if(getExt(src)=='.wxj'){
            xmlstr = buildxml(files[i])
            jsstr = buildjs(files[i])
            // cssstr = buildstyle(files[i])

            // 保存xml
            if(!fs.existsSync(path.join(process.cwd(),'dist'))){
                fs.mkdirSync(path.join(process.cwd(),'dist'))
                if(!fs.existsSync(path.join(process.cwd(),'dist','pages')))
                    fs.mkdirSync(path.join(process.cwd(),'dist','pages'))
            }
            fs.writeFile(fileDist, xmlstr+jsstr, function (err) {
                if (err) throw err;
                    console.log(filename+'保存完成')
            });
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