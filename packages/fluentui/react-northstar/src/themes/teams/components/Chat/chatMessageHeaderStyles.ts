import { ChatMessageHeaderStylesProps } from 'src/components/Chat/ChatMessageHeader';
import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ChatMessageVariables } from './chatMessageVariables';

const chatMessageHeaderStyles: ComponentSlotStylesPrepared<ChatMessageHeaderStylesProps, ChatMessageVariables> = {
  root: () => ({
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  }),
};

export default chatMessageHeaderStyles;
