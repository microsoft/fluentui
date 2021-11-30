import * as React from 'react';
import { Link } from '../index';

export const DisabledFocusable = () => (
  <Link inline disabled disabledFocusable>
    Disabled but still focusable
  </Link>
);
