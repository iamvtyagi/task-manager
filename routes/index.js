const { isUtf8 } = require('buffer');
const { render } = require('ejs');
var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.readdir("./files", function(err,files){
      // console.log(files)
      res.render("index",{files: files})
    })
});
router.post('/create', function(req, res, next) {
      fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
          res.redirect("/")
      })
      // jo ye splite hai vo isko space ke basis par todke array bana dega phir un sabko join krdege ham
});
router.get('/files/:filename', function(req, res, next){
  const filePath = `./files/${req.params.filename}`;
  
  fs.readFile(filePath, 'utf-8', function(err, filedata) {
     res.render('show',{filename: req.params.filename,filedata: filedata});
    // console.log(filedata);
})});

router.get('/edit/:filename', function(req, res){
  const filePath = `./files/${req.params.filename}`;
     res.render('edit',{filename : req.params.filename})
  });
  router.post('/edit', function(req, res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.newName}`, function(err){
         res.redirect("/");
    })
    // console.log(req.body) 
    });
module.exports = router;
