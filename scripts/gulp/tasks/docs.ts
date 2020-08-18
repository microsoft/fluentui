import { dest, lastRun, parallel, series, src, task, watch, TaskFunction } from 'gulp';
import chalk from 'chalk';
import cache from 'gulp-cache';
import remember from 'gulp-remember';
import { log } from 'gulp-util';
import fs from 'fs';
import path from 'path';
import del from 'del';
import { Transform } from 'stream';
import through2 from 'through2';
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import sh from '../sh';
import config from '../../config';
import gulpComponentMenuBehaviors from '../plugins/gulp-component-menu-behaviors';
import gulpDoctoc from '../plugins/gulp-doctoc';
import gulpExampleMenu from '../plugins/gulp-example-menu';
import gulpExampleSource from '../plugins/gulp-example-source';
import gulpReactDocgen from '../plugins/gulp-react-docgen';
import { getRelativePathToSourceFile } from '../plugins/util';
import webpackPlugin from '../plugins/gulp-webpack';
import { Server } from 'http';
import { findGitRoot, getAllPackageInfo } from '../../monorepo';
import serve, { forceClose } from '../serve';
import { spawnSync } from 'child_process';

const { paths } = config;

const logWatchAdd = (filePath: string) => log('Created', chalk.blue(path.basename(filePath)));
const logWatchChange = (filePath: string) => log('Changed', chalk.magenta(path.basename(filePath)));
const logWatchUnlink = (filePath: string) => log('Deleted', chalk.red(path.basename(filePath)));

const handleWatchUnlink = (group: any, filePath: string) => {
  logWatchUnlink(filePath);
  remember.forget(group, filePath);
};

// ----------------------------------------
// Clean
// ----------------------------------------

task('clean:cache', () => cache.clearAll());

task('clean:docs', () =>
  del(
    [
      paths.packages('ability-attributes/src/schema.ts'),
      paths.docsSrc('behaviorMenu.json'),
      paths.docsDist(),
      paths.docsSrc('exampleMenus'),
      paths.docsSrc('exampleSources'),
    ],
    { force: true },
  ),
);

// ----------------------------------------
// Build
// ----------------------------------------

const behaviorSrc = [`${paths.posix.packageSrc('accessibility')}/behaviors/*/[a-z]*Behavior.ts`];
const examplesIndexSrc = `${paths.posix.docsSrc()}/examples/*/*/*/index.tsx`;
const examplesSrc = `${paths.posix.docsSrc()}/examples/*/*/*/!(*index|.knobs).tsx`;
const markdownSrc = ['packages/fluentui/!(CHANGELOG).md', 'specifications/*.md'];
const schemaSrc = `${paths.posix.packages('ability-attributes')}/schema.json`;

/** Cache the task with gulp-cache except when running in CI */
const cacheNonCi: (...args: Parameters<typeof cache>) => NodeJS.ReadWriteStream | Transform = (task, options) =>
  process.env.TF_BUILD ? task : cache(task, options);

task('build:docs:component-menu-behaviors', () =>
  src(behaviorSrc, { since: lastRun('build:docs:component-menu-behaviors') })
    .pipe(remember('component-menu-behaviors'))
    .pipe(gulpComponentMenuBehaviors())
    .pipe(dest(paths.docsSrc())),
);

task('build:docs:example-menu', () =>
  src(examplesIndexSrc, { since: lastRun('build:docs:example-menu') })
    .pipe(remember('example-menu')) // FIXME: with watch this unnecessarily processes index files for all examples
    .pipe(gulpExampleMenu())
    .pipe(dest(paths.docsSrc('exampleMenus'))),
);

task('build:docs:example-sources', () =>
  src(examplesSrc, { since: lastRun('build:docs:example-sources'), cwd: paths.base(), cwdbase: true })
    .pipe(
      cacheNonCi(gulpExampleSource(), {
        name: 'exampleSources',
      }),
    )
    .pipe(dest(paths.docsSrc('exampleSources'), { cwd: paths.base() })),
);

task(
  'build:docs:json',
  parallel('build:docs:component-menu-behaviors', 'build:docs:example-menu', 'build:docs:example-sources'),
);

task('build:docs:html', () => src(paths.docsSrc('404.html')).pipe(dest(paths.docsDist())));

task('build:docs:images', () => src(`${paths.docsSrc()}/**/*.{png,jpg,gif}`).pipe(dest(paths.docsDist())));

task('build:docs:toc', () =>
  src(markdownSrc, { since: lastRun('build:docs:toc') }).pipe(
    cacheNonCi(gulpDoctoc(), {
      name: 'md-docs',
    }),
  ),
);

task('build:docs:schema', () =>
  src(schemaSrc, { since: lastRun('build:docs:schema') }).pipe(
    through2.obj((file, enc, done) => {
      sh('npm run schema', paths.packages('ability-attributes'))
        .then(() => done(null, file))
        .catch(done);
    }),
  ),
);

task('build:docs:webpack', cb => {
  webpackPlugin(require('../../webpack/webpack.config').default, cb);
});

task(
  'build:docs:assets',
  parallel(
    'build:docs:toc',
    'build:docs:schema',
    series('clean:docs', parallel('build:docs:json', 'build:docs:html', 'build:docs:images')),
  ),
);

task('build:docs:assets:component:info', cb => {
  const fluentRoot = path.resolve(findGitRoot(), 'packages', 'fluentui');
  const lernaArgs = ['lerna', 'run', 'build:info'];

  const result = spawnSync('yarn', lernaArgs, {
    cwd: fluentRoot,
    shell: true,
    stdio: 'inherit',
  });

  if (result.status) {
    throw new Error(result.error.toString() || `lerna run failed with status ${result.status}`);
  }

  cb();
});

task('build:docs', series('build:docs:assets', 'build:docs:webpack'));

// ----------------------------------------
// Deploy
// ----------------------------------------

task('deploy:docs', cb => {
  const relativePath = path.relative(process.cwd(), paths.docsDist());
  return sh(`gh-pages -d ${relativePath} -m "deploy docs [ci skip]"`);
});

// ----------------------------------------
// Serve
// ----------------------------------------

let server: Server;

task('serve:docs', async () => {
  server = await serve(paths.docsDist(), config.server_host, config.server_port);
});

task('serve:docs:hot', async () => {
  const webpackConfig = require('../../webpack/webpack.config').default;
  const compiler = webpack(webpackConfig);

  server = await serve(paths.docsDist(), config.server_host, config.server_port, app => {
    app.use(
      WebpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: paths.docsSrc(),
        hot: process.env.NODE_ENV !== 'production',
        quiet: false,
        noInfo: true, // must be quite for hot middleware to show overlay
        lazy: false,
        stats: config.compiler_stats,
      } as WebpackDevMiddleware.Options),
    );

    if (process.env.NODE_ENV !== 'production') {
      app.use(WebpackHotMiddleware(compiler));
    }

    return app;
  });
});

task('serve:docs:stop', () => forceClose(server));

// ----------------------------------------
// Watch
// ----------------------------------------

task('watch:docs:component-info', () => {
  Object.values(getAllPackageInfo()).forEach(pkg => {
    if (pkg.packageJson.gulp?.componentInfo) {
      const internalTask: TaskFunction = () =>
        src(pkg.packageJson.gulp?.componentInfo, { cwd: pkg.packagePath })
          .pipe(
            cacheNonCi(gulpReactDocgen(paths.docs('tsconfig.json'), ['DOMAttributes', 'HTMLAttributes']), {
              name: 'componentInfo-3',
            }),
          )
          .pipe(dest('componentInfo', { cwd: pkg.packagePath }));
      internalTask.displayName = 'build:docs:component-info';

      const watcher = watch(pkg.packageJson.gulp?.componentInfo, { cwd: pkg.packagePath }, internalTask);

      watcher.on('add', logWatchAdd);
      watcher.on('change', logWatchChange);
    }
  });
});

task('watch:docs:component-menu-behaviors', cb => {
  watch(behaviorSrc, series('build:docs:component-menu-behaviors'))
    .on('add', logWatchAdd)
    .on('change', logWatchChange)
    .on('unlink', filePath => handleWatchUnlink('component-menu-behaviors', filePath));

  cb();
});

task('watch:docs:other', cb => {
  watch(schemaSrc, series('build:docs:schema')).on('change', logWatchChange);

  // rebuild example menus
  watch(examplesIndexSrc, series('build:docs:example-menu'))
    .on('add', logWatchAdd)
    .on('change', logWatchChange)
    .on('unlink', filePath => handleWatchUnlink('example-menu', filePath));

  watch(examplesSrc, series('build:docs:example-sources'))
    .on('add', logWatchAdd)
    .on('change', logWatchChange)
    .on('unlink', filePath => {
      logWatchUnlink(filePath);

      const sourceFilename = getRelativePathToSourceFile(filePath);
      const sourcePath = config.paths.docsSrc('exampleSources', sourceFilename);

      try {
        fs.unlinkSync(sourcePath);
      } catch (e) {}
    });

  // rebuild images
  watch(`${config.paths.docsSrc()}/**/*.{png,jpg,gif}`, series('build:docs:images'))
    .on('add', logWatchAdd)
    .on('change', logWatchChange)
    .on('unlink', logWatchUnlink);

  cb();
});

task('watch:docs', series('watch:docs:component-menu-behaviors', 'watch:docs:other', 'watch:docs:component-info'));

// ----------------------------------------
// Default
// ----------------------------------------

task('docs', series('build:docs:assets', 'build:docs:assets:component:info', 'serve:docs:hot', 'watch:docs'));
