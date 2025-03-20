# react-text-visual-regression

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build react-text-visual-regression` to build the library.

## Running visual regression

Run `nx run react-text-visual-regression:test-vr-cli`.

## About

Project for visual regression scenarios.

> Uses Free, Secure and OSS VR testing solution based on:
>
> - Storybook to author VR scenarios
> - StoryWright for capturing Stories and their interactions
> - Visual Regression Assert CLI - to execute diffing and updating snapshots baseline

## Authoring VR scenarios

1. write stories following Storybook CSF3 format

```ts
import { Steps, type StoryParameters } from 'storywright';

export default {
  title: 'Text Converged',
  // 1. Define decorators to create scoped images that won't change dimensions over time
  decorators: [
    Story => (
      <div className="testWrapper" style={{ width: '250px' }}>
        <Story />
      </div>
    ),
  ],
  // 2. If interactions are needed , define those via StoryWright Steps API
  parameters: {
    storyWright: { steps: new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof Text>;
```

2. Override steps per story if needed

```ts
export const Default = {
  name: 'Default',
  render: () => {
    return <div>markup</div>;
  },
  // 1. overriding default export steps - this story will execute different behaviors
  parameters: {
    storyWright: { steps: new Steps().click().snapshot('normal').end() },
  } satisfies StoryParameters,
} satisfies StoryObj;
```

3. leverage `@fluentui/visual-regression-utilities` to create scenarios for Right to Left, Dark Mode, High Contrast Mode etc

```ts
export const Default = {
  // 1. name is mandatory to properly propagate it to getStoryVariant fn call
  name: 'Default',
  render: () => {
    return <div>markup</div>;
  },
} satisfies StoryObj;

// 2. create new Variants of your scenario
export const DefaultRTL = getStoryVariant(Default, RTL);
```
