import * as React from 'react';
import { Link } from '@fluentui/react-windmod-preview/link';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { LinkVrScene } from './LinkVrScene';

export const LinkWindmod = (): React.ReactNode => (
  <FluentProvider>
    <LinkVrScene Link={Link} />
  </FluentProvider>
);
