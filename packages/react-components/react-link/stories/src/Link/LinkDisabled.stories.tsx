import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';

export const Disabled = (): JSXElement => (
  <Link disabled href="https://www.bing.com">
    Disabled link
  </Link>
);
