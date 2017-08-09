const fs = require('fs')
const path = require('path')
const babel = require('babel-core')

var vue_fun_name = [
    'data'
]

var vue_obj_name = [
    'props',
    'method',
    'mounted',
]

function buildjs(data,file) {
    const jstemp = data.substring(data.indexOf('<script'))
        .substring(data.substring(data.indexOf('<script')).indexOf(">")+1,data.indexOf('</script>')-data.indexOf('<script'))

    if(!fs.existsSync(path.join(process.cwd(),'dist')))
        fs.mkdirSync(path.join(process.cwd(),'dist'))
    if(!fs.existsSync(path.join(process.cwd(),'dist','temp')))
        fs.mkdirSync(path.join(process.cwd(),'dist','temp'))

    lifecycle('method',file, jstemp)
return
    return lifecycle('method', jstemp)
}

/**
 * 生命周期函数
 * @param {*} key 
 * @param {*js字符串代码} js 
 */
function lifecycle(key, file, js) {
    const filename = path.join(process.cwd(),'dist','temp',file.replace(/.wxj/,'')+'.js')
    fs.writeFileSync(filename,js)
    // const m = require(path.join(process.cwd(),'dist','temp',file.replace(/.wxj/,'')+'.js'))
    
    // const arr = []
    // const cycleArr = m.default[key]
    // let res = ''

    
// babel.transform(code, options)
babel.transformFile(filename, {}, function (err, result) {
//   console.log(result.metadata); // => { code, map, ast }
//   console.log(result.options); // => { code, map, ast }
});
return

    for(let i in cycleArr){
        // console.log(i ,String(m.default.method[i]).replace(new RegExp(i),''))
        arr.push(String(cycleArr[i]))
    }
    res = arr.join()
    return `<js>${res}</js>`
}

function genFile(code) {
    return ``
}

module.exports = buildjs