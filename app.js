var express = require("express");
var app = express();

var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar" }, "shhhhh", {
    expiresIn: '10s'
});

app.get("/gen", function(req, res) {
  res.json({
    token
  });
});
app.get("/ver", function(req, res) {

  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, "shhhhh", (err, decoded) => {
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

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
