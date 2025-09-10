import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';

export const Inline = (): JSXElement => (
  <div>
    This is an{' '}
    <Link href="https://www.bing.com" inline>
      inline link
    </Link>{' '}
    used alongside other text
  </div>
);
