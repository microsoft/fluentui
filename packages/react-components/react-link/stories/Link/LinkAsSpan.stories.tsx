import * as React from 'react';
import { Link } from '@fluentui/react-components';

export const AsSpan = () => <Link as="span">Render as a span</Link>;

AsSpan.parameters = {
  docs: {
    description: {
      story: ['A Link can be rendered as an html `<span>`, in which case it will have `role="button"` set.'].join('\n'),
    },
  },
};
