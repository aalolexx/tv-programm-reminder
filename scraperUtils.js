const rp = require('request-promise');
const cheerio = require('cheerio');


/**
 * Scrapes a given website and returns the tv programm of the given channels
 * @param {String} url 
 * @param {Array} channel
 * @returns Object Array with channels and corresponding programme
 */
async function scrape (url, channels) {
  let res = await rp(url)
  if (!res) return null

  let $ = cheerio.load(res)
  let allShows = []
  
  for (let currentChannel of channels) {
    let shows = []
    let channelFinder = $('a[href="/tv/programm/' + currentChannel + '/heute"]', res)
    if (channelFinder) {
      let channelProgrammNodes = $('.containerMoreChannel .tvsendungMoreChannel', channelFinder.parent().parent())
      for (let programmNode of channelProgrammNodes) {
        if (programmNode && programmNode.children[0]) {
          shows.push(programmNode.children[0].data.toLowerCase())
        }
      }
    }
    allShows[currentChannel] = shows
  }

  return allShows
}


/**
 * Search occurences of the given TV show
 * @param {Object} channelShows 
 * @return Array of prepared Strings
 */
function searchShow (channelShows, searchTerms) {
  let foundShows = []
  for (let channel of Object.keys(channelShows)) {
    for (let show of channelShows[channel]) {
      for (let searchTerm of searchTerms) {
        if (show.includes(searchTerm)) {
          foundShows.push(show + ' auf <strong>' + channel + '</strong>')
        }
      }
    }
  }
  return foundShows
}


module.exports = {
  scrape: scrape,
  searchShow: searchShow
}