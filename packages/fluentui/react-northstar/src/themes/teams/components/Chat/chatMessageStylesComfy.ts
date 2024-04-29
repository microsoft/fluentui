import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { chatMessageSlotClassNames, ChatMessageStylesProps } from '../../../../components/Chat/ChatMessage';
import { pxToRem } from '../../../../utils';
import { screenReaderContainerStyles } from '../../../../utils/accessibility/Styles/accessibilityStyles';
import { ChatMessageVariables } from './chatMessageVariables';

/** ChatMessage styles specific for the default/comfy density. */
export const chatMessageStylesComfy: ComponentSlotStylesPrepared<ChatMessageStylesProps, ChatMessageVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    marginLeft: p.mine ? v.offset : 0,
    marginRight: !p.mine ? v.offset : 0,
    maxWidth: `calc(100% - ${v.offset})`,
    minWidth: v.offset,

    paddingLeft: v.padding,
    paddingRight: v.padding,
    paddingTop: pxToRem(8),
    paddingBottom: pxToRem(10),

    backgroundColor: p.mine ? v.backgroundColorMine : v.backgroundColor,
    border: v.border,

    ...((v.hasMention || v.isImportant) && {
      [`& .${chatMessageSlotClassNames.bar}`]: {
        backgroundColor: v.hasMention ? v.hasMentionColor : v.isImportantColor,
        position: 'absolute',

        borderBottomLeftRadius: 'inherit',
        borderTopLeftRadius: 'inherit',
        height: '100%',
        left: '0',
        top: '0',
        width: pxToRem(3),
      },
    }),

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

  author: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...((p.mine || p.attached === 'bottom' || p.attached === true) && (screenReaderContainerStyles as ICSSInJSStyle)),
    color: v.authorColor,
    fontWeight: v.authorFontWeight,
    marginRight: v.authorMarginRight,
    marginBottom: v.headerMarginBottom,
  }),

  badge: ({ props: p }) => ({
    [p.badgePosition === 'start' ? 'left' : 'right']: 0,
    transform: p.badgePosition === 'start' ? 'translateX(-50%)' : 'translateX(50%)',
    top: pxToRem(4),
    position: 'absolute',
  }),

  reactionGroup: ({ props: p, variables: v }) => ({
    marginLeft: v.reactionGroupMarginLeft,
    ...(p.hasBadge && p.badgePosition === 'end' && { marginRight: pxToRem(2) }),
    float: 'right',
  }),

  timestamp: ({ props: p, variables: v }) => ({
    marginBottom: v.headerMarginBottom,
    ...((p.attached === 'bottom' || p.attached === true) &&
      !p.hasHeaderReactionGroup &&
      (screenReaderContainerStyles as ICSSInJSStyle)),
  }),
};
