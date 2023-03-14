import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { isNil } from 'lodash';

import { ChatDensity, defaultChatDensity } from '../../../../components/Chat/chatDensity';
import { chatMessageSlotClassNames, ChatMessageStylesProps } from '../../../../components/Chat/ChatMessage';
import { pxToRem } from '../../../../utils';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { chatMessageStylesComfy } from './chatMessageStylesComfy';
import { chatMessageStylesCompact } from './chatMessageStylesCompact';
import { chatMessageStylesComfyRefresh } from './chatMessageStylesComfyRefresh';
import { ChatMessageVariables } from './chatMessageVariables';

const displayActionMenu = (overlayZIndex: ICSSInJSStyle['zIndex']): ICSSInJSStyle => ({
  // we need higher zIndex for the action menu in order to be displayed above the focus border of the chat message
  zIndex: overlayZIndex,
  overflow: 'visible',
  // opacity should always be preferred over visibility in order to avoid accessibility bugs in
  // JAWS behavior on Windows
  opacity: 1,
  width: 'auto',
});

const chatMessageDensityStyles: Record<
  ChatDensity,
  ComponentSlotStylesPrepared<ChatMessageStylesProps, ChatMessageVariables>
> = {
  comfy: chatMessageStylesComfy,
  compact: chatMessageStylesCompact,
};

const getChatMessageVariantStyles = (props: ChatMessageStylesProps) => {
  const density = props.density || defaultChatDensity;
  if (props.layout === 'refresh' && density === 'comfy') {
    return chatMessageStylesComfyRefresh;
  }
  return chatMessageDensityStyles[density];
};

export const chatMessageStyles: ComponentSlotStylesPrepared<ChatMessageStylesProps, ChatMessageVariables> = {
  root: (componentStyleFunctionParam): ICSSInJSStyle => {
    const {
      props: p,
      variables: v,
      theme: { siteVariables },
    } = componentStyleFunctionParam;

    if (p.layout === 'refresh' && p.density === 'comfy') {
      return chatMessageStylesComfyRefresh.root(componentStyleFunctionParam);
    }
    return {
      borderRadius: v.borderRadius,
      display: 'inline-block',
      outline: 0,
      position: 'relative',
      wordBreak: 'break-word',
      wordWrap: 'break-word',

      ...getBorderFocusStyles({ borderRadius: 'inherit', variables: siteVariables }),

      // ActionMenu's appearance can be controlled by the value of showActionMenu variable - in this
      // case this variable will serve the single source of truth on whether actions menu should be shown.
      // Otherwise, if the variable is not provided, the default appearance logic will be used for actions menu.
      ...(isNil(v.showActionMenu) &&
        p.hasActionMenu && {
          ':hover': {
            [`> .${chatMessageSlotClassNames.actionMenu}`]: displayActionMenu(v.overlayZIndex),
          },
          ...(p.showActionMenu && {
            [`> .${chatMessageSlotClassNames.actionMenu}`]: displayActionMenu(v.overlayZIndex),
          }),
        }),

      ...getChatMessageVariantStyles(p).root?.(componentStyleFunctionParam),
    };
  },

  actionMenu: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p, variables: v } = componentStyleFunctionParam;
    const defaultShowActionMenu = p.hasActionMenu && (p.focused || p.showActionMenu);
    const showActionMenu = isNil(v.showActionMenu) ? defaultShowActionMenu : v.showActionMenu;

    return {
      backgroundColor: v.backgroundColor,
      border: '1px solid',
      borderColor: v.reactionGroupBorderColor,
      borderRadius: v.borderRadius,
      boxShadow: v.actionMenuBoxShadow,
      '[data-popper-escaped]': { opacity: 0 },

      zIndex: -1,
      overflow: 'hidden',
      opacity: 0,
      width: 0,
      ...(showActionMenu && displayActionMenu(v.overlayZIndex)),
      ...getChatMessageVariantStyles(p).actionMenu?.(componentStyleFunctionParam),
    };
  },

  author: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return getChatMessageVariantStyles(p).author?.(componentStyleFunctionParam);
  },

  compactBody: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return getChatMessageVariantStyles(p).compactBody?.(componentStyleFunctionParam);
  },

  timestamp: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return {
      display: 'inline-block',
      ...getChatMessageVariantStyles(p).timestamp?.(componentStyleFunctionParam),
    };
  },

  badge: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p, variables: v } = componentStyleFunctionParam;
    return {
      backgroundColor: v.hasMention ? v.hasMentionNubbinColor : v.isImportantColor,
      borderRadius: '50%',
      boxShadow: v.badgeShadow,
      color: v.badgeTextColor,
      height: 'auto',
      padding: pxToRem(4),
      width: 'auto',
      zIndex: v.zIndex,
      '& > :first-child': { display: 'inline-flex' },
      ...getChatMessageVariantStyles(p).badge?.(componentStyleFunctionParam),
    };
  },

  body: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return {
      ...getChatMessageVariantStyles(p).body?.(componentStyleFunctionParam),
    };
  },

  bubble: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return {
      ...getChatMessageVariantStyles(p).bubble?.(componentStyleFunctionParam),
    };
  },

  bubbleInset: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return {
      ...getChatMessageVariantStyles(p).bubbleInset?.(componentStyleFunctionParam),
    };
  },

  reactionGroup: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return getChatMessageVariantStyles(p).reactionGroup?.(componentStyleFunctionParam);
  },
};
