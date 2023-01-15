import gulp from "gulp";

import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

function isBuild() {
	return process.argv.includes('--build') || process.argv.includes('build');
}

// Передаем значения в глобальную переменную
global.app = {
	isBuild: isBuild(),
	isDev: !isBuild(),
	path: path,
	gulp: gulp,
	plugins: plugins
};

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
// import { html } from "./gulp/tasks/html.js";
import { pughtml } from "./gulp/tasks/pug.js";
import { scss } from "./gulp/tasks/sass.js";
import { server } from "./gulp/tasks/server.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";


// Наблюдатель
function watcher () {
	gulp.watch(path.watch.files, copy)
	gulp.watch(path.watch.images, images)
	// gulp.watch(path.watch.html, html) // для работы с HTML
	gulp.watch(path.watch.pug, pughtml) // для работы с Pug
	gulp.watch(path.watch.sass, scss)
	gulp.watch(path.watch.js, js)
}

function watcher_online () {
	gulp.watch(path.watch.images, images)
	gulp.watch(path.watch.sass, gulp.series(scss, ftp))
	// gulp.watch(path.watch.sass, ftp)
	gulp.watch(path.watch.js, js)
}

// const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(reset, gulp.parallel(copy, pughtml, scss, js, images)); // для работы с Pug
// const mainTasks = gulp.series(reset, gulp.parallel(copy, fonts, html, scss, js, images)); // для работы с HTML

const dev = gulp.series(mainTasks, gulp.parallel(watcher, server));
const online = gulp.series(mainTasks, gulp.parallel(watcher_online));
const build = gulp.series(mainTasks);
const deployZIP = gulp.series(mainTasks, zip);
const deploy = gulp.series(ftp);

export { dev }
export { online }
export { build }
export { deployZIP }
export { deploy }

gulp.task('default', dev);