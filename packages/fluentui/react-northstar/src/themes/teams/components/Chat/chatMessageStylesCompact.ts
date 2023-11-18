import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { chatMessageSlotClassNames, ChatMessageStylesProps } from '../../../../components/Chat/ChatMessage';
import { pxToRem } from '../../../../utils';
import { screenReaderContainerStyles } from '../../../../utils/accessibility/Styles/accessibilityStyles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { ChatMessageVariables } from './chatMessageVariables';

/** ChatMessage styles specific for the compact density. */
export const chatMessageStylesCompact: ComponentSlotStylesPrepared<ChatMessageStylesProps, ChatMessageVariables> = {
  root: ({ theme: { siteVariables }, variables: v }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({ borderRadius: 'inherit', variables: siteVariables });
    const highlight = {
      backgroundColor: v.compactHoverBackground,
      border: v.compactHoverBorder,
      [`& .${chatMessageSlotClassNames.timestamp}`]: {
        opacity: 1,
      },
    };

    return {
      border: v.compactBorder,
      padding: v.paddingCompact,
      width: '100%',

      ...((v.hasMention || v.isImportant) && {
        [`& .${chatMessageSlotClassNames.bar}`]: {
          backgroundColor: v.hasMention ? v.hasMentionColor : v.isImportantColor,
          position: 'absolute',
          borderRadius: pxToRem(2),
          height: pxToRem(20),
          left: pxToRem(-56),
          top: v.paddingCompact,
          width: pxToRem(2),
        },
      }),

      ':focus-visible': {
        // Add focus border styles as they would be replaced otherwise
        ...borderFocusStyles[':focus-visible'],
        ...highlight,
      },

      '&:hover': highlight,
    };
  },

  author: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...((p.attached === 'bottom' || p.attached === true) && (screenReaderContainerStyles as ICSSInJSStyle)),
    color: p.mine ? v.authorColorMineCompact : v.contentColor,
    float: 'left',
    fontWeight: v.authorFontWeightCompact,
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
    '& > div': {
      minWidth: 0,
    },
  }),

  reactionGroup: (): ICSSInJSStyle => ({
    display: 'flex',
    marginTop: pxToRem(4),
  }),

  timestamp: ({ variables: v }): ICSSInJSStyle => ({
    alignSelf: 'flex-start',
    flexShrink: 0,
    marginLeft: v.compactSpacing,
    marginTop: pxToRem(2),
    opacity: 0,
  }),
};
