var paths = {
  scripts: [
    // './js/plugins.js',
    './js/main.js',
  ],
  sass: [
    './sass/**/*.scss',
  ],
  images: './images/**/*'
};

var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
const babel = require('gulp-babel');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var pngquant = require('imagemin-pngquant');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence').use(gulp);

gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['> 1%']}))
    .pipe(concat('main.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('img', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('init', function(callback) {
  return runSequence('chmod', 'clean');
});

gulp.task('chmod', shell.task([
  'sudo chmod -R 777 ./',
], {
  interactive: true
}));

gulp.task('clean', function() {
  return del(['dist/main.js', 'dist/main.js.map', 'css/main.css.map', 'css/main.css']);
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['sass', 'scripts', 'watch']);