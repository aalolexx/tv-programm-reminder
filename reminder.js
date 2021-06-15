const scraperUtils = require('./scraperUtils.js')
const Mailer = require('./Mailer.js')
const publicConf = require('./conf/public.json')
const privateConf = require('./conf/private.json')
var CronJob = require('cron').CronJob

let mailer = new Mailer(publicConf.channels,
                        privateConf.mailKey,
                        privateConf.mailReceiver,
                        privateConf.mailSender)

async function runProcess () {
  let channelShows = await scraperUtils.scrape(publicConf.url, publicConf.channels)
  let shows = scraperUtils.searchShow(channelShows, publicConf.searchTerms)

  if (shows.length > 0) {
    mailer.setShows(shows)
    mailer.sendMail()
  }
}

// CRON JOB
let job = new CronJob('0 17 * * *', function() {
  runProcess()
}, null, true, 'Europe/Berlin')
job.start()