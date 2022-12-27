import webpack from "webpack-stream"
import uglify from "gulp-uglify"
import rename from "gulp-rename";
import prettierPlugin from 'gulp-prettier-plugin';

export const js = () => {
	app.gulp.src(app.path.src.js)
		.pipe(prettierPlugin(undefined, {filter: true}))
		.pipe(app.gulp.dest(file => file.base));

	return app.gulp.src(app.path.src.js, { sourcemaps: false })
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "JS",
			message: "Error: <%= error.message %>"
		}))
	)
	.pipe(webpack({
		mode: app.isDev ? "development" : "production",
		// output: {
		// 	filename: 'main.min.js'
		// }
	}))
	.pipe(uglify())
	.pipe(rename({
		extname: ".min.js"
	}))
	.pipe(app.gulp.dest(app.path.build.js))
	.pipe(app.plugins.browsersync.stream());
}
