var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// port 방식 /signup 요청이 왔을때 실행할 함수 등록
app.post("/signup", function(req, res){
  //폼전송한 내용 읽어오기
  // <input name="email""/>
  var email=req.body.email;
  var pwd=req.body.pwd;

  //콘솔에 출력해 보기
  console.log("이메일:"+email+" 비밀번호:"+pwd);
  res.end("/signup ok!")
});

//get 방식 /signup 요청
app.get("/signup", function(req, res){
  var email=req.query.email;
  var pwd=req.query.pwd;
  console.log("이메일:"+email+" 비밀번호:"+pwd);
  res.end("get /signup ok!")
})

app.post("/ajax/test01", function(req, res){
  //전송된 문자열 읽어오기
  var msg=req.body.msg;
  //콘솔에 출력
  console.log("메세지: "+msg);
  //응답
  res.end("post /ajax/test01 ok!")
})

//get 방식 /ajax/test01 요청 처리
app.get("/ajax/test01", function(req, res){
  var msg=req.query.msg;
  console.log("msg :"+msg);
  res.end("post /ajax/test01 ok!")
});

app.post("/ajax/check_id", function(req, res){
  var id=req.body.id;

  if(id == "gura"){ //gura 라는 아이디가 이미 존재 한다고 가정
    res.end('{"canUse":false}');
  }else{
    res.end('{"canUse":true}');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
