const gulp = require('gulp')
const pug = require('gulp-pug')
const stylus = require('gulp-stylus')
const connect = require('gulp-connect')
const autoprefixer=require('gulp-autoprefixer')
const babel = require('gulp-babel')
const opn= require('opn')

gulp.task('build:lib',function(){
    gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
  ]).pipe(gulp.dest('dist/lib'))
})

gulp.task('build:famliy',function()
{
  gulp.src(['src/font/方正悠黑简体_502L.ttf',
  ]).pipe(gulp.dest('dist/font'))
})

gulp.task('build:html',function(){
  gulp.src(['src/html/*.pug'])
  .pipe(pug({pretty:true}))
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload())
})

gulp.task('build:image',function(){
  gulp.src(['src/image/**/*'])
  .pipe(gulp.dest('dist/image'))
  .pipe(connect.reload())
})

gulp.task('build:style',function(){
  gulp.src(['src/css/*.styl'])
  .pipe(stylus())
  .pipe(autoprefixer())
  .pipe(gulp.dest('dist/style'))
  .pipe(connect.reload())
})

gulp.task('build:script',function(){
  gulp.src(['src/js/*.js'])
  .pipe(babel({
    presets:['env']
  }))
  .pipe(gulp.dest('dist/js'))
  .pipe(connect.reload())
})

gulp.task('watch',function(){
  gulp.watch('src/html/**',['build:html'])
  gulp.watch('src/image/**',['build:image'])
  gulp.watch('src/css/**',['build:style'])
  gulp.watch('src/js/**',['build:script'])
})

gulp.task('build',[
  'build:famliy',
  'build:lib',
  'build:html',
  'build:image',
  'build:style',
  'build:script'
])
gulp.task('connect',function(){
  connect.server({
    root:'dist',
    port:9527,
    livereload:true
  })
  opn('http://localhost:9527')
})

gulp.task('dev',['build','connect','watch'])