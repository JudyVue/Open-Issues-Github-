'use strict';


require('dotenv').load();

//npm modules
const express = require('express');
const requestProxy = require('express-request-proxy');
const app = express();
const PORT = process.env.PORT || 3000;
const githubURL = 'https://api.github.com/';


let proxy = (req, res) => {
  console.log('Routing Github request for ', req.params[0]);
  (requestProxy({
    url: `${githubURL}${req.params[0]}`,
    headers: {Authorization: `token ${process.env.GITHUB_TOKEN}`},
  }))(req, res);
};

app.get('/github/*', proxy);

app.use(express.static('./'));



app.listen(PORT, () => {
  console.log('Server up on port ', PORT);
});
