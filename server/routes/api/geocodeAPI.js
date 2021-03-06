const router = require('express').Router();
const fetch = require('node-fetch');

const key = process.env.REACT_APP_GOOGLE_MAPS_API;


router.get('/:city/:state', async function(req, res) {

  const city = req.params.city;
  const state = req.params.state;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?components=locality:${city}|administrative_area:${state}&key=${key}`;

  const call = await fetch(url);
  const data = await call.json();
  res.json(data.results[0].geometry.location);
  
})

module.exports = router;
