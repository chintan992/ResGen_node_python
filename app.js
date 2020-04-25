
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
      global.fname = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myFile');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: pdf Only!');
  }
}

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');
//var name = "chintan"
// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } 
    else {
          if(req.file == undefined){
            res.render('index', {
              msg: 'Error: No File Selected!'
            });
          }
          else {
              
              let {PythonShell} = require('python-shell')
              var options = {
                  mode: 'text',
                  args: [fname]
                };
              PythonShell.run('resgen.py', options, function (err,result) {
                    if (err) throw err;
                    
                    
                    res.render('index', {
                      msg: 'File Uploaded!',
                      
                      str: result
                    });
              });
          }
    }
  });








});
  



const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));