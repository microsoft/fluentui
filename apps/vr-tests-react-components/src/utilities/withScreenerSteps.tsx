import * as React from 'react';
import { StoryWright, Step } from 'storywright';
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
  return <StoryWright steps={steps}> {story()} </StoryWright>;
};
