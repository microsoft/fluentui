import * as React from 'react';
import { Link } from '@fluentui/react-link';

export const Inline = () => (
  <div>
    This is an{' '}
    <Link href="https://www.bing.com" inline>
      inline link
    </Link>{' '}
    used alongside other text
  </div>
);
