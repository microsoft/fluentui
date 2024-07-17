import * as React from 'react';
import { StoryWright, Step } from 'storywright';
import type { StoryContext } from '@storybook/react';

export const withStoryWrightSteps = ({
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
