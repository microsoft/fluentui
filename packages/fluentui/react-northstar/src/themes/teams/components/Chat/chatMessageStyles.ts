import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { isNil } from 'lodash';

import { ChatDensity, defaultChatDensity } from '../../../../components/Chat/chatDensityContext';
import { chatMessageSlotClassNames, ChatMessageStylesProps } from '../../../../components/Chat/ChatMessage';
import { pxToRem } from '../../../../utils';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { chatMessageStylesComfy } from './chatMessageStylesComfy';
import { chatMessageStylesCompact } from './chatMessageStylesCompact';
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

const getChatMessageDensityStyles = (density: ChatDensity = defaultChatDensity) => chatMessageDensityStyles[density];

export const chatMessageStyles: ComponentSlotStylesPrepared<ChatMessageStylesProps, ChatMessageVariables> = {
  root: (componentStyleFunctionParam): ICSSInJSStyle => {
    const {
      props: p,
      variables: v,
      theme: { siteVariables },
    } = componentStyleFunctionParam;
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

      ...getChatMessageDensityStyles(p.density).root?.(componentStyleFunctionParam),
    };
  },

  actionMenu: ({ props: p, variables: v }): ICSSInJSStyle => {
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
    };
  },

  author: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return getChatMessageDensityStyles(p.density).author?.(componentStyleFunctionParam);
  },

  compactBody: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return getChatMessageDensityStyles(p.density).compactBody?.(componentStyleFunctionParam);
  },

  timestamp: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return {
      display: 'inline-block',
      ...getChatMessageDensityStyles(p.density).timestamp?.(componentStyleFunctionParam),
    };
  },

  content: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p, variables: v } = componentStyleFunctionParam;
    return {
      color: v.contentColor,
      display: 'block',
      '& a': {
        outline: 'none',
        color: p.mine ? v.linkColorMine : v.linkColor,
        ':focus': {
          textDecoration: 'underline',
        },
      },
      ...getChatMessageDensityStyles(p.density).content?.(componentStyleFunctionParam),
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
      ...getChatMessageDensityStyles(p.density).badge?.(componentStyleFunctionParam),
    };
  },

  reactionGroup: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return getChatMessageDensityStyles(p.density).reactionGroup?.(componentStyleFunctionParam);
  },
};
