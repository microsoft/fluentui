import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';

import { STRICT_MODE_ID } from '../constants';
import { FluentStoryContext } from '../hooks';
import { isDecoratorDisabled } from '../utils/isDecoratorDisabled';

export const withReactStrictMode = (StoryFn: () => JSXElement, context: FluentStoryContext): JSXElement => {
  if (isDecoratorDisabled(context, 'ReactStrictMode')) {
    return StoryFn();
  }

  const isActive = context.globals[STRICT_MODE_ID] ?? false;

  return <StrictModeWrapper strictMode={isActive}>{StoryFn()}</StrictModeWrapper>;
};

const StrictModeWrapper = (props: { strictMode: boolean; children: React.ReactElement }) => {
  return props.strictMode ? <React.StrictMode>{props.children}</React.StrictMode> : props.children;
};
