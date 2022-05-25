import * as React from 'react';
import { Link } from '../index';

export const DisabledFocusable = () => (
  <Link inline disabled disabledFocusable href="https://www.bing.com">
    Disabled but still focusable
  </Link>
);
