import chalk from 'chalk';
import gulp from 'gulp';
import cache from 'gulp-cache';
import { log } from 'gulp-util';
import del from 'del';
import path from 'path';
import readPkgUp from 'read-pkg-up';
import { Transform } from 'stream';

import config from '../config';
import gulpReactDocgen from '../plugins/gulp-react-docgen';

const logWatchAdd = (filePath: string) => log('Created', chalk.blue(path.basename(filePath)));
const logWatchChange = (filePath: string) => log('Changed', chalk.magenta(path.basename(filePath)));
const logWatchUnlink = (filePath: string) => log('Deleted', chalk.red(path.basename(filePath)));

/** Cache the task with gulp-cache except when running in CI */
const cacheNonCi: (...args: Parameters<typeof cache>) => NodeJS.ReadWriteStream | Transform = (task, options) =>
  process.env.TF_BUILD ? task : cache(task, options);

async function detectPaths() {
  const info = await readPkgUp();
  const componentsSrc = info?.packageJson.gulp.componentInfo;

  if (!componentsSrc) {
    throw new Error(
      `There is no "gulp.componentInfo" section in "${info?.path}". Please add it before running this task`,
    );
  }

  return {
    componentsSrc,
    outputPath: path.resolve(path.dirname(info?.path ?? ''), 'componentInfo'),
    tsconfigPath: config.paths.docs('tsconfig.json'),
  };
}

gulp.task('clean:component-info', async () => {
  const info = await readPkgUp();
  const outputPath = path.resolve(path.dirname(info?.path ?? ''), 'componentInfo');

  return del([outputPath], { force: true });
});

gulp.task('build:component-info', async () => {
  const { componentsSrc, outputPath, tsconfigPath } = await detectPaths();

  await new Promise(resolve => {
    gulp
      .src(componentsSrc, { since: gulp.lastRun('build:component-info') })
      .pipe(
        cacheNonCi(
          gulpReactDocgen({
            ignoredParentInterfaces: ['DOMAttributes', 'HTMLAttributes'],
            tsconfigPath,
          }),
          { name: 'componentInfo-4' },
        ),
      )
      .pipe(gulp.dest(outputPath))
      .on('end', resolve);
  });
});

gulp.task('watch:component-info', async () => {
  const { componentsSrc } = await detectPaths();

  gulp
    .watch(componentsSrc, gulp.series('build:component-info'))
    .on('add', logWatchAdd)
    .on('change', logWatchChange)
    .on('unlink', logWatchUnlink);
});
