import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatDensity, defaultChatDensity } from '../../../../components/Chat/chatDensity';
import { ChatItemStylesProps } from '../../../../components/Chat/ChatItem';
import { chatItemStylesComfy } from './chatItemStylesComfy';
import { chatItemStylesCompact } from './chatItemStylesCompact';
import { ChatItemVariables } from './chatItemVariables';

const chatItemDensityStyles: Record<
  ChatDensity,
  ComponentSlotStylesPrepared<ChatItemStylesProps, ChatItemVariables>
> = {
  comfy: chatItemStylesComfy,
  compact: chatItemStylesCompact,
};

const getChatItemDensityStyles = (density: ChatDensity = defaultChatDensity) => chatItemDensityStyles[density];

export const chatItemStyles: ComponentSlotStylesPrepared<ChatItemStylesProps, ChatItemVariables> = {
  root: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;

    return {
      paddingBottom: 0,
      position: 'relative',

      ...getChatItemDensityStyles(p.density).root(componentStyleFunctionParam),
    };
  },

  gutter: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;

    return {
      position: 'absolute',
      ...((p.attached === 'bottom' || p.attached === true) && {
        display: 'none',
      }),

      ...getChatItemDensityStyles(p.density).gutter(componentStyleFunctionParam),
    };
  },

  message: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;

    return {
      float: p.contentPosition === 'end' ? 'right' : 'left',
      position: 'relative',

      ...getChatItemDensityStyles(p.density).message(componentStyleFunctionParam),
    };
  },
};
