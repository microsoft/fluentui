import * as React from 'react';
import { Link, LinkProps } from '../index';

export const Default = (props: LinkProps & { as?: 'a' }) => (
  <Link href="https://www.bing.com" {...props}>
    This is a link
  </Link>
);
