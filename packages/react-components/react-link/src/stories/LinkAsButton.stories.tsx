import * as React from 'react';
import { Link } from '../index';

export const AsButton = () => <Link>Render as a button</Link>;

AsButton.parameters = {
  docs: {
    description: {
      story: ['When the `href` property is not provided, the component is rendered as an html `<button>`'].join('\n'),
    },
  },
};
