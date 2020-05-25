import { ChatMessageHeaderStylesProps } from '../../../../components/Chat/ChatMessageHeader';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ChatMessageVariables } from './chatMessageVariables';
import { screenReaderContainerStyles } from '../../../../utils/accessibility/Styles/accessibilityStyles';

const chatMessageHeaderStyles: ComponentSlotStylesPrepared<ChatMessageHeaderStylesProps, ChatMessageVariables> = {
  root: ({ props: p }) => {
    return {
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      ...((p.attached === 'bottom' || p.attached === true) &&
        !p.hasReactionGroup &&
        (screenReaderContainerStyles as ICSSInJSStyle)),
    };
  },
};

export default chatMessageHeaderStyles;
