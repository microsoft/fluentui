import { Meta } from '@storybook/react';
import { FluentProvider } from '../FluentProvider'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta
export { Default } from './FluentProviderDefault.stories';
export { Dir } from './FluentProviderDir.stories';
export { Nested } from './FluentProviderNested.stories';
export { Frame } from './FluentProviderFrame.stories';

export default {
  title: 'Components/FluentProvider',
  component: FluentProvider,
} as Meta;
