module.exports = {

  db: process.env.MONGODB|| 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  mailgun: {
    user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
    password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
  },
  
  mandrill: {
    user: process.env.MANDRILL_USER || 'app27339066@heroku.com',
    password: process.env.MANDRILL_PASSWORD || 'v6mlQSIzJIpY9WrG7z2j8g'
  },

  sendgrid: {
    user: process.env.SENDGRID_USER || 'hslogin',
    password: process.env.SENDGRID_PASSWORD || 'hspassword00'
  },

  linkedin: {
    clientID: process.env.LINKEDIN_ID || '75l6isrvof1kpf',
    clientSecret: process.env.LINKEDIN_SECRET || 'cylvl7rNkZFmYM67',
    callbackURL: '/auth/linkedin/callback',
    scope: ['r_fullprofile', 'r_emailaddress', 'r_network'],
    passReqToCallback: true
  }
};
