import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';

export const Bold = (): JSXElement => (
  <Link bold href="https://www.bing.com">
    Bold link
  </Link>
);

Bold.parameters = {
  docs: {
    description: {
      story: 'A link can be rendered with `bold` to apply a semibold font weight.',
    },
  },
};
