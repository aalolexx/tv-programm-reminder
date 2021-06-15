const scraper = require('./scraper.js')
const publicConf = require('./conf/public.json')

start()


async function start () {
  scraper.scrape(publicConf.url, publicConf.channels)
}