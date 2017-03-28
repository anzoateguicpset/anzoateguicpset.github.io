var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	pug = require('gulp-pug'),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync').create();

var config= {
	browserSync: {
		watch: [ 'index.html', 'sassPath', 'cssPath']
	},
	sassPath: 'sass/*.scss',
	cssPath: 'css',
	pugMainFile: 'pug/index.pug', 
	pugDir: 'pug/*.pug'
}

gulp.task('pugIndex', function buildHTML() {
  return gulp.src(config.pugMainFile)
	.pipe(pug({
  			pretty: ' ',
  			debug: true, 
  			compileDebug: true
			}))
	.on('error', notify.onError(function (error) {
    return 'An error occurred while compiling pug.\nLook in the console for details.\n' + error;
	}))
	.pipe(gulp.dest('./'))
	.pipe(browserSync.stream());
});

gulp.task('sass', function(){
	return gulp.src(config.sassPath)
	.pipe(sass())
    .pipe(rename({
    	basename: 'stylesheet',
    	extname: '.css'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('server', function(){
	browserSync.init({
		server: './'
	});
	gulp.watch(config.browserSync.watch).on('change', browserSync.reload);
});


gulp.watch(config.sassPath, ['sass']);
gulp.watch(config.pugMainFile, ['pugIndex']);
gulp.watch(config.pugDir, ['pugIndex']);

gulp.task('default', ['server']);