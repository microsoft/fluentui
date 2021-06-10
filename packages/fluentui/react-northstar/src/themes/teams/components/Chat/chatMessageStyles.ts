import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import * as _ from 'lodash';
import { ChatMessageStylesProps, chatMessageSlotClassNames } from '../../../../components/Chat/ChatMessage';
import { ChatMessageVariables } from './chatMessageVariables';
import { screenReaderContainerStyles } from '../../../../utils/accessibility/Styles/accessibilityStyles';
import { pxToRem } from '../../../../utils';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

const displayActionMenu = (overlayZIndex: ICSSInJSStyle['zIndex']): ICSSInJSStyle => ({
  // we need higher zIndex for the action menu in order to be displayed above the focus border of the chat message
  zIndex: overlayZIndex,
  overflow: 'visible',
  // opacity should always be preferred over visibility in order to avoid accessibility bugs in
  // JAWS behavior on Windows
  opacity: 1,
  width: 'auto',
});

const hideActionMenu = {
  zIndex: -1,
  overflow: 'hidden',
  opacity: 0,
  width: 0,
};

export const chatMessageStyles: ComponentSlotStylesPrepared<ChatMessageStylesProps, ChatMessageVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    display: 'inline-block',
    position: 'relative',

    ...(!p.compact && {
      marginLeft: p.mine ? v.offset : 0,
      marginRight: !p.mine ? v.offset : 0,
      maxWidth: `calc(100% - ${v.offset})`,
      minWidth: v.offset,

      paddingLeft: v.padding,
      paddingRight: v.padding,
      paddingTop: pxToRem(8),
      paddingBottom: pxToRem(10),

      backgroundColor: p.mine ? v.backgroundColorMine : v.backgroundColor,
    }),

    borderRadius: v.borderRadius,
    border: p.compact ? v.compactBorder : v.border,
    outline: 0,

    color: v.color,

    wordBreak: 'break-word',
    wordWrap: 'break-word',

    ...((v.hasMention || v.isImportant) && {
      [`& .${chatMessageSlotClassNames.bar}`]: {
        backgroundColor: v.hasMention ? v.hasMentionColor : v.isImportantColor,
        position: 'absolute',
        ...(p.compact
          ? {
              borderRadius: pxToRem(2),
              height: `calc(100% - ${v.paddingCompact} - ${v.paddingCompact})`,
              left: pxToRem(-56),
              top: v.paddingCompact,
              width: pxToRem(2),
            }
          : {
              borderBottomLeftRadius: 'inherit',
              borderTopLeftRadius: 'inherit',
              height: '100%',
              left: '0',
              top: '0',
              width: pxToRem(3),
            }),
      },
    }),

    ...getBorderFocusStyles({ borderRadius: 'inherit', variables: siteVariables }),

    ...(p.compact && {
      width: '100%',
      ...(p.focused && {
        backgroundColor: v.compactHoverBackground,
        border: v.compactHoverBorder,
        [`& .${chatMessageSlotClassNames.timestamp}`]: {
          opacity: 1,
        },
      }),
      '&:hover': {
        backgroundColor: v.compactHoverBackground,
        border: v.compactHoverBorder,
        [`& .${chatMessageSlotClassNames.timestamp}`]: {
          opacity: 1,
        },
      },
      padding: v.paddingCompact,
    }),

    // actions menu's appearance can be controlled by the value of showActionMenu variable - in this
    // case this variable will serve the single source of truth on whether actions menu should be shown.
    // Otherwise, if the variable is not provided, the default appearance logic will be used for actions menu.
    ...(_.isNil(v.showActionMenu) &&
      p.hasActionMenu && {
        ':hover': {
          [`> .${chatMessageSlotClassNames.actionMenu}`]: displayActionMenu(v.overlayZIndex),
        },
        ...(p.showActionMenu && {
          [`> .${chatMessageSlotClassNames.actionMenu}`]: displayActionMenu(v.overlayZIndex),
        }),
      }),

    ...(!p.compact && {
      ...(p.attached === true && {
        [p.mine ? 'borderTopRightRadius' : 'borderTopLeftRadius']: 0,
        [p.mine ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 0,
        paddingTop: pxToRem(5),
        paddingBottom: pxToRem(7),
      }),
      ...(p.attached === 'top' && {
        [p.mine ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 0,
      }),
      ...(p.attached === 'bottom' && {
        [p.mine ? 'borderTopRightRadius' : 'borderTopLeftRadius']: 0,
        paddingTop: pxToRem(5),
        paddingBottom: pxToRem(7),
      }),
    }),

    [`> .${chatMessageSlotClassNames.body}`]: {
      display: 'flex',
      justifyContent: 'space-between',
      [`> .${chatMessageSlotClassNames.main}`]: {
        flexGrow: 1,
      },
    },
  }),

  actionMenu: ({ props: p, variables: v }): ICSSInJSStyle => {
    const defaultShowActionMenu = p.hasActionMenu && (p.focused || p.showActionMenu);
    const showActionMenu = _.isNil(v.showActionMenu) ? defaultShowActionMenu : v.showActionMenu;

    return {
      backgroundColor: v.backgroundColor,
      border: '1px solid',
      borderColor: v.reactionGroupBorderColor,
      borderRadius: v.borderRadius,
      boxShadow: v.actionMenuBoxShadow,
      '[data-popper-escaped]': {
        opacity: 0,
      },

      ...hideActionMenu,
      ...(showActionMenu && displayActionMenu(v.overlayZIndex)),
    };
  },

  author: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...(((p.mine && !p.compact) || p.attached === 'bottom' || p.attached === true) &&
      (screenReaderContainerStyles as ICSSInJSStyle)),
    color: p.mine && p.compact ? v.authorColorCompact : v.authorColor,
    marginRight: p.compact ? v.authorMarginRightCompact : v.authorMarginRight,
    marginBottom: p.compact ? 0 : v.headerMarginBottom,
    fontWeight: v.authorFontWeight,
    ...(p.compact && { float: 'left' }),
  }),

  timestamp: ({ props: p, variables: v }) => ({
    marginBottom: p.compact ? 0 : v.headerMarginBottom,
    ...(p.mine && {
      color: v.timestampColorMine,
    }),
    ...((p.attached === 'bottom' || p.attached === true) &&
      !p.hasReactionGroup &&
      !p.compact &&
      (screenReaderContainerStyles as ICSSInJSStyle)),
    ...(p.compact && {
      alignSelf: 'flex-start',
      color: v.timestampColorCompact,
      flexShrink: 0,
      marginLeft: v.compactSpacing,
      marginTop: pxToRem(2),
      opacity: 0,
    }),
  }),

  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    color: v.contentColor,
    display: 'block',
    '& a': {
      outline: 'none',
      color: p.mine ? v.linkColorMine : v.linkColor,
      ':focus': {
        textDecoration: 'underline',
      },
    },
    ...(p.hasBadge &&
      p.badgePosition === 'end' &&
      !p.compact && {
        marginRight: pxToRem(4),
      }),
  }),

  badge: ({ props: p, variables: v }) => {
    const sidePosition = p.badgePosition === 'start' ? 'left' : 'right';
    return {
      backgroundColor: v.hasMention ? v.hasMentionNubbinColor : v.isImportantColor,
      color: v.badgeTextColor,
      boxShadow: v.badgeShadow,
      padding: pxToRem(4),
      height: 'auto',
      width: 'auto',
      borderRadius: '50%',
      zIndex: v.zIndex,
      [sidePosition]: 0,
      '& > :first-child': {
        display: 'inline-flex',
      },
      ...(p.compact
        ? {
            alignSelf: 'flex-start',
            flexShrink: 0,
            margin: `${pxToRem(-2)} ${pxToRem(-2)} ${pxToRem(-2)} ${v.compactSpacing}`,
          }
        : {
            transform: p.badgePosition === 'start' ? 'translateX(-50%)' : 'translateX(50%)',
            top: pxToRem(4),
            position: 'absolute',
          }),
    };
  },

  reactionGroup: ({ props: p, variables: v }) => ({
    ...(p.compact
      ? {
          display: 'flex',
          marginTop: pxToRem(4),
        }
      : {
          marginLeft: v.reactionGroupMarginLeft,
          ...(p.hasBadge &&
            p.badgePosition === 'end' && {
              marginRight: pxToRem(2),
            }),
          float: 'right',
        }),
  }),
};
