import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { chatMessageSlotClassNames, ChatMessageStylesProps } from '../../../../components/Chat/ChatMessage';
import { pxToRem } from '../../../../utils';
import { screenReaderContainerStyles } from '../../../../utils/accessibility/Styles/accessibilityStyles';
import { ChatMessageVariables } from './chatMessageVariables';

/** ChatMessage styles specific for the compact density. */
export const chatMessageStylesCompact: ComponentSlotStylesPrepared<ChatMessageStylesProps, ChatMessageVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    border: v.compactBorder,
    padding: v.paddingCompact,
    width: '100%',

    ...((v.hasMention || v.isImportant) && {
      [`& .${chatMessageSlotClassNames.bar}`]: {
        backgroundColor: v.hasMention ? v.hasMentionColor : v.isImportantColor,
        position: 'absolute',
        borderRadius: pxToRem(2),
        height: `calc(100% - ${v.paddingCompact} - ${v.paddingCompact})`,
        left: pxToRem(-56),
        top: v.paddingCompact,
        width: pxToRem(2),
      },
    }),

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
  }),

  author: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...((p.attached === 'bottom' || p.attached === true) && (screenReaderContainerStyles as ICSSInJSStyle)),
    color: p.mine ? v.authorColorCompact : v.authorColor,
    float: 'left',
    fontWeight: v.authorFontWeight,
    marginRight: v.authorMarginRightCompact,
  }),

  badge: ({ variables: v }): ICSSInJSStyle => ({
    alignSelf: 'flex-start',
    flexShrink: 0,
    margin: `${pxToRem(-2)} ${pxToRem(-2)} ${pxToRem(-2)} ${v.compactSpacing}`,
  }),

  compactBody: (): ICSSInJSStyle => ({
    display: 'flex',
    justifyContent: 'space-between',
  }),

  reactionGroup: (): ICSSInJSStyle => ({
    display: 'flex',
    marginTop: pxToRem(4),
  }),

  timestamp: ({ variables: v }): ICSSInJSStyle => ({
    alignSelf: 'flex-start',
    color: v.timestampColorCompact,
    flexShrink: 0,
    marginLeft: v.compactSpacing,
    marginTop: pxToRem(2),
    opacity: 0,
  }),
};
