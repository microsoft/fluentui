import { Meta } from '@storybook/react';
import { FluentProvider } from '../FluentProvider';
export { Default } from './FluentProviderDefault.stories';
export { Dir } from './FluentProviderDir.stories';
export { Nested } from './FluentProviderNested.stories';
export { Frame } from './FluentProviderFrame.stories';

export default {
  title: 'Components/FluentProvider',
  component: FluentProvider,
} as Meta;
