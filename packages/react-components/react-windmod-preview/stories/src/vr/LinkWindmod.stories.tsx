import * as React from 'react';
import { FluentProvider, Link } from '@fluentui/react-windmod-preview';

import { LinkVrScene } from './LinkVrScene';

export const LinkWindmod = (): React.ReactNode => (
  <FluentProvider>
    <LinkVrScene Link={Link} />
  </FluentProvider>
);
