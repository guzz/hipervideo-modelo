var debug = require('debug')('dapes');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var livereload = require('connect-livereload');
var useragent = require('express-useragent');
var fs = require('fs');
var router = express.Router();

var routes = {
    index: require(path.join(__dirname, 'app/routes/index'))
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(sassMiddleware({
//     src: __dirname + 'app/sass',
//     dest: __dirname + 'public/styles',
//     debug: true,
//     outputStyle: 'expanded',
//     prefix: '/styles'
// }));
app.use(livereload());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(path.join(__dirname, 'node_modules')));
app.use(useragent.express());

app.use('/', routes.index);
// app.use('/users', routes.users);
// app.use('/vue', routes.vue);

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

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), function(err) {
    debug('Express server listening on port ' + app.get('port'));
});
