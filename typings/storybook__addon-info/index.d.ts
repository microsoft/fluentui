// Type definitions for @storybook/addon-info 6.0.0-alpha.2 (DEPRECATED)
// Project: https://github.com/storybookjs/storybook/tree/v6.0.0-alpha.2/addons/info
// Definitions by: Martin Hochel
// Definitions: N/A
// TypeScript Version: 3.1

declare module '@storybook/addon-info' {
  import { DecoratorFunction, StoryFn, StoryContext } from '@storybook/addons';
  export function withInfo<A = unknown>(story: StoryFn<A>, context: StoryContext): ReturnType<DecoratorFunction<A>>;
}
