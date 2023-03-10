// 找到view 目录下所有的目录并生成['home' , 'order' , 'order-details' , 'order-details-home' ]
const path = require('path')
const fs = require('fs')

const findFileName = (dirName , prefix ) => {
    const dirpath = path.join(__dirname , dirName)
    let files = fs.readdirSync(dirpath)
    files = files.filter( file =>  fs.statSync(`${dirpath}/${file}`).isDirectory() )
    let childFiles = []
    if(files.length > 0){
        files.forEach( file =>{
            childFiles = [...childFiles , ...findFileName( `${dirName}/${file}` , prefix? `${prefix}-${file}` :file )]
        })
    }
    if(!prefix){
        return [...files , ...childFiles]
    }{
        return [...files.map( file => `${prefix}-${file}` ) , ...childFiles]
    }
}

const generateEntry = ( p ) => {
    const fileNames = findFileName( p )
    return fileNames.reduce((entry,item) => {
        entry[item]=path.join(__dirname , p , `/${item.split('-').join('/')}/index.js`)
        return entry
    },{})
}
module.exports = generateEntry