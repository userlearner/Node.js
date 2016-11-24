var express = require('express');
var app = express();
var fs = require('fs');
var multer  = require('multer');

//上传文件路径
var uploadFolder = './upload/';

var storage = multer.diskStorage({
    //通过destination属性定制上传路径
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    // 通过 filename 属性定制上传文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

// 文件上传
app.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;
    console.log('文件类型：%s',file.mimetype);
    console.log('原文件名：%s',file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.send('上传成功');
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);
console.log('listening port:3000');