import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ChatItemVariables } from './chatItemVariables';
import { ChatItemStylesProps } from '../../../../components/Chat/ChatItem';
import { pxToRem } from '../../../../utils';

export const chatItemStyles: ComponentSlotStylesPrepared<ChatItemStylesProps, ChatItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    ...((!p.attached || p.attached === 'top') && {
      paddingTop: p.compact ? pxToRem(8) : pxToRem(16),
    }),
    ...((p.attached === 'bottom' || p.attached === true) && {
      paddingTop: p.compact ? 0 : pxToRem(2),
    }),
    paddingBottom: 0,

    ...(p.compact && {
      marginTop: pxToRem(-2),
      marginBottom: pxToRem(-2),
    }),
  }),

  gutter: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    marginTop: p.compact ? v.gutterMarginCompact : v.gutterMargin,
    [p.contentPosition === 'end' ? 'right' : 'left']: p.compact ? pxToRem(28) : 0,
    ...((p.attached === 'bottom' || p.attached === true) && {
      display: 'none',
    }),
  }),

  message: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    float: p.contentPosition === 'end' ? 'right' : 'left',
    marginLeft: p.compact ? v.messageMarginCompact : v.messageMargin,
    marginRight: p.compact ? v.messageMarginEndCompact : v.messageMargin,
    ...(p.compact && {
      width: `calc(100% - ${v.messageMarginCompact} - ${v.messageMarginEndCompact})`,
    }),
  }),
};
