import * as React from 'react';
import { Link } from '..'; // codesandbox-dependency: @fluentui/react-link ^9.0.0-beta

export const DisabledFocusable = () => (
  <Link inline disabled disabledFocusable>
    Disbaled but still focusable
  </Link>
);
