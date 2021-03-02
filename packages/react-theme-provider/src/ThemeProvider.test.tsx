import { isConformant } from '@fluentui/react-conformance';
import * as path from 'path';

import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider (isConformant)', () => {
  isConformant({
    Component: ThemeProvider,

    componentPath: path.resolve(__dirname, 'ThemeProvider.tsx'),
    displayName: 'ThemeProvider',
  });
});
