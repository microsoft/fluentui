import * as React from 'react';
import { StoryWright, Step } from 'storywright';
import type { StoryContext } from '@storybook/react';

/**
 *
 * @deprecated - set Steps via Story.parameters.storyWright API
 * This throws error if griffel `makeStyles` apis are used to tweak story rendering
 */
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
