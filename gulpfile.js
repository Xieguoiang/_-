var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var revCollector = require('gulp-rev-collector');
var minifyHTML   = require('gulp-minify-html');
var rev = require('gulp-rev');
var sequence = require('gulp-sequence');


// jscopy css scripts rev

gulp.task('jscopy',function(){
	return gulp.src(['src/js/*.js'])
                .pipe(rev())
                .pipe(uglify())
				.pipe(gulp.dest('dist/static/js'))
                .pipe( rev.manifest() )
                .pipe( gulp.dest( 'rev/js' ) );
})
gulp.task('imgcopy',function(){
    // return gulp.src(['img/amplify.png','img/fxicon.png','img/icon.png','img/person.png'])
    return gulp.src(['src/img/*.png'])
                .pipe(rev())
                .pipe(gulp.dest('dist/static/img'))
                .pipe( rev.manifest() )
                .pipe( gulp.dest( 'rev/img' ) );
})

gulp.task('css', function () {
    return gulp.src(['src/css/*.css'])
        .pipe(rev())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/static/css'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});
 
// gulp.task('scripts', function () {
//     return gulp.src(['js/index.js','js/api.js','js/data.js','js/layout.js'])
//         .pipe(rev())
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/static/js'))
//         .pipe( rev.manifest() )
//         .pipe( gulp.dest( 'rev/javascript' ) );


// });
gulp.task('rev', function () {
    return gulp.src(['rev/**/*.json', 'src/html/index.html'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                '../css': 'static/css',
                '../js': 'static/js',
                '../img': 'static/img',
                // 'cdn/': function(manifest_value) {
                //     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                // }
            }
        }) )
        .pipe( minifyHTML({
                empty:true,
                spare:true
            }) )
        .pipe( gulp.dest('dist') );
});




gulp.task('build', gulp.parallel(['jscopy', 'imgcopy','css'],'rev', function () {
  console.log("==============================================")
}));

