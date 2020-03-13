const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer')

gulp.task('scripts', () => {
	return gulp.src(['src/js/colors.js', 'src/js/main.js'])
		.pipe(concat('all.js'))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('styles', () => {
	return gulp.src(['src/css/primer-core.css', 'src/css/style.css'])
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
		.pipe(concat('all.css'))
		.pipe(csso())
		.pipe(gulp.dest('dist'))
});

gulp.task('default', gulp.parallel('scripts', 'styles'));