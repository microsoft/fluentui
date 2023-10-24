import { isNil } from 'lodash';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { chatMessageSlotClassNames, ChatMessageStylesProps } from '../../../../components/Chat/ChatMessage';
import { pxToRem } from '../../../../utils';
import { screenReaderContainerStyles } from '../../../../utils/accessibility/Styles/accessibilityStyles';
import { ChatMessageVariables } from './chatMessageVariables';

const displayActionMenu = (overlayZIndex: ICSSInJSStyle['zIndex']): ICSSInJSStyle => ({
  zIndex: overlayZIndex!,
  overflow: 'visible',
  opacity: 1,
  width: 'auto',
});

export const chatMessageStylesComfyRefresh: ComponentSlotStylesPrepared<ChatMessageStylesProps, ChatMessageVariables> =
  {
    root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
      const borderFocusStyles = getBorderFocusStyles({
        borderRadius: 'inherit',
        variables: theme.siteVariables,
        // Fixes the bubble focus border rendering on top of the user avatar
        zIndex: 'initial',
      });

      return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: p.mine ? 'flex-end' : 'flex-start',
        outline: 'none',

        [`&:focus-visible .${chatMessageSlotClassNames.timestamp}`]: {
          opacity: 1,
        },

        [`&:focus-visible .${chatMessageSlotClassNames.bubble}`]: borderFocusStyles[':focus-visible'],
      };
    },

    header: ({ props: p, theme }): ICSSInJSStyle => ({
      display: 'flex',
      width: '100%',
      justifyContent: p.mine ? 'flex-end' : 'start',
      gap: pxToRem(8),
      '& > div': {
        paddingTop: pxToRem(8),
      },
      color: theme.siteVariables.colorScheme.default.foreground2,
    }),

    author: ({ props: p }): ICSSInJSStyle => ({
      ...((p.mine || p.attached === 'bottom' || p.attached === true) && (screenReaderContainerStyles as ICSSInJSStyle)),
      fontWeight: 400,
      marginBottom: pxToRem(2),
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }),

    timestamp: ({ variables: v }): ICSSInJSStyle => ({
      display: 'inline-block',
      alignSelf: 'self-start',
      whiteSpace: 'nowrap',
      opacity: 0,
      ...(v.hasReducedHorizontalSpace && {
        fontSize: '1rem',
        margin: `${pxToRem(3)} ${pxToRem(2.5)} 0`,
      }),
    }),

    body: ({ props: p, variables: v }): ICSSInJSStyle => ({
      display: 'flex',
      flexDirection: p.mine ? 'row-reverse' : 'row',
      position: 'relative',
      maxWidth: '100%',

      ...(!p.mine &&
        v.hasReducedHorizontalSpace && {
          marginRight: pxToRem(16),
        }),
    }),

    bubble: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
      return {
        position: 'relative',
        border: v.border,
        borderRadius: pxToRem(6),
        paddingLeft: pxToRem(16),
        paddingRight: pxToRem(16),
        paddingTop: pxToRem(8),
        paddingBottom: p.hasReactions ? pxToRem(10) : pxToRem(8),
        backgroundColor: p.mine ? v.backgroundColorMine : v.backgroundColor,
        backgroundAttachment: 'fixed',

        ...(p.failed && {
          backgroundImage: 'none',
          backgroundColor: theme.siteVariables.colorScheme.red.background1,
          border: `1px solid ${theme.siteVariables.colorScheme.red.border}`,
        }),

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

        ...(isNil(v.showActionMenu) &&
          p.hasActionMenu && {
            ':hover': {
              [`& > .${chatMessageSlotClassNames.actionMenu}`]: displayActionMenu(v.overlayZIndex),
            },
            ...(p.showActionMenu && {
              [`& .${chatMessageSlotClassNames.actionMenu}`]: displayActionMenu(v.overlayZIndex),
            }),
          }),

        [`&:hover + .${chatMessageSlotClassNames.bubbleInset} .${chatMessageSlotClassNames.timestamp}`]: {
          opacity: 1,
        },

        ...(p.attached === true &&
          !v.isImportant && {
            [p.mine ? 'borderTopRightRadius' : 'borderTopLeftRadius']: 0,
            [p.mine ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 0,
          }),
        ...(p.attached === 'top' &&
          !v.isImportant && {
            [p.mine ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 0,
          }),
        ...(p.attached === 'bottom' &&
          !v.isImportant && {
            [p.mine ? 'borderTopRightRadius' : 'borderTopLeftRadius']: 0,
          }),
      };
    },

    bubbleInset: ({ props: p, variables: v }): ICSSInJSStyle => ({
      display: 'flex',
      paddingTop: pxToRem(10),
      paddingBottom: 0,
      // use padding instead of margin so that the bubble container's :hover
      // styles still apply when mousing over the gap between the container
      // and bubble-inset.
      paddingLeft: v.hasReducedHorizontalSpace ? pxToRem(2.5) : pxToRem(5),
      paddingRight: v.hasReducedHorizontalSpace ? pxToRem(2.5) : pxToRem(5),
      ...(p.mine ? { right: '100%', flexDirection: 'row-reverse' } : { left: '100%' }),

      [`&:hover .${chatMessageSlotClassNames.timestamp}`]: {
        opacity: 1,
      },
    }),

    badge: ({ props: p, variables: v }): ICSSInJSStyle => ({
      position: 'relative',
      top: pxToRem(-5),
      width: pxToRem(25),
      height: pxToRem(25),
      backgroundColor: 'none',
      color: v.isImportantColor,
      zIndex: v.zIndex,
      '& > :first-child': {
        display: 'inline-flex',
        margin: '0 auto',
      },
      ...(p.mine ? { marginRight: pxToRem(-5) } : { marginLeft: pxToRem(-5) }),
    }),

    reactionGroup: ({ props: p }): ICSSInJSStyle => ({
      position: 'relative',
      display: 'flex',
      float: 'left',
      zIndex: 1,
      ...(p.mine && {
        float: 'right',
        marginRight: pxToRem(-4),
      }),
    }),
  };
