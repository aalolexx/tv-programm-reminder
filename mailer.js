const sgMail = require('@sendgrid/mail')

class Mailer {
  constructor (showArray, mailKey, mailReceiver, mailSender) {
    this.key = mailKey
    this.mailReceiver = mailReceiver
    this.mailSender = mailSender
    this.showArray = showArray
    sgMail.setApiKey(this.key)
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
      <p>Gerne erinneren wir sie, dass ihre Lieblingssendungen Morgen wieder läuft!</p>
      <p>Unsere Recherche hat folgende Sendungen für sie im morgigen TV Programm gefunden</p>
      ${this.showArray.join('<br>')}
      </p>Viel Spaẞ!</p>
    `
    return body
  }
}

module.exports = Mailer