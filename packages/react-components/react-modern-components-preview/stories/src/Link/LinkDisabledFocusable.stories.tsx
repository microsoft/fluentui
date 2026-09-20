import * as React from 'react';

import { Link } from '@fluentui/react-modern-components-preview/link';

export const DisabledFocusable = (): React.ReactNode => (
  <Link inline disabled disabledFocusable href="https://www.bing.com">
    Disabled but still focusable
  </Link>
);
