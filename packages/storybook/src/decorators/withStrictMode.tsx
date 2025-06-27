import * as React from 'react';
import type { Decorator } from '@storybook/react';

const StrictModeWrapper: React.FunctionComponent<{ strictMode: boolean; children?: React.ReactNode }> = props => {
  return props.strictMode ? <React.StrictMode>{props.children}</React.StrictMode> : <>{props.children}</>;
};

export const withStrictMode: Decorator = (storyFn, context) => {
  const strictMode = context.globals.strictMode === 'on';

  return <StrictModeWrapper strictMode={strictMode}>{storyFn()}</StrictModeWrapper>;
};
