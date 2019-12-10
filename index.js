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


app.get('/',function(req,res,next){
	res.render('index');
});

app.get('/customer', function(req, res, next){
	var context = {};
	context.jsscripts = ["delete_customer.js", "delete_package.js"];
	mysql.pool.query("SELECT first_name, last_name, customer_id FROM customer", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.customers = results;
	//console.log(context);
	res.render('customer', context);
	});

});

app.get('/address', function(req, res, next){
	var context = {};
	context.jsscripts = ["delete_address.js"];
	mysql.pool.query("SELECT house_number, street, city, state, zip_code, address_id FROM address", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.address = results;
	//console.log(context);
	res.render('address', context);
	});

});

app.get('/package', function(req, res, next){
	var context = {};
	context.jsscripts = ["delete_package.js"];
	mysql.pool.query("SELECT content, delivered, package_id FROM package", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.packages = results;
	//console.log(context);
	res.render('package', context);
	});

});

app.get('/post-company', function(req, res, next){
	var context = {};
	context.jsscripts = ["delete_post_company.js"];
	mysql.pool.query("SELECT name, post_company_id FROM post_company", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.pc = results;
	//console.log(context);
	res.render('post-company', context);
	});

});

//************************************
//Update Page serving
//************************************
app.get('/address/:id', function(req, res){
	console.log("=== uppdate-address get request")

	var context = {};
	context.jsscripts = ["update-address.js"];
	sql = "SELECT house_number, street, city, state, zip_code, address_id  FROM address WHERE address_id = ?";
	inserts = [req.params.id];
	mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
	context.address = results[0];
	console.log(context);
	res.render('update-address', context);	
	});
	
});

app.delete('/post-company/:id', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM post_company WHERE post_company_id = ?";
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

app.delete('/package/:id', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM package WHERE package_id = ?";
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

app.delete('/address/:id', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM address WHERE address_id = ?";
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


app.delete('/customer/:id', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE package, customer FROM package INNER JOIN customer WHERE (package.cid=customer.customer_id AND cid=?) OR customer.customer_id = ?";
	var inserts = [req.params.id, req.params.id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		console.log("==Customer's packages deleted.\n")});
	
	var inserts = [req.params.id];
       	sql = "DELETE FROM customer WHERE customer_id=?";
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			console.log(error)
			res.write(JSON.stringify(error));
			res.status(400);
			res.end();
		}else{
			console.log("===Customer Deleted\n");
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
	var sql = "INSERT INTO package (content, delivered, cid, pcid, aid) VALUES (?,0,?,?,?)";
	var inserts = [req.body.content, req.body.cid, req.body.pcid, req.body.aid];
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

app.put('/address/:id', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "UPDATE address SET house_number=?, street=?, city=?, state=?, zip_code=? WHERE address_id=?";
	var inserts = [req.body.house_number, req.body.street, req.body.city, req.body.state, req.body.zip_code, req.params.id];
	sql = mysql.pool.query(sql, inserts, function(error,results,fields){
		if(error){
			console.log("ERROR: ");
			console.log(error);
			res.write(JSON.stringify(error));
			res.end();
		}	
		else{
			console.log("Success: ");
			console.log(results[0]);
			res.status(200);
			res.end();
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
