import * as React from 'react';
import type { Decorator } from '@storybook/react';
import { StoryWright, Step } from 'storywright';

/**
 * A decorator that wraps the story in a `StoryWright` component with the provided steps.
 * Also allows to pass steps as a parameter to the story.
 *
 * @param steps - The steps to pass to the `StoryWright` component.
 * @returns The decorator function.
 */
export const StoryWrightDecorator =
  (steps: Step[] = []): Decorator =>
  (story, context) =>
    <StoryWright steps={steps}> {story(context)} </StoryWright>;
