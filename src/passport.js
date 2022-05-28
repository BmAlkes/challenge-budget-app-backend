const FacebookStrategy = require("passport-facebook").Strategy
const passport = require("passport")

FACEBOOK_APP_ID = "1371304453376247"
FACEBOOK_CLIENT_SECRET = "65c0a2b1319340b302c5bf6a5d7d95c6"

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_CLIENT_SECRET,
            callbackURL: "/auth/facebook/callback",
        },
        function (acessToken, resfresToken, profile, done) {
            done(null, profile)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})
