var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var config= {
	browserSync: {
		watch: [
			'index.html',
			'css/stylesheet.css'
		]
	}
}

gulp.task('server', function(){
	browserSync.init({
		server: './'
	});
	gulp.watch(config.browserSync.watch).on('change', browserSync.reload);
});

gulp.task('default', ['server']);