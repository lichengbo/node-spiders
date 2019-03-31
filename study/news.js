const http = require('http')
const cheerio = require('cheerio')

const href = 'http://news.baidu.com/'

let html = ''

http.get(href, res => {
  res.on("data", chunk => html += chunk)
  res.on('end', () => {
    const $ = cheerio.load(html)
    $('#channel-all li').each((index, element) => {
      console.log($(element).text())
    })
  })
})
