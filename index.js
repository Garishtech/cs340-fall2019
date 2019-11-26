var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use(express.static('public'));


/*function getCustomers(callback_function){
	var context={}
	mysql.pool.query("SELECT first_name, last_name, customer_id FROM customer WHERE 1", function(error, results, fields){
	console.log(results);
	   if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.customers = results[0];
	callback_function(context);
	});
}*/

app.get('/',function(req,res,next){
	res.render('index');
});

app.get('/customer', function(req, res, next){
	var context = {};
	context.jsscripts = ["delete_customer.js"];
	mysql.pool.query("SELECT first_name, last_name, customer_id FROM customer WHERE 1", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.customers = results;
	console.log(context);
	res.render('customer', context);
	});

});

/*app.get('/customer', function(req, res, next){
   	var context = {};
	context.jsscripts = ["delete_customer.js"];
	function load_page(conext){
		//console.log(context);
		res.render('customer', context);
	}
	getCustomers(load_page);
});*/

	
/*app.get('/customer', function(req, res, next){
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["delete_customer.js"];
	var mysql = req.app.get('mysql');
	//getCustomers(req,res, mysql, context, complete);
	//function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			res.render('customer', context);
		}
	//}
});*/

app.delete('/customer/:id', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM customer WHERE customer_id = ?";
	var inserts = [req.params.id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			console.log(error)
			res.write(JSON.stringify(error));
			res.status(400);
			res.end();
		}else{
			res.status(202).end();
		}
	})
})

app.post('/customer', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO customer (first_name, last_name, aid) VALUES (?,?,?)";
	var inserts = [req.body.first_name, req.body.last_name, req.body.aid];
	mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
		res.write(JSON.stringify(error));
		res.end();
		}
		else{
		res.redirect('/customer');
		}
	});
});

app.post('/address', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO address (house_number, street, city, state, zip_code) VALUES (?,?,?,?,?)";
	var inserts = [req.body.house_number, req.body.street, req.body.city, req.body.state, req.body.zip_code];
	mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
		res.write(JSON.stringify(error));
		res.end();
		}
		else{
		res.redirect('/address');
		}
	});
});

app.post('/package', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO package (content, delivered, cid) VALUES (?,0, 10)";
	var inserts = [req.body.content];
	mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
		res.write(JSON.stringify(error));
		res.end();
		}
		else{
		res.redirect('/package');
		}
	});
});

app.post('/post-company', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO post_company (name) VALUES (?)";
	var inserts = [req.body.name];
	mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
		res.write(JSON.stringify(error));
		res.end();
		}
		else{
		res.redirect('/post-company');
		}
	});
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
