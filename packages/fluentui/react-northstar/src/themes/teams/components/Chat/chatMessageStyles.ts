import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { isNil } from 'lodash';

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

export const chatMessageStyles: ComponentSlotStylesPrepared<ChatMessageStylesProps, ChatMessageVariables> = {
  root: (componentStyleFunctionParam): ICSSInJSStyle => {
    const {
      props: p,
      variables: v,
      theme: { siteVariables },
    } = componentStyleFunctionParam;
    return {
      borderRadius: v.borderRadius,
      color: v.color,
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

      ...(p.compact ? chatMessageStylesCompact : chatMessageStylesComfy).root(componentStyleFunctionParam),
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
    const { props: p, variables: v } = componentStyleFunctionParam;
    return {
      fontWeight: v.authorFontWeight,
      ...(p.compact ? chatMessageStylesCompact : chatMessageStylesComfy).author(componentStyleFunctionParam),
    };
  },

  compactBody: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return p.compact && chatMessageStylesCompact.compactBody(componentStyleFunctionParam);
  },

  timestamp: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return (p.compact ? chatMessageStylesCompact : chatMessageStylesComfy).timestamp(componentStyleFunctionParam);
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
      ...(!p.compact && chatMessageStylesComfy.content(componentStyleFunctionParam)),
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
      ...(p.compact ? chatMessageStylesCompact : chatMessageStylesComfy).badge(componentStyleFunctionParam),
    };
  },

  reactionGroup: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p } = componentStyleFunctionParam;
    return (p.compact ? chatMessageStylesCompact : chatMessageStylesComfy).reactionGroup(componentStyleFunctionParam);
  },
};
