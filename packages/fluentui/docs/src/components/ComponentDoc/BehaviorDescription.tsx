import * as React from 'react';
import { Loader } from '@fluentui/react-northstar';

const AccessibilityDescription = React.lazy(() => import('./InlineMarkdown'));

const item = '- ';

const BehaviorDescription: React.FunctionComponent<{ value: string }> = ({ value }) => {
  // doctrine has a bug where it ignores list item indicator (-) if it is in the beginning of the comment
  // because of that, add the list item indicators after parsing
  const markdown =
    item +
    value
      .split('\n')
      .join(`\n${item}`)
      .replace(/'(?!s )/g, '\u0060'); // replace ' with backtick as regexp rules with backtick would not be understandablein unit tests
  return (
    <React.Suspense fallback={<Loader />}>
      <AccessibilityDescription value={markdown} />
    </React.Suspense>
  );
};

export default BehaviorDescription;
