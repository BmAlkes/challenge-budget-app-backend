const FacebookStrategy = require("passport-facebook").Strategy
const passport = require("passport")

// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: FACEBOOK_APP_ID,
//             clientSecret: FACEBOOK_CLIENT_SECRET,
//             callbackURL: "/auth/facebook/callback",
//         },
//         function (acessToken, resfresToken, profile, done) {
//             done(null, profile)
//         }
//     )
// )

// passport.serializeUser((user, done) => {
//     done(null, user)
// })
