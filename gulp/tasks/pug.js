import webHtmlNosvg from "gulp-webp-html-nosvg";
import pug from "gulp-pug";
import versionNumber from "gulp-version-number";

export const pughtml = () => {
	return app.gulp.src(app.path.src.pug)
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "HTML",
			message: "Error: <%= error.message %>"
		})
	))
	.pipe(pug({
		pretty: '\t', // Сжимать файл (false), '\t' табы вместо пробелов
		verbose: true // В терминале какой файл обработан
	}))
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
	.pipe(app.gulp.dest(app.path.build.pug))
	.pipe(app.plugins.browsersync.stream());
}