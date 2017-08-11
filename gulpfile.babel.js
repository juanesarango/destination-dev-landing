const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const fontAwesome = require('node-font-awesome');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const jqueryPath = 'node_modules/jquery/dist';
const bootstrapPath = 'node_modules/bootstrap/js/dist';

gulp.task('serve', ['sass', 'html', 'images', 'logos', 'icons', 'fonts', 'js'], function() {

  browserSync.init({
      server: "./dist"
  });

  gulp.watch('app/styles/*.scss', ['sass']);
  gulp.watch('app/js/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch('app/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch(['app/img/*.png', 'app/img/*.jpg'], ['images']).on('change', browserSync.reload);
});

gulp.task('sass', () => {
  return gulp.src("app/styles/*.scss")
    .pipe(sass({
      includePaths: [fontAwesome.scssPath]
    }).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 1 version'] }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src([
      `${jqueryPath}/jquery.js`,
      `${bootstrapPath}/util.js`,
      `${bootstrapPath}/collapse.js`,
      'app/js/*.js'
    ])
    .pipe(babel({presets: 'babel-preset-es2015'}))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('html', () => {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', () => {
  gulp.src(fontAwesome.fonts)
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', () => {
  gulp.src(['app/img/*.png', 'app/img/*.jpg'])
    .pipe(gulp.dest('dist/img'));
});

gulp.task('logos', () => {
  gulp.src(['app/logos/*.png', 'app/logos/*.jpg'])
    .pipe(gulp.dest('dist/logos'));
});

gulp.task('icons', () => {
  gulp.src(['app/icons/*.png', 'app/icons/*.jpg'])
    .pipe(gulp.dest('dist/icons'));
});

gulp.task('prod', ['html', 'images', 'logos', 'icons', 'fonts', 'js'], () => {
  return gulp.src('app/styles/*.scss')
    .pipe(sass({
      includePaths: [fontAwesome.scssPath],
      outputStyle: 'compressed'
    }))
    .pipe(cleanCSS())
    .pipe(autoprefixer({ browsers: ['last 1 version']}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('server', ['serve']);
gulp.task('build', ['prod']);
