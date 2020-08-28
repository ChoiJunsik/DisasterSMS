const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const indexRouter = require('./routes');
const {montlyDataJob,updaeGraphJob} = require('./containers/Scheduler');
const redis = require('redis');
const cors = require('cors')();
const app = express();

dotenv.config();

app.set('port', process.env.PORT || 8000);

const client = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
    }
);

app.set('redis', client);


app.use(cors);
app.use(morgan('dev')); // 요청/응답 log , 배포환경 : combined
app.use('/', express.static(path.join(__dirname, 'public'))); //실제경로명
//body-parser : form-ajax 요청 해석 후 req.body 객체로 만들어준다, 멀티파트(이미지/동영상은 불가)
app.use(express.json({
    limit: "50mb"
}));//json
app.use(express.urlencoded({ limit: "50mb", extended: false }));//form : false(노드 querystring 이용)
app.use(cookieParser(process.env.COOKIE_SECRET)); // 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만듦

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));
app.use('/', indexRouter);
//error
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send(`${err}`);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});