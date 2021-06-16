const sgMail = require('@sendgrid/mail')

class Mailer {
  constructor (channels, mailKey, mailReceiver, mailSender) {
    this.key = mailKey
    this.mailReceiver = mailReceiver
    this.mailSender = mailSender
    this.channels = channels
    sgMail.setApiKey(this.key)
  }

  setShows (showArray) {
    this.showArray = showArray
  }

  sendMail () {
    let msg = {
      to: this.mailReceiver,
      from: this.mailSender,
      subject: 'Erinnerung TV Programm Morgen!',
      html: this.buildMailMessage()
    }
    sgMail.send(msg)
    console.log('sent mail to ' + this.mailReceiver)
  }

  buildMailMessage () {
    let body = `
      <h2>Hallo!</h2>
      <p>Gerne erinneren wir sie, dass ihre Lieblingssendung Heute wieder läuft!</p>
      <p>Unsere Recherche hat folgende Sendungen für sie im heutigen TV Programm gefunden:</p>
      ${this.showArray.join('<br>')}
      <p>
        Folgende Sender haben wir durchsstöbert: <br>
        ${this.channels.join(', ')}
      </p>
      </p>Viel Spaẞ!</p>
    `
    return body
  }
}

module.exports = Mailer