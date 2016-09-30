var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    vulcanize = require('gulp-vulcanize'),
    htmlmin = require('gulp-htmlmin');

var jsSources = ['app/scripts/*.js'],
    htmlSources = ['app/**/*.html'],
    cssSources = ['app/styles/*.css'],
    outputDir = 'dist';


gulp.task('build', ['vulcanize']);

gulp.task('autobuild', function() {
  gulp.watch([htmlSources, jsSources, cssSources], ['vulcanize']);
});

gulp.task('serve', ['browser-sync'], function () {
    gulp.watch(htmlSources).on('change', browserSync.reload);
    gulp.watch(jsSources).on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
});

gulp.task('vulcanize', function () {
    return gulp.src('app/index.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false,
            inlineScripts: true,
            inlineCss: true,
            stripComments: true
        }))
        .pipe(htmlmin({
            removeEmptyAttributes: true,
            // customAttrAssign: [{"source":"\\$="}],
            // customAttrSurround: [
            //     [ {"source": "\\({\\{"}, {"source": "\\}\\}"} ],
            //     [ {"source": "\\[\\["}, {"source": "\\]\\]"}  ]
            // ],
            collapseWhitespace: true,
            // always leave one space
            // because http://perfectionkills.com/experimenting-with-html-minifier/#collapse_whitespace
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeCDATASectionsFromCDATA: true
        }))
        .pipe(gulp.dest('dist'));
});
