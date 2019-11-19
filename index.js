var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/', express.static('public'));


function getCustomers(res, mysql, context, complete){
	mysql.pool.query("SELECT first_name, last_name FROM `customer` WHERE 1", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.customers = results[0];
	complete();
	});
}

app.get('/',function(req,res,next){
	res.render('index');
});

app.get('/customer', function(req, res, next){
	var callbackCount = 0;
	var context = {};
	var mysql = req.app.get('mysql');
	getCustomers(req,res, mysql, context, complete);
	console.log(7+6);
	function complete(){
	   	console.log(6 + 6);
		callbackCount++;
		if(callbackCount >= 1){
			res.render('customer', context);
		}
	}
});

//app.use('/customer', function(req,res,next){
//	res.render('customer');
//
//});
app.use('/package', function(req,res,next){
	res.render('package');

});
app.use('/address', function(req,res,next){
	res.render('address');

});


app.use('/post-company', function(req,res,next){
	res.render('post-company');

});

app.use(function(req,res,next){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
