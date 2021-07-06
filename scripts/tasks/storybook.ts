import { argv } from 'just-scripts';
import * as fs from 'fs';
import * as path from 'path';
import { findGitRoot } from '../monorepo/index';

import storybook from '@storybook/react/standalone';

// Option types are documented here but not included in package for some reason
// https://github.com/storybookjs/storybook/blob/master/lib/core/docs/standalone.md

interface StorybookCommonOptions {
  /** Directory where to load Storybook configurations from */
  configDir: string;
  /** Directory where to load static files from, array of strings mappings between localDir and remote path */
  staticDir: string[];
  /** Suppress verbose build output */
  quiet?: boolean;
}

interface StorybookDevOptions extends StorybookCommonOptions {
  mode: 'dev';
  /** Port to run Storybook */
  port?: number;
  /** Host to run Storybook */
  host?: string;
  /** Serve Storybook over HTTPS. Note: You must provide your own certificate information. */
  https?: boolean;
  /** Provide an SSL certificate authority. (Optional with "https", required if using a self-signed certificate) */
  sslCa?: string;
  /** Provide an SSL certificate. (Required with "https") */
  sslCert?: string;
  /** Provide an SSL key. (Required with "https") */
  sslKey?: string;
  /** Exit after successful start */
  smokeTest?: boolean;
  /** CI mode (skip interactive prompts, don't open browser) */
  ci?: boolean;
}

interface StorybookStaticOptions extends StorybookCommonOptions {
  mode: 'static';
  /** Directory where to store built files */
  outputDir: string;
  /** Enable watch mode */
  watch?: boolean;
}

function getCommonOptions(): StorybookCommonOptions {
  console.log(`node heap limit = ${require('v8').getHeapStatistics().heap_size_limit / (1024 * 1024)} MB`);

  const localConfigDir = path.join(process.cwd(), '.storybook');

  return {
    staticDir: [path.join(process.cwd(), 'static')],
    configDir: fs.existsSync(localConfigDir)
      ? localConfigDir
      : path.join(findGitRoot(), 'packages/react-examples/.storybook'),
    quiet: argv().quiet,
  };
}

export function startStorybookTask() {
  // This shouldn't be necessary but is needed due to strange logic in
  // storybook lib/core/src/server/config/utils.js
  process.env.NODE_ENV = 'development';

  return async function () {
    const { port = 3000, ci } = argv();
    const options: StorybookDevOptions = {
      ...getCommonOptions(),
      mode: 'dev',
      port,
      ci,
    };
    await storybook(options);
  };
}

export function buildStorybookTask() {
  return async function () {
    const options: StorybookStaticOptions = {
      ...getCommonOptions(),
      mode: 'static',
      outputDir: path.join(process.cwd(), 'dist/storybook'),
    };
    if (process.env.TF_BUILD) {
      console.log('Storybook options:', JSON.stringify(options, null, 2));
    }
    await storybook(options);
  };
}
