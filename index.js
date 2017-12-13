var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

var routes = {
	'/getColor': function(req,res){
		res.end(JSON.stringify({a:3,b:4}))
	},
	'/haha': function(req,res){
		res.end('the route matches haha')
	},
	'/user=luo': function(req,res){
		res.end( fs.readFileSync(__dirname + '/sample/d.js'))
	}
}

function parseBody(body){
	console.log(body)
	var obj = {}
	body.split('&').forEach(function(str){
		obj[str.split('=')[0]] = str.split('=')[1]
	})
	return obj
}

function routePath(req,res){
	var pathObj = url.parse(req.url, true)
	var handleFn = routes[pathObj.pathname]
	if (handleFn){
		req.query = pathObj.query

		var body = ''
		req.on('data',function(chunk){
			console.log(chunk)
			body += chunk
		}).on('end', function(){
			req.body = parseBody(body)
			handleFn(req,res)
		})
	}else {
		staticRoot(path.resolve(__dirname,'sample'),req,res)
	}
}



function staticRoot(staticPath, req, res){
	var pathObj = url.parse(req.url, true)

	console.log(pathObj)

	if(pathObj.pathname === '/'){
		pathObj.pathname += 'test.html'
	}
	
	var filePath = path.join(staticPath, pathObj.pathname)

	fs.readFile(filePath, 'binary', function(err, fileContent){
		if(err){
			console.log('404')
			res.writeHead(404, 'not found')
			res.end('<h1>404 Not Found</h1>')
		}else{
			console.log('ok')
			res.writeHead(200, 'OK')
			res.write(fileContent, 'binary')
			res.end()
		}
	})
}



var server = http.createServer(function(req, res){
	routePath(req,res)
})


server.listen(9000)
console.log('visit http://localhost:9000')