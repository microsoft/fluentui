import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';
import type { LinkProps } from '@fluentui/react-components';

export const Default = (props: LinkProps & { as?: 'a' }): JSXElement => (
  <Link href="https://www.bing.com" {...props}>
    This is a link
  </Link>
);
