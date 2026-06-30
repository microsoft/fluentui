import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';

export const Inverted = (): JSXElement => (
  <div style={{ backgroundColor: '#333', padding: '16px' }}>
    <Link appearance="inverted" href="https://www.bing.com">
      Inverted link
    </Link>
  </div>
);

Inverted.parameters = {
  docs: {
    description: {
      story:
        'A link can use `appearance="inverted"` to be styled for dark backgrounds, ' +
        'using inverted foreground link tokens for default, hover, and pressed states.',
    },
  },
};
