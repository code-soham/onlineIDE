import passport from "passport";
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (id, cb) => {
  cb(null, { name: "soham" });
});
