# node-server

## index.js为静态服务器。主要思路是，创建一个sever，server中执行routePath函数。

routePath函数有两个参数：req，res。它解析了req的url，并与routes中的对象匹配，从而根据不同的匹配结果进行不同的操作。

（1）如果pathObj.pathname和routes中的对象可以匹配上，那么开始处理路由：
routePath可以处理get和post请求，通过解析url将get的内容放入req.query中，通过监听data和end事件将post的内容放入body中。

（2）否则认为是静态目录，并执行staticRoot函数：
解析rul，利用fs模块读取文件。如果读不到，有报错功能。


PS：
routes为一个对象，用来匹配路由，可以自行添加。
parseBody函数是用来解析url中的query的，例如，它可以将localhost:8888/select?name=a&id=5中“name=a&id=5“这部分转为对象。
