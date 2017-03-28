var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require("gulp-rename"),
	browserSync = require('browser-sync').create();

var config= {
	browserSync: {
		watch: [ 'index.html', 'sassPath', 'cssPath']
	},
	sassPath: 'sass/*.scss',
	cssPath: 'css'
}

gulp.task('sass', function(){
	return gulp.src(config.sassPath)
	.pipe(sass())
    .pipe(rename({
    	basename: "stylesheet",
    	extname: ".css"
    }))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task('server', function(){
	browserSync.init({
		server: './'
	});
	gulp.watch(config.browserSync.watch).on('change', browserSync.reload);
});


gulp.watch(config.sassPath, ['sass']);

gulp.task('default', ['server']);