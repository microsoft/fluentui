import type * as React from 'react';
import { render } from '@testing-library/react';
import { V8Basic, V8CustomCell, V8LayoutAndColumnSizing, V8Selection, V8Sorting } from './index.stories';

const v8Stories = {
  V8Basic,
  V8Selection,
  V8Sorting,
  V8CustomCell,
  V8LayoutAndColumnSizing,
};

test.each(Object.entries(v8Stories))('%s renders without passing row objects to React', (_name, story) => {
  const renderStory = story.render as () => React.ReactElement;

  expect(() => render(renderStory())).not.toThrow();
});
