const http = require('http')
const fs = require('fs')

function saveImage(imgUrl) {
  http.get(imgUrl, res => {
    res.setEncoding('binary')

    let imgData = ''
    res.on('data', data => imgData += data)
    res.on('end', () => {
      if(!fs.existsSync('./images')) {
        fs.mkdirSync('./images')
      }

      fs.writeFile('images/' + Math.random() + '.png', imgData, 'binary', err => {
        if(err) throw err
        console.log('保存成功')
      })
    })
  })
}

saveImage('http://pic75.nipic.com/file/20150821/9448607_145742365000_2.jpg')
