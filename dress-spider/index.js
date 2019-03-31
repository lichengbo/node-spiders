const https = require('https')
const fs = require('fs')
const cheerio = require('cheerio')

const url = 'https://github.com/komeiji-satori/Dress'

init()

function init() {
  https.get(url, res => {
    let html = ''
    res.on('data', data => html += data)
    res.on('end', () => {
      getDirectoryUrl(html)
    })
  })
}

let dirUrls = {}

getDirectoryHtml()
// 读取页面 获取每个文件夹的URL
function getDirectoryUrl(html) {
  const $ = cheerio.load(html)

  $('.js-navigation-item').each((index, element) => {
    let type = $(element).children('.icon').children('svg').attr('aria-label')
    if(type === 'directory') {
      dirUrls[$(element).find('.js-navigation-open').text()] = 'https://github.com' + $(element).find('.js-navigation-open').attr('href')
    }
  })

  getDirectoryHtml()
}

function getDirectoryHtml() {
  for(let key in dirUrls) {
    https.get(dirUrls[key], res => {
      let html = ''
      res.on('data', data => html += data)
      res.on('end', () => {
        saveImages(key, html)
      })
    })
  }
}

function saveImages(key, html) {
  if(!fs.existsSync('./' + key)) {
    fs.mkdirSync('./' + key)
  }

  const $ = cheerio.load(html)
  $('.js-navigation-open').each((index, element) => {
    let name = $(element).text()
    let fileExtension = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
    if(fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
      https.get('https://raw.githubusercontent.com/komeiji-satori/Dress/master/' + key + '/' + encodeURI(name), res => {
        res.setEncoding('binary')

        let imgData = ''
        res.on('data', data => imgData += data)
        res.on('end', () => {
          fs.writeFile(key + '/' + $(element).text(), imgData, 'binary', err => {
            if(err) throw err
            console.log('保存成功')
          })
        })
      })
    }
  })
}
