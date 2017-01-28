var express = require('express'),
    http = require('http'),
    path = require('path'),
    bodyParser= require('body-parser');
 var session = require('express-session');

var app = express();

app.set('port', 8081);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_details',
    });
  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'ssssssh',
	resave: true,
	saveUninitialized: true

}));

app.use(express.static('public'));

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
})

app.get('/admin',function(req,res){
	console.log("session",req.session);

	if(req.session.usertype == 'admin'){

		res.sendFile(__dirname + '/admin.html');
	}

	else{
		console.log("not admin ")

		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write("404 not found");
    	res.end();
	}
	
})

app.get('/employee',function(req,res){

	if(req.session.usertype == 'employee'){

		res.sendFile(__dirname + '/employee.html');
	}

	else{
		console.log("not admin ")

		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write("404 not found");
    	res.end();
	}

	
})


// log in page
app.post('/',function(req,res){
	var flag;
	if(req.body.email != "" && req.body.password != ""){

		var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_details',
    });

		connection.connect();
		
		var login = connection.query('select email,usertype from login where email = ? and password=? ',[req.body.email,req.body.password],function(err,rows){
			
			
			
			if(rows.length>0){
				
				req.session.usertype = rows[0].usertype;

				if(rows[0].usertype == 'admin'){
				flag = 1;

				return res.send({flag : flag});
				}

				else{

					flag = 2;
					return res.send({flag : flag});

				}

			}

			else{

				flag = 0;
				return res.send({flag : flag})
			}
			

		})
		
	}
	
		
	
	
	
})


// new user registration
app.post('/login',function(req,res){
	var maxid;
	var flag;
 		var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_details',
    });
	connection.connect();
	var id = connection.query('select MAX(id) AS maxid from login',function(err,rows){
		console.log("max id::",rows[0].maxid);
		maxid = rows[0].maxid + 1;

	})

	employee_details = {
		id : maxid,
		name : req.body.name,
		email : req.body.email,
		password : req.body.password,
		contact : req.body.contact,
		usertype : req.body.usertype

	}

	var registration = connection.query('insert into login set ?',[employee_details],function(err,result){
		if(err){
			console.log(err)
		}
		flag = 3
		return res.send({flag: flag})
	})
})


app.get('/login',function(req,res){
	var users = [];
	var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_details',
    });
	connection.connect(); 

	var user = connection.query('select * from login where usertype = ?',['employee'],function(err,rows){

		if(err){
			console.log(err)
		}
		console.log("users:::",rows);
		users = rows;

		return res.send({users: users});

	})


})




module.exports = app ;