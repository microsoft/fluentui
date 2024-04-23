import { spawnSync } from 'child_process';
import fs from 'fs';
import { Server } from 'http';
import path from 'path';
import { Transform } from 'stream';

import { getAllPackageInfo, workspaceRoot } from '@fluentui/scripts-monorepo';
import { sh } from '@fluentui/scripts-utils';
import chalk from 'chalk';
import del from 'del';
import { TaskFunction, dest, lastRun, parallel, series, src, task, watch } from 'gulp';
import cache from 'gulp-cache';
import remember from 'gulp-remember';
import { log } from 'gulp-util';
import through2 from 'through2';
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import config from '../config';
import gulpComponentMenuBehaviors from '../plugins/gulp-component-menu-behaviors';
import gulpDoctoc from '../plugins/gulp-doctoc';
import gulpExampleMenu from '../plugins/gulp-example-menu';
import gulpExampleSource from '../plugins/gulp-example-source';
import gulpReactDocgen from '../plugins/gulp-react-docgen';
import webpackPlugin from '../plugins/gulp-webpack';
import { getComponentInfo, getRelativePathToSourceFile } from '../plugins/util';

import { forceClose, serve } from './serve';

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
      name: 'md-docs-v2',
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
  webpackPlugin(require('../webpack/webpack.config').default, cb);
});

task('build:docs:assets:component:info', cb => {
  const buildInfoCmdArgs = ['nx', 'run-many', '--target=build:info', '--projects=tag:react-northstar'];

  const result = spawnSync('yarn', buildInfoCmdArgs, {
    cwd: workspaceRoot,
    shell: true,
    stdio: 'inherit',
  });

  if (result.status) {
    throw new Error(result.error?.toString() || `run failed with status ${result.status}`);
  }

  cb();
});

task(
  'build:docs:assets',
  parallel(
    'build:docs:toc',
    'build:docs:schema',
    'build:docs:assets:component:info',
    series('clean:docs', parallel('build:docs:json', 'build:docs:html', 'build:docs:images')),
  ),
);

task('component-info:debug', done => {
  const componentInfo = getComponentInfo({
    tsconfigPath: paths.docs('tsconfig.json'),
    filePath: paths.packageSrc('react-northstar', 'components/Skeleton/SkeletonAvatar.tsx'),
    ignoredParentInterfaces: [], // can be omitted?
  });

  // console.log(JSON.stringify(componentInfo, null, 2));
  fs.writeFileSync('SkeletonAvatar.info.json', JSON.stringify(componentInfo, null, 2));
  done();
});

task('build:docs', series('build:docs:assets', 'build:docs:webpack'));

// ----------------------------------------
// Serve
// ----------------------------------------

let server: Server;

task('serve:docs', async () => {
  server = await serve(paths.docsDist(), config.server_host, config.server_port);
});

task('serve:docs:hot', async () => {
  const webpackConfig = require('../webpack/webpack.config').default;
  const compiler = webpack(webpackConfig);

  server = await serve(paths.docsDist(), config.server_host, config.server_port, app => {
    app.get('/public/*', (req, res) => {
      res.status(404);
      res.send(
        'Assets from "/public" should be served from CDN, please check "packages/fluentui/docs/README.md" to check how you can upload images.',
      );
    });

    app.use(
      WebpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: 'errors-warnings',
      } as WebpackDevMiddleware.Options<any, any>),
    );

    if (process.env.NODE_ENV !== 'production') {
      app.use(WebpackHotMiddleware(compiler as any));
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
            cacheNonCi(
              gulpReactDocgen({
                ignoredParentInterfaces: ['DOMAttributes', 'HTMLAttributes'],
                tsconfigPath: paths.docs('tsconfig.json'),
              }),
              { name: 'componentInfo-4' },
            ),
          )
          .pipe(dest('componentInfo', { cwd: pkg.packagePath }));
      internalTask.displayName = 'build:docs:component-info';

      const watcher = watch(pkg.packageJson.gulp?.componentInfo, { cwd: pkg.packagePath }, internalTask);

      watcher.on('add', logWatchAdd);
      watcher.on('change', logWatchChange);
    }
  });
});

const allBehaviorSrc = [
  // original behavior files in @fluentui/accessibility
  ...behaviorSrc,
  // new behavior files in @fluentui/a11y-testing. They are required dynamically by gulpComponentMenuBehaviors
  `${paths.posix.allPackages('a11y-testing')}/src/definitions/*/[a-z]*Definition.ts`,
];
task('watch:docs:component-menu-behaviors', cb => {
  watch(allBehaviorSrc, series('build:docs:component-menu-behaviors'))
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
        // eslint-disable-next-line no-empty
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

task('docs', series('build:docs:assets', 'serve:docs:hot', 'watch:docs'));
