import { ChatMessageHeaderStylesProps } from '../../../../components/Chat/ChatMessageHeader';
import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ChatMessageVariables } from './chatMessageVariables';

const chatMessageHeaderStyles: ComponentSlotStylesPrepared<ChatMessageHeaderStylesProps, ChatMessageVariables> = {
  root: () => ({
    display: 'block',
    width: 'max-content',
    whiteSpace: 'nowrap',
  }),
};

export default chatMessageHeaderStyles;
