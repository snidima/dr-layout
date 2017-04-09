var gulp = require('gulp');

var sass = require('gulp-sass');//https://www.npmjs.com/package/gulp-sass/
var browserSync = require('browser-sync').create();//https://www.browsersync.io/docs/gulp
var plumber = require('gulp-plumber');//https://www.npmjs.com/package/gulp-plumber
var autoprefixer = require('gulp-autoprefixer');//https://www.npmjs.com/package/gulp-autoprefixer
var cleanCSS = require('gulp-clean-css');//https://github.com/scniro/gulp-clean-css
var sourcemaps = require('gulp-sourcemaps'); //https://www.npmjs.com/package/gulp-sourcemaps
var named = require('vinyl-named');
var jade = require('gulp-jade');




gulp.task('sass', function () {
  return gulp.src('./src/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
        indentedSyntax: true
      }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public_html/css/'));
});

gulp.task('jade', function() {
  return gulp.src('./src/template/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public_html/'))
});


// gulp.task('sass:prodaction', function () {
//     return gulp.src('./src/sass/**/*.sass')
//         .pipe(plumber())
//         .pipe(sass({
//             indentedSyntax: true
//         }).on('error', sass.logError))
//         .pipe(autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }))
//         .pipe(cleanCSS({keepSpecialComments : 0}))
//         .pipe(gulp.dest('./public_html/css/'));
// });


gulp.task('serve', ['sass','jade'], function() {
    browserSync.init({
        server: {
            baseDir: "./public_html"
        }
    });
    gulp.watch('./src/sass/**/*', ['sass']);
    gulp.watch('./src/template/**/*', ['jade']);
    gulp.watch(["./public_html/**/*"]).on('change', function () {
        browserSync.reload();
    });
});



gulp.task('production', ['sass:prodaction']);