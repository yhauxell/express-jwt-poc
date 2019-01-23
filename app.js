var express = require("express");
var app = express();
//const passport = require("passport");
var jwt = require("jsonwebtoken");
const passport = require("./config/passport-strategies");
//generate token
app.get("/gen", function(req, res) {
  var token = jwt.sign({ sub: "yhauxell" }, "secret-phrase", {
    expiresIn: "1m"
  });
  res.json({
    token
  });
});
//as simple as posible
app.get("/ver", function(req, res) {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, "secret-phrase", (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        res.json(decoded);
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
});

app.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user);
    }
);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
