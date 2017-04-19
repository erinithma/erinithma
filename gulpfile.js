var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create();


gulp.task('style', function () {
	return gulp.src('./less/**/*.less')
		.pipe(less())
		.pipe(concat('bundle.css'))
		.pipe(autoprefixer(
			'last 2 version',
			'safari 5',
			'ie 8',
			'ie 9',
			'opera 12.1',
			'ios 6',
			'android 4'
		))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./docs/'));
});

gulp.task('watch', ['style'], function () {
	browserSync.init({
		server: {
			baseDir: './docs',
			index: 'index.html'
		}
	});
	gulp.watch('./less/**/*.less', ['style']);
    gulp.watch('./less/**/*.less').on('change', browserSync.reload);
	gulp.watch('./docs/*').on('change', browserSync.reload);
});

gulp.task('default', ['style']);
