const scraper = require('./scraper.js')
const Mailer = require('./mailer.js')
const publicConf = require('./conf/public.json')
const privateConf = require('./conf/private.json')

start()


async function start () {
  let channelShows = await scraper.scrape(publicConf.url, publicConf.channels)
  let shows = scraper.searchShow(channelShows, publicConf.searchTerms)
  let mailer = new Mailer(shows, privateConf.mailKey, privateConf.mailReceiver, privateConf.mailSender)
  mailer.sendMail()
}