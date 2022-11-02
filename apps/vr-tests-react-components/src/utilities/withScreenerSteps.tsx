import * as React from 'react';
import Screener, { Step } from 'screener-storybook/src/screener';
import { StoryContext } from './types';

export const withScreenerSteps = ({
  story,
  context,
  steps,
}: {
  story: () => React.ReactNode;
  steps: Step[];
  context?: StoryContext;
}) => {
  return <Screener steps={steps}> {story()} </Screener>;
};
