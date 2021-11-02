import { Meta } from '@storybook/react';
import { FluentProvider } from '@fluentui/react-provider';
export { Default } from './FluentProviderDefault.stories';
export { Dir } from './FluentProviderDir.stories';
export { DirNested } from './FluentProviderDirNested.stories';
export { Nested } from './FluentProviderNested.stories';
export { Frame } from './FluentProviderFrame.stories';

export default {
  title: 'Components/FluentProvider',
  component: FluentProvider,
} as Meta;
