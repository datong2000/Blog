const puppeteer = require('puppeteer');
const fs = require('fs')
var result = ''



// 简易版
// 导出文件
const file = () => {
    return new Promise((res, err) => {
        if (res) {
            fs.writeFile('./movie.md', result, err => {
                if (!err) {
                    console.log('ok')
                }
            })
        }
    })
}

(
    async () => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            // process.argv[2]获取 node 里的url参数 
            // process.argv 是个数组
            await page.goto(process.argv[2]);
            // 做 js 操作,导出的模板
            result = await page.evaluate(() => {
                const isTrue = e => {
                    if (e) return e
                    else {
                        return ''
                    }
                }
                if (document.querySelector('.info-img>a>img')) var src = document.querySelector('.info-img>a>img').src
                // if (document.querySelector('.briefIntroTxt')) var info = document.querySelector('.briefIntroTxt').innerText
                if (document.querySelector('.info-title-englishName')) var EnName = '- ' + document.querySelector('.info-title-englishName').innerText
                if (document.querySelector('.info-intro-title')) var title = document.querySelector('.info-intro-title').innerText
                if (document.querySelector('.info-title-otherName')) var otherName = '- ' + document.querySelector('.info-title-otherName').innerText
                if (document.querySelector('.episodeIntro-area>a')) var area = '- ' + document.querySelector('.episodeIntro-area>a').innerText
                if (document.querySelector('.episodeIntro-time>span')) var time = '- ' + document.querySelector('.episodeIntro-time>span').innerText
                if (document.querySelector('.episodeIntro-type')) var type = '- ' + document.querySelector('.episodeIntro-type').innerText
                if (document.querySelector('.episodeIntro-director')) var director = '- ' + document.querySelector('.episodeIntro-director').innerText
                const item = `




------



## ${isTrue(title)}
![${isTrue(title)}](${isTrue(src)})
- 电影名： ${isTrue(title)}
${isTrue(EnName)}
${isTrue(otherName)}
${isTrue(director)}
${isTrue(time)}的${isTrue(area)}电影
${isTrue(type)}`
                //   - 部分影片介绍: ${info}
                return item
            });
            await browser.close();
            await file()
        } catch (e) {
            console.log(e.message);
        }
    }
)()


// 复杂版
// const launchConfig = {
//     headless: false,
//     // 当前电脑根目录下的 谷歌浏览器路径
//     executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
//     slowMo: 1000,
//     defaultViewport: {
//         width: 1600,
//         height: 900,
//     }
// }
// puppeteer.launch(launchConfig)
//     .then(async browser => {
//         const page = await browser.newPage();
//         // 只可以使用爱奇艺的详情页电影地址
//         await page.goto(process.argv[2]);
//         result = await page.evaluate(() => {
//             const src = document.querySelector('.info-img>a>img').src
//             // const info = document.querySelector('.briefIntroTxt').innerText
//             const EnName = document.querySelector('.info-title-englishName').innerText
//             const title = document.querySelector('.info-intro-title').innerText
//             const otherName = document.querySelector('.info-title-otherName').innerText
//             const area = document.querySelector('.episodeIntro-area>a').innerText
//             const time = document.querySelector('.episodeIntro-time>span').innerText
//             const type = document.querySelector('.episodeIntro-type').innerText
//             const director = document.querySelector('.episodeIntro-director').innerText
//             const item = `




//   ------



//   ## ${title}
//   ![${title}](${src})
//   - 电影名： ${title}
//   - ${EnName}
//   - ${otherName}
//   - ${director}
//   - ${time}的${area}电影
//   - ${type}`
//             //   - 部分影片介绍: ${info}
//             return item
//         });
//         await browser.close();
//     })
//     .then(() => {
//         fs.writeFile('./movie.md', result, err => {
//             if (!err) {
//                 console.log('ok')
//             }
//         })
//     })