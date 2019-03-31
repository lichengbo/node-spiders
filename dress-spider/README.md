# github 女装项目图片爬取

源项目地址[Dress - 面向可爱的蓝孩子 (/ω＼) 的 git 学习实践项目](https://github.com/komeiji-satori/Dress)

由于浏览了几张发现图片较大，加载时间较长。加上最近在学习爬虫的知识，于是写了个简单的爬虫爬取项目中的图片。

思路：
使用cheerio 库获取根目录所有文件夹链接地址，然后遍历文件夹页面获取图片链接，然后使用fs 库下载文件。

遇到的问题：
- github 图片文件地址是bolb 地址，文件存放在raw.githubusercontent.com 仓库中，需将图片地址转换后下载
- http.get URL 为中文时文件下载不到，需要进行转码处理。
