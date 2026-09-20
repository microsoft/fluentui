import * as React from 'react';

import { Link } from '@fluentui/react-modern-components-preview/link';
import type { LinkProps } from '@fluentui/react-modern-components-preview/link';

export const Default = (props: LinkProps & { as?: 'a' }): React.ReactNode => (
  <Link href="https://www.bing.com" {...props}>
    This is a link
  </Link>
);
