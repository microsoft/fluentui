import * as React from 'react';
import { StoryWright, Step } from 'storywright';
import { StoryContext } from '@storybook/react';

export const withStoryWrightSteps = ({
  story,
  context,
  steps,
}: {
  story: () => React.ReactNode;
  steps: Step[];
  context?: StoryContext;
}) => {
  return <StoryWright steps={context?.parameters.steps ?? steps}> {story()} </StoryWright>;
};
