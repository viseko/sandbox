// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./build`;
const srcFolder = `./src`;

export const path = {
	build: {
		fonts: `${buildFolder}/assets/fonts/`,
		images: `${buildFolder}/assets/img/`,
		js: `${buildFolder}/assets/js/`,
		css: `${buildFolder}/assets/css/`,
		pug: `${buildFolder}/`,
		html: `${buildFolder}/`,
		files: `${buildFolder}/assets/`,
	},
	src: {
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		js: `${srcFolder}/js/*.js`,
		sass: `${srcFolder}/sass/main.scss`,
		pug: `${srcFolder}/pug/*.pug`,
		html: `${srcFolder}/*.html`,
		files: `${srcFolder}/assets/**/*.*`,
	},
	watch: {
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
		js: `${srcFolder}/js/**/*.js`,
		sass: `${srcFolder}/sass/**/*.scss`,
		pug: `${srcFolder}/pug/**/*.pug`,
		html: `${srcFolder}/**/*.html`,
		files: `${srcFolder}/data/**/*.*`,
	}, 
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
}
