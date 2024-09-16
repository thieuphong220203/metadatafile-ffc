var express = require('express');
const multer = require('multer')
const path = require('path')
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/fileanalyse', upload.single('upfile') ,(req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' }); 
  }
  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
