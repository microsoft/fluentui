import * as path from 'node:path';

import { baseConfig } from '@fluentui/scripts-cypress';
import { registerTsPaths } from '@fluentui/scripts-storybook';

const tsConfigPath = path.resolve(__dirname, '../../tsconfig.base.v8.json');

const config = { ...baseConfig };

registerTsPaths({ config: config.component.devServer.webpackConfig, configFile: tsConfigPath });

export default config;
