var express = require('express');
var app = express();

var fs = require('fs');

var bodyParser = require('body-parser');

app.use(express.static('public'));

app.set('view engine', 'ejs')

var articles = [{
		id: 1, 
		name: 'kotiki', 
		body: 'Text'
	},{
		id: 2, 
		name: 'pesiki', 
		body: 'Text2'
	},{
		id: 3, 
		name: 'krabiki', 
		body: 'Text3'
	}];

app.use(bodyParser.urlencoded({ extended: false }));
 
app.post('/', function (req, res) {
	var formName = req.body.name;
	var formBody = req.body.comment;
	if (formName.length < 5 || formBody.length <2){ // Я бы сделал валидацию по длинне))
		res.send('require more simbols');
	}
	if(req.xhr){
		res.json(req.body);
		fs.writeFile("./text.txt", formName + " " + formBody, function() {
			console.log('file in')
		});
	}
	res.end('hi');
});

app.get('/', function (req, res) {
	res.render('index.ejs', {
		arr: articles 
	});
});

app.listen(3000);