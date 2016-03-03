var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	nodemon = require('gulp-nodemon'),
	bower = require('gulp-bower'),
	del = require('del'),
	runSequence = require('run-sequence');
	mainBowerFiles = require('main-bower-files'),
	browserify = require('gulp-browserify');


gulp.task('default',function(){
	runSequence('clean',
		['scripts','images','css','bower','static']);
		//'nodemon',
		//'watch');
});

gulp.task('scripts',function(){
	return gulp.src('./www/js/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(concat('main.js'))
			.pipe(gulp.dest('./public/js'))
			.pipe(uglify())
			.pipe(rename({suffix:'.min'}))
			.pipe(gulp.dest('./public/js'))
			.pipe(notify({message:'Scripts task completed'}));
});

/*
gulp.task('nodemon', function () {	
	var started = false;
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			console.log('sever started');
			started = true; 
		} 
	});

});
*/

gulp.task('bower',function(){
	return gulp.src(mainBowerFiles())
			.pipe(gulp.dest('./public/libs'))
			.pipe(notify({message:'Bower task completed'}));
});

gulp.task('images',function(){
	return gulp.src('./www/img/**.*')
			.pipe(gulp.dest('./public/img'))
			.pipe(notify({message:'Images task completed'}));
});

gulp.task('static',function(){
	return gulp.src('./www/**/*.html')
			.pipe(gulp.dest('./public/'))
			.pipe(notify({message:'Static task complete'}))
});

gulp.task('css',function(){
	return gulp.src('./www/css/*')
			.pipe(gulp.dest('./public/css/'))
			.pipe(notify({message:'CSS task complete'}))
});

gulp.task('watch',function(){
	gulp.watch('./www/js/**/*.js',['scripts']);
	gulp.watch('./www/libs/**/*',['bower']);
	gulp.watch('./www/img/*',['images']);
	gulp.watch('./www/css/*',['css']);
	gulp.watch('./www/**/*.html',['static']);
	livereload.listen();
	gulp.watch(['./public/**']).on('change', livereload.changed);
});



gulp.task('clean', function() {
    return del(['public/*','!public/upload/temp','!public/upload/temp/*','!public/upload','!public/upload/*']);
});


//gulp.task('jshint',function(){
//gulp.src('./app/**/*.js').pipe(jshint());});

