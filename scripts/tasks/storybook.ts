import { argv } from 'just-scripts';
import * as fs from 'fs';
import * as path from 'path';
import { findGitRoot } from '../monorepo/index';

import storybook from '@storybook/react/standalone';

export function startStorybookTask(options?: { port?: number; quiet?: boolean; ci?: boolean }) {
  options = options || {};
  // This shouldn't be necessary but is needed due to strange logic in
  // storybook lib/core/src/server/config/utils.js
  process.env.NODE_ENV = 'development';

  return async function() {
    let { port, quiet, ci } = argv();

    port = options.port || port;
    quiet = options.quiet || quiet;
    ci = options.ci || ci;

    const localConfigDir = path.join(process.cwd(), '.storybook');
    const localStaticDir = path.join(process.cwd(), 'static');

    await storybook({
      mode: 'dev',
      staticDir: fs.existsSync(localStaticDir) ? [localConfigDir] : [],
      configDir: fs.existsSync(localConfigDir)
        ? localConfigDir
        : path.join(findGitRoot(), 'packages/react-examples/.storybook'),
      port: port || 3000,
      quiet,
      ci,
    });
  };
}

export function buildStorybookTask(options?: { quiet?: boolean }) {
  options = options || {};
  return async function() {
    const localConfigDir = path.join(process.cwd(), '.storybook');

    await storybook({
      mode: 'static',
      staticDir: [path.join(process.cwd(), 'static')],
      configDir: fs.existsSync(localConfigDir)
        ? localConfigDir
        : path.join(findGitRoot(), 'packages/react-examples/.storybook'),
      outputDir: path.join(process.cwd(), 'dist/storybook'),
      quiet: options.quiet || argv().quiet,
    });
  };
}
