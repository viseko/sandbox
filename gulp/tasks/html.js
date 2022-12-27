import fileInclude from "gulp-file-include";
import webHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
	return app.gulp.src(app.path.src.html)
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "HTML",
			message: "Error: <%= error.message %>"
		}))
	)
	.pipe(fileInclude())
	.pipe(app.plugins.replace(/@img\//g, 'assets/img/'))
	// .pipe(webHtmlNosvg())
	.pipe(
		versionNumber({
			'value': '%DT%',
			'append': {
				'key': 'v',
				'cover': 0,
				'to': [
					'css',
					'js',
				]
			},
			'output': {
				'file': 'gulp/version.json'
			}
		})
	)
	// .pipe(revAppend())
	.pipe(app.gulp.dest(app.path.build.html))
	.pipe(app.gulp.src(`${app.path.build.html}/*.html`))
	.pipe(app.plugins.browsersync.stream());
}