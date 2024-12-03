const express = require("express");
const { expressjwt: jwt } = require("express-jwt"); // Correct import for express-jwt
const jwks = require("jwks-rsa");

const app = express();

// Middleware to validate JWT
const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://orangefrog.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://orange-frog-server.onrender.com/",
  issuer: "https://orangefrog.us.auth0.com/",
  algorithms: ["RS256"],
});


app.listen(5000, () => console.log("API running on port 5000"));

module.exports = { checkJwt };
