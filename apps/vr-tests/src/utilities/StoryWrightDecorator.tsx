import * as React from 'react';
import type { DecoratorFn } from '@storybook/react';
import { StoryWright, Step } from 'storywright';

/**
 * A decorator that wraps the story in a `StoryWright` component with the provided steps.
 * Also allows to pass steps as a parameter to the story.
 *
 * @param steps - The steps to pass to the `StoryWright` component.
 * @returns The decorator function.
 *
 * @example
 * ```tsx
 * import { Steps } from 'storywright';
 *
 * export default {
 *  title: 'ExampleComponent',
 *  decorators: [withStoryWrightSteps(steps)],
 * } satisfies Meta<typeof ExampleComponent>;
 *
 * type Story = StoryFn<typeof ExampleComponent>;
 *
 * export const WithDefaultSteps: Story = () => <Component />;
 *
 * export const WithCustomSteps: Story = () => <Component />;
 * WithCustomSteps.parameters = {
 *  steps: new Steps()
 *  .snapshot('default', { cropTo: '.testWrapper' })
 *  .hover('.fui-Link')
 *  .snapshot('hover', { cropTo: '.testWrapper' })
 *  .end();
 * };
 * ```
 */
export const StoryWrightDecorator =
  (steps: Step[] = []): DecoratorFn =>
  (story, context) =>
    <StoryWright steps={context.parameters.steps ?? steps}> {story(context)} </StoryWright>;
