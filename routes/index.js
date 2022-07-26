var express = require('express');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        cb(null, +Date.now() + '-' + file.originalname);
    },
})

var upload = multer({
        storage: storage,
        limits: {fileSize: 2 * 1024 * 1024},
        fileFilter: function (req, file, cb) {
            var name = file.originalname;
            var size = file.length;
            if (name.indexOf('.jpg') > -1) {
                cb(null, true);
            } else {
                cb(new Error(" JPG Only"), false);
            }
        }
    }
).array('file', 6)

var router = express.Router();
router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err != null) {
            res.send(err.message)
        } else {
            var title = req.body.title;
            var content = req.body.content;
            var paths = req.files
            res.json({title:title,content:content,paths:paths});
        }
    })
});
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/buttons.ejs', function (req, res, next) {
    res.render('buttons');
});

router.get('/cards.ejs', function (req, res, next) {
    res.render('cards');
});

router.get('/404.ejs', function (req, res, next) {
    res.render('404');
});

router.get('/blank.ejs', function (req, res, next) {
    res.render('blank');
});


router.get('/charts.ejs', function (req, res, next) {
    res.render('charts');
});


router.get('/error.ejs', function (req, res, next) {
    res.render('error');
});
router.get('/forgot-password.ejs', function (req, res, next) {
    res.render('forgot-password');
});

router.get('/login.ejs', function (req, res, next) {
    res.render('login');
});

router.get('/register.ejs', function (req, res, next) {
    res.render('register');
});

router.get('/tables.ejs', function (req, res, next) {
    res.render('tables');
});

router.get('/utilities-animation.ejs', function (req, res, next) {
    res.render('utilities-animation');
});

router.get('/utilities-border.ejs', function (req, res, next) {
    res.render('utilities-border');
});
router.get('/utilities-color.ejs', function (req, res, next) {
    res.render('utilities-color');
});
router.get('/utilities-other.ejs', function (req, res, next) {
    res.render('utilities-other');
});

router.get('/upload.ejs', function (req, res, next) {
    res.render('upload');
});

module.exports = router;
