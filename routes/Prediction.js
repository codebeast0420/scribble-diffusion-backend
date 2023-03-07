const express = require('express')
const predictions = express.Router()
const cors = require('cors')
const fetch = require('node-fetch').default;

predictions.use(cors())

const REPLICATE_API_HOST = "https://api.replicate.com";


predictions.post('/getprediction', async (req, res) => {

  const body = JSON.stringify({
    // https://replicate.com/jagilley/controlnet-scribble/versions
    version: "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
    input: req.body,
  });

	console.log(body);

  const headers = {
    Authorization: `Token f98e4afbb9d359074cd181f136edac871ea9dc24`,
    "Content-Type": "application/json",
    "User-Agent": `scribble-diffusion/1.0.0`
  }


  const response = await fetch(`${REPLICATE_API_HOST}/v1/predictions`, {
    method: "POST",
    headers,
    body,
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
})

predictions.post('/getresult', async (req, res) => {
  const response = await fetch(`${REPLICATE_API_HOST}/v1/predictions/${req.body.predictionId}`, {
    headers: {
      Authorization: `Token f98e4afbb9d359074cd181f136edac871ea9dc24`,
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.end(JSON.stringify(prediction));
})





module.exports = predictions;