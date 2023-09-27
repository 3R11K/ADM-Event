const { getAuth} = require("firebase/auth");
const auth = getAuth();

function isLoggedin(req, res, next){ 
  const user = auth.currentUser;
  if (user !== null) {
    next()
  } else {
    res.status(400).redirect("/");
  }
}

module.exports = isLoggedin