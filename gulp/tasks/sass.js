import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; // Сжатие CSS
// import webpcss from "gulp-webpcss"; // Вывод WEBP-изображений
import autoprefixer from "gulp-autoprefixer"; // Вендорные префиксы
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Группировка медиа-запросов
// import sourcemaps from "gulp-sourcemaps"; // Группировка медиа-запросов

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.sass, { sourcemaps: true })
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "SASS",
			message: "Error: <%= error.message %>"
		})
	))
	.pipe(app.plugins.replace(/@img\//g, '../assets/img/'))
	// .pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	.pipe(groupCssMediaQueries())
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserlist: ["last 3 versions"],
		cascade: true
	}))
	// Расскомментировать если нужен не сжатый дубль файла стилей
	//.pipe(app.gulp.dest(app.path.build.css))
	.pipe(cleanCss())
	.pipe(rename({
		extname: ".min.css"
	}))
	// .pipe(sourcemaps.write('.'))
	.pipe(app.gulp.dest(app.path.build.css))
	.pipe(app.plugins.browsersync.stream());
}