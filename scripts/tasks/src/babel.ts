import fs from 'fs';
import path from 'path';

import { BabelFileResult, transformAsync } from '@babel/core';
import * as glob from 'glob';
import { logger } from 'just-scripts';

const EOL_REGEX = /\r?\n/g;

function addSourceMappingUrl(code: string, loc: string): string {
  // Babel keeps stripping this comment, even when correct option is set. Adding manually.
  return code + '\n//# sourceMappingURL=' + path.basename(loc);
}

export async function babel() {
  const files = glob.sync('{lib,lib-commonjs}/**/*.js');

  for (const filename of files) {
    const filePath = path.resolve(process.cwd(), filename);

    const codeBuffer = await fs.promises.readFile(filePath);
    const sourceCode = codeBuffer.toString().replace(EOL_REGEX, '\n');

    const result = (await transformAsync(sourceCode, {
      ast: false,
      sourceMaps: true,

      babelrc: true,
      // to avoid leaking of global configs
      babelrcRoots: [process.cwd()],

      caller: { name: 'just-scripts' },
      filename: filePath,

      sourceFileName: path.basename(filename),
      plugins: [
        // [
        //   'module-resolver',
        //   {
        //     alias: {
        //       '@fluentui/babel-preset-global-context': ['../babel-preset-global-context/lib/index.js'],
        //       '@fluentui/global-context': ['../global-context/lib/index.js'],
        //       '@fluentui/keyboard-key': ['packages/keyboard-key/lib/index.js'],
        //       '@fluentui/keyboard-keys': ['../keyboard-keys/lib/index.js'],
        //       '@fluentui/priority-overflow': ['../priority-overflow/lib/index.js'],
        //       '@fluentui/react-accordion': ['../react-accordion/lib/index.js'],
        //       '@fluentui/react-alert': ['../react-alert/lib/index.js'],
        //       '@fluentui/react-aria': ['../react-aria/lib/index.js'],
        //       '@fluentui/react-avatar': ['../react-avatar/lib/index.js'],
        //       '@fluentui/react-avatar-context': ['../react-avatar-context/lib/index.js'],
        //       '@fluentui/react-badge': ['../react-badge/lib/index.js'],
        //       '@fluentui/react-button': ['../react-button/lib/index.js'],
        //       '@fluentui/react-card': ['../react-card/lib/index.js'],
        //       '@fluentui/react-checkbox': ['../react-checkbox/lib/index.js'],
        //       '@fluentui/react-combobox': ['../react-combobox/lib/index.js'],
        //       '@fluentui/react-components': ['../react-components/lib/index.js'],
        //       '@fluentui/react-components/unstable': ['../react-components/lib/unstable/index.js'],
        //       '@fluentui/react-conformance': ['packages/react-conformance/lib/index.js'],
        //       '@fluentui/react-conformance-griffel': ['../react-conformance-griffel/lib/index.js'],
        //       '@fluentui/react-context-selector': ['../react-context-selector/lib/index.js'],
        //       '@fluentui/react-data-grid-react-window': ['../react-data-grid-react-window/lib/index.js'],
        //       '@fluentui/react-datepicker': ['../react-datepicker/lib/index.js'],
        //       '@fluentui/react-dialog': ['../react-dialog/lib/index.js'],
        //       '@fluentui/react-divider': ['../react-divider/lib/index.js'],
        //       '@fluentui/react-field': ['../react-field/lib/index.js'],
        //       '@fluentui/react-focus-management': ['packages/react-focus-management/lib/index.js'],
        //       '@fluentui/react-image': ['../react-image/lib/index.js'],
        //       '@fluentui/react-infobutton': ['../react-infobutton/lib/index.js'],
        //       '@fluentui/react-input': ['../react-input/lib/index.js'],
        //       '@fluentui/react-label': ['../react-label/lib/index.js'],
        //       '@fluentui/react-link': ['../react-link/lib/index.js'],
        //       '@fluentui/react-menu': ['../react-menu/lib/index.js'],
        //       '@fluentui/react-migration-v0-v9': ['../react-migration-v0-v9/lib/index.js'],
        //       '@fluentui/react-migration-v8-v9': ['packages/react-migration-v8-v9/lib/index.js'],
        //       '@fluentui/react-overflow': ['../react-overflow/lib/index.js'],
        //       '@fluentui/react-persona': ['../react-persona/lib/index.js'],
        //       '@fluentui/react-popover': ['../react-popover/lib/index.js'],
        //       '@fluentui/react-portal': ['../react-portal/lib/index.js'],
        //       '@fluentui/react-portal-compat': ['../react-portal-compat/lib/index.js'],
        //       '@fluentui/react-portal-compat-context': ['../react-portal-compat-context/lib/index.js'],
        //       '@fluentui/react-positioning': ['../react-positioning/lib/index.js'],
        //       '@fluentui/react-progress': ['../react-progress/lib/index.js'],
        //       '@fluentui/react-provider': ['../react-provider/lib/index.js'],
        //       '@fluentui/react-radio': ['../react-radio/lib/index.js'],
        //       '@fluentui/react-select': ['../react-select/lib/index.js'],
        //       '@fluentui/react-shared-contexts': ['../react-shared-contexts/lib/index.js'],
        //       '@fluentui/react-skeleton': ['../react-skeleton/lib/index.js'],
        //       '@fluentui/react-slider': ['../react-slider/lib/index.js'],
        //       '@fluentui/react-spinbutton': ['../react-spinbutton/lib/index.js'],
        //       '@fluentui/react-spinner': ['../react-spinner/lib/index.js'],
        //       '@fluentui/react-storybook-addon': ['../react-storybook-addon/lib/index.js'],
        //       '@fluentui/react-switch': ['../react-switch/lib/index.js'],
        //       '@fluentui/react-table': ['../react-table/lib/index.js'],
        //       '@fluentui/react-tabs': ['../react-tabs/lib/index.js'],
        //       '@fluentui/react-tabster': ['../react-tabster/lib/index.js'],
        //       '@fluentui/react-tags': ['../react-tags/lib/index.js'],
        //       '@fluentui/react-text': ['../react-text/lib/index.js'],
        //       '@fluentui/react-textarea': ['../react-textarea/lib/index.js'],
        //       '@fluentui/react-theme': ['../react-theme/lib/index.js'],
        //       '@fluentui/react-theme-sass': ['../react-theme-sass/lib/index.js'],
        //       '@fluentui/react-toolbar': ['../react-toolbar/lib/index.js'],
        //       '@fluentui/react-tooltip': ['../react-tooltip/lib/index.js'],
        //       '@fluentui/react-tree': ['../react-tree/lib/index.js'],
        //       '@fluentui/react-utilities': ['../react-utilities/lib/index.js'],
        //       '@fluentui/react-virtualizer': ['../react-virtualizer/lib/index.js'],
        //       '@fluentui/theme-designer': ['../theme-designer/lib/index.js'],
        //       '@fluentui/tokens': ['../../tokens/lib/index.js'],
        //     },
        //   },
        // ],
      ],
    })) /* Bad `transformAsync` types. it can be null only if 2nd param is null(config)*/ as NonNullableRecord<BabelFileResult>;
    const resultCode = addSourceMappingUrl(result.code, path.basename(filename) + '.map');

    if (resultCode === sourceCode) {
      logger.verbose(`babel: skipped ${filePath}`);
      continue;
    } else {
      logger.verbose(`babel: transformed ${filePath}`);
    }

    const sourceMapFile = filePath + '.map';

    await fs.promises.writeFile(filePath, resultCode);
    await fs.promises.writeFile(sourceMapFile, JSON.stringify(result.map));
  }
}

type NonNullableRecord<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
