// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Chat } from '@fluentui/react-northstar';
import ChatExampleInScrollableShorthand from '../../examples/components/Chat/Usage/ChatExampleInScrollable.shorthand';

export default {
  component: Chat,
  title: 'Chat',
} as ComponentMeta<typeof Chat>;

export { ChatExampleInScrollableShorthand };
