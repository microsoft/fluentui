import * as React from 'react';

import { STRICT_MODE_ID } from '../constants';
import { FluentStoryContext } from '../hooks';

export const withReactStrictMode = (StoryFn: () => JSX.Element, context: FluentStoryContext) => {
  const isActive = context.globals[STRICT_MODE_ID] ?? false;

  return <StrictModeWrapper strictMode={isActive}>{StoryFn()}</StrictModeWrapper>;
};

const StrictModeWrapper = (props: { strictMode: boolean; children: React.ReactElement }) => {
  return props.strictMode ? <React.StrictMode>{props.children}</React.StrictMode> : props.children;
};
