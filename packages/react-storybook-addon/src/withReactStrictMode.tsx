import * as React from 'react';
import { StoryFn as StoryFunction } from '@storybook/addons';

import { STRICT_MODE_ID } from './constants';
import { StoryContext } from './hooks';

export const withReactStrictMode = (StoryFn: StoryFunction<React.ReactElement>, context: StoryContext) => {
  const isActive = context.globals[STRICT_MODE_ID] ?? false;

  return <StrictModeWrapper strictMode={isActive}>{StoryFn()}</StrictModeWrapper>;
};

const StrictModeWrapper = (props: { strictMode: boolean; children: React.ReactElement }) => {
  return props.strictMode ? <React.StrictMode>{props.children}</React.StrictMode> : props.children;
};
