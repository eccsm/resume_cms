const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs')
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.png')
  }
})

const upload = multer({ storage: storage })

app.use(cors())
app.use(express.static('public'));
app.use(express.json());

app.post('/resume', function (req, res) {
  fs.writeFile('resume.json', JSON.stringify(req.body), 'utf8', (err) => {
    if (err)
      console.log(err);
    else {
      JSON.stringify(req.body)
      res.send(JSON.stringify(req.body));
    }
  })
})

app.put('/resume', function (req, res) {
  console.log("Got a PUT request for the homepage");
  res.send('Hello PUT');
})

app.delete('/resume', function (res) {
  fs.promises.unlink('resume.json', (err) => {
    if (err) {
      return
    }
  })
  res.res.status(200).json({ status: 'success', message: 'Removed' });
});

app.get('/resume', function (req, res) {

  fs.readFile('resume.json', function read(err, data) {
    if (err)
      console.log(err);
    else {
      res.send(data);
    }
  });
})

app.get('/resume/avatar', (req, res) => {
  res.sendFile(path.join(__dirname, '/uploads', 'avatar.png'));
});

app.get('/resume/universities', async (req, res) => {
  try {
    const apiResponse = await fetch('http://universities.hipolabs.com/search?country=' + req.query.country, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    const apiResponseJson = await apiResponse.json()
    res.send(apiResponseJson)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong ' + err)
  }
})

app.get('/resume/states', async (req, res) => {
  console.log(req.query.country)
  try {
    const apiResponse = await fetch('https://www.universal-tutorial.com/api/states/' + req.query.country, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJlY2NzbTM0QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IjA3Uk9lcEE5Qk5obzZ2M2tOZGN3LVpvU19FNzZMV3d6SmVwM0FoMmlVaGRUSGNVSmpBdkY1SGgxY2I3cUVOZl9ELWcifSwiZXhwIjoxNjM2MDI4NDk3fQ.bhX2tVYOQHyCd2ppQNbVaamO4--SofOKMhQ2zLYQX4I',
        'accept': 'application/json'
      }
    })
    const apiResponseJson = await apiResponse.json()
    res.send(apiResponseJson)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong ' + err)
  }
})

app.get('/resume/countries', async (req, res) => {

  try {
    const apiResponse = await fetch('https://restcountries.com/v3.1/all', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    const apiResponseJson = await apiResponse.json()
    res.send(apiResponseJson)
  } catch (err) {
    res.status(500).send('Something went wrong ' + err)
  }
})

app.post('/resume/avatar', upload.single('avatar'), async (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    console.log(err)
  }
})

let server = app.listen(port, () => {
  console.log('listening server on port ' + port);
})