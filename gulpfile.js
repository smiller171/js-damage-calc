const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    vulcanize = require('gulp-vulcanize'),
    htmlmin = require('gulp-htmlmin'),
    client = require('firebase-tools'),
    firebaseRewrites = require('browser-sync-middleware-firebase-rewrites');

var jsSources = ['app/scripts/*.js'],
    htmlSources = ['app/**/*.html'],
    cssSources = ['app/styles/*.css'],
    appDir = './app/',
    outputDir = 'dist';


gulp.task('build', ['vulcanize']);

gulp.task('deploy', function() {
    client.deploy({
        project: 'js-damage-calc',
        token: process.env.FIREBASE_TOKEN,
        cwd: appDir
    }).then(function() {
        console.log('Rules have been deployed!');
        process.exit(0);
    }).catch(function(err) {
        console.log('Rules failed to deploy!');
        process.exit(1);
    });

})

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
            baseDir: appDir
        },
        middleware: [
            firebaseRewrites({
                firebase: require('./firebase.json'),
                baseDir: appDir
            })
        ]
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
        .pipe(gulp.dest(outputDir));
});
