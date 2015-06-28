var gulp = require('gulp');
var connect = require('gulp-connect');

//defing http server for tests
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});
