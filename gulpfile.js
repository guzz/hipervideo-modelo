var gulp = require('gulp')
,	$ = require('gulp-load-plugins')()


// gulp vue (compilar com vueify)

gulp.task("vue", function() {
    return gulp.src('app/vue/main.js')
        .pipe($.browserify({
            transform: 'vueify'
        }))
        .pipe(gulp.dest('public/js'))
        .pipe($.livereload())
});

// gulp plugins (compila css de bibliotecas... sempre colocar os css de bibliotecas ma pasta /js/libs)

gulp.task('plugins', function () {
  return gulp.src('public/js/libs/*.css')
    .pipe($.concatCss("plugins.css"))
    .pipe(gulp.dest('public/styles'));
});

// gulp reload (livereload)

gulp.task('reload', function(){
	gulp.src('public/js/*')
		.pipe($.livereload())
});

// gulp serve (nodemon)

gulp.task('serve', function () {
	$.nodemon({
		script: 'app.js',
		ignore: ['app','public/js']
	})
    .on('restart', function () {
        gulp.src('.').pipe($.livereload())
		console.log('restarted!')
	})
})

// gulp watch

gulp.task('watch', function () {

    $.livereload.listen()

    // watch for changes

    gulp.watch(['app/**/*.jade'], ['reload'])
    gulp.watch(['public/**/*.js','public/**/*.json'], ['reload'])
    gulp.watch(['app/vue/**/*.*'], ['vue'])

});

// gulp build

gulp.task('build', ['plugins', 'vue']);

// gulp

gulp.task('default', ['build','serve','watch']);