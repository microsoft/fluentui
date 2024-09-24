import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { deprecateReactComponentsPreviewPackages } from './deprecate-react-components-preview-packages';

jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}));

const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;

describe('deprecateReactComponentsPreviewPackages', () => {
  const fixtures = fs.readdirSync(path.join(__dirname, 'fixtures/deprecate-react-components-preview-packages'));

  beforeEach(() => {
    mockExecSync.mockReset();
  });

  it.each(fixtures)('%s', fixture => {
    const {
      deprecatedPackages = [],
      shouldThrow = false,
    } = require(`./fixtures/deprecate-react-components-preview-packages/${fixture}/expected.js`);

    console.log('Deprecated packages:', deprecatedPackages);

    const fn = () => {
      deprecateReactComponentsPreviewPackages({
        argv: {
          changeFilesRoot: `scripts/executors/src/fixtures/deprecate-react-components-preview-packages/${fixture}/change`,
          token: 'npm-token',
        },
      });
    };

    if (shouldThrow) {
      expect(fn).toThrow();
    } else {
      fn();

      expect(mockExecSync).toHaveBeenCalledTimes(deprecatedPackages.length);
      expect(mockExecSync).toHaveBeenCalledWith([
        `npm deprecate @fluentui/react-carousel-preview "This package is deprecated. Please use @fluentui/react-carousel instead."`,
      ]);
    }
  });
});
