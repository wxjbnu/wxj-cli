// import cheerio from 'cheerio'
// import fs from 'fs'
// import path from 'path'

const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')


/**
 * 获取pages文件夹内容
 */
function getPages() {
    // 找到需要编译的文件夹 page表示页面
    let dir = path.join(__dirname,'src','pages')
    var files = fs.readdirSync(dir);
    // 循环生成所有页面
    files.map(function (file,i) {
        let src = path.join(dir,files[i])
        if(getExt(src)=='.wxj'){
            buildxml(files[i])
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

/**
 * 将template文件编译
 * @param {*} filename 
 */
function buildxml(filename){
    const filepath = path.join(__dirname,'src','pages',filename)
    const fileDist = path.join(__dirname,'dist','pages',filename.replace(/.wxj/,'')+'.html')
    fs.readFile(filepath, 'utf8', function (err, data) {
        let $ = cheerio.load(`<temp>${data}</temp>`,{
            ignoreWhitespace: true,
            decodeEntities: false
        });
        // 只获取template部分,script和style部分过滤掉
        let dd = $('template').html()
        $ = cheerio.load(`<temp>${dd}</temp>`,{
            ignoreWhitespace: true,
            decodeEntities: false
        });
        xmlLoop($('temp').children(),$)
        let outdata = $('temp').html().replace(/temp/g,'template')
        fs.writeFile(fileDist, outdata, function (err) {
            if (err) throw err;
                console.log('保存完成')
            // console.log(wpath+'\'s saved!');
        });
    })
}
/**
 * 将模板里面的事件和列表等事件替换 
 * @param {*} node 
 * @param {*} $ 
 */
function xmlLoop(node,$) {
    if(node.length>0){
        node.map(function(i,e) {
            if($(this).children().length>0){
                // 如果还有子元素继续遍历
                xmlLoop($(this).children(),$)
            }
            // 没有子元素了
            // 判断点击事件
            if($(this).attr('@click')){
                console.log($(this).attr('@click'))
                // 有click事件
                $(this).attr('wx:tap',$(this).attr('@click'))
                $(this).attr('@click',null)
            }
            // 判断列表渲染
            if($(this).attr('w:for')){
                if(!$(this).attr('w:item')){
                    // 必须要有item
                    return
                }
                if(!$(this).attr('w:index')){
                    // 必须要有index
                    return
                }
                let arr = $(this).attr('w:for')
                let item = $(this).attr('w:item')
                let index = $(this).attr('w:index')
                console.log($(this).attr('@click'))
                // 有click事件
                $(this).attr('wx:for',`(${item},${index}) in ${arr}`)
                $(this).attr('w:for',null)
                $(this).attr('w:item',null)
                $(this).attr('w:index',null)
            }

            // 判断条件渲染
            if($(this).attr('w:if')){
                console.log($(this).attr('w:if'))
                // 有if事件
                $(this).attr('wx:if',$(this).attr('w:if'))
                $(this).attr('w:if',null)
            }
            if($(this).attr('w:else')){
                // 有else事件
                $(this).attr('wx:else',$(this).attr('w:else'))
                $(this).attr('w:else',null)
            }

            // 判断是否有内置样式
            if($(this).attr('w:class')){
                // console.log($(this).attr('w:class'))
                // 有class
                $(this).attr(':class',$(this).attr('w:class'))
                $(this).attr('w:class',null)
            }
            if($(this).attr('w:style')){
                // 有else事件
                $(this).attr(':style',$(this).attr('w:style'))
                $(this).attr('w:style',null)
            }

            // console.log($(this).html())
        });
        
    }
}

module.exports = getPages;