const fs = require('fs')
const path = require('path')

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

    if(!fs.existsSync(path.join(process.cwd(),'dist','temp')))
        fs.mkdirSync(path.join(process.cwd(),'dist','temp'))
    
    fs.writeFileSync(path.join(process.cwd(),'temp',file+'.js'),jstemp)
    const m = require(path.join(process.cwd(),'temp',file+'.js'))

    return lifecycle('method', m)
}

/**
 * 生命周期函数
 * @param {*} key 
 * @param {*} m 
 */
function lifecycle(key, m) {
    const arr = []
    const cycleArr = m.default[key]
    let res = ''
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