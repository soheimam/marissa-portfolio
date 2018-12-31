var gulp = require('gulp');
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();
var imagemin = require("gulp-imagemin")


gulp.task('css', function(){
    return gulp.src([
        "src/css/reset.css",
        "src/css/style.scss",
    ])
    .pipe(sass())
    .pipe(gulp.dest('dist'))
    .pipe(sass().on('error', sass.logError))
    .pipe(browserSync.stream())
})



gulp.task('html', function(){
    return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("images", function (){
    return gulp.src([
        "src/img/*",
        "src/img/*/*"
    ])
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
})

gulp.task('js', function(){
    gulp.src([
        "src/**/*.js"
    ])
    
    .pipe(gulp.dest('dist'))
})


gulp.task("watch", function(){
    browserSync.init({
        server:{
            baseDir:"dist"
        }
    })


    gulp.watch("src/*.html", ['html']).on("change",browserSync.reload)
    gulp.watch("src/css/*", ["css"])
    gulp.watch("src/img/*/*")
    gulp.watch("src/*.js", ['js'])
    gulp.watch("src/*/*.js", ['js'])
})

gulp.task("default",['html','css','images','js','watch']);


