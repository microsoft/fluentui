import * as React from 'react';
import { Link, ThemeProvider } from '@fluentui/react-windmod-preview';

import { LinkVrScene } from './LinkVrScene';

export const LinkWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <LinkVrScene Link={Link} />
  </ThemeProvider>
);
