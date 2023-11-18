import { ComponentMeta } from '@storybook/react';

export default {
  title: 'Shadow DOM',
} as ComponentMeta<'div'>;

export { Default } from './ShadowDOMDefault.stories';
export { Portal } from './ShadowDOMPortal.stories';
