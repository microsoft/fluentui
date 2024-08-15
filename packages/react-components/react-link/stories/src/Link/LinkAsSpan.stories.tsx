import * as React from 'react';
import { Link, makeResetStyles } from '@fluentui/react-components';

const useDivWithWidthClassName = makeResetStyles({
  width: '200px',
});

export const AsSpan = () => (
  <div className={useDivWithWidthClassName()}>
    The following link renders as a span.{' '}
    <Link as="span" inline>
      Links that render as a span wrap correctly between lines when their content is very long
    </Link>
    . This is because they behave as regular inline elements.
  </div>
);

AsSpan.parameters = {
  docs: {
    description: {
      story: [
        'A Link can be rendered as an html `<span>`, in which case it will have `role="button"` set.',
        'Links that render as a span wrap correctly between lines, behaving as inline elements as opposed to links rendered as buttons, which always behave as inline-block elements that do not wrap correctly.',
      ].join('\n'),
    },
  },
};
