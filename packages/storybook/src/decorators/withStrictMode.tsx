import * as React from 'react';
import { useStrictMode } from '../knobs/useStrictMode';

const StrictModeWrapper: React.FunctionComponent<{}> = props => {
  const strictMode = useStrictMode();
  return strictMode ? <React.StrictMode>{props.children}</React.StrictMode> : <>{props.children}</>;
};

export const withStrictMode = (storyFn: () => React.ReactNode) => {
  return <StrictModeWrapper>{storyFn()}</StrictModeWrapper>;
};
