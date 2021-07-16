import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatItemStylesProps } from '../../../../components/Chat/ChatItem';
import { pxToRem } from '../../../../utils';
import { ChatItemVariables } from './chatItemVariables';

export const chatItemStyles: ComponentSlotStylesPrepared<ChatItemStylesProps, ChatItemVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    position: 'relative',
    ...((!p.attached || p.attached === 'top') && {
      paddingTop: p.density === 'compact' ? pxToRem(8) : pxToRem(16),
    }),
    ...((p.attached === 'bottom' || p.attached === true) && {
      paddingTop: p.density === 'compact' ? 0 : pxToRem(2),
    }),
    paddingBottom: 0,
    ...(p.density === 'compact' && {
      marginTop: pxToRem(-2),
      marginBottom: pxToRem(-2),
    }),
  }),

  gutter: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    marginTop: p.density === 'compact' ? v.gutterMarginCompact : v.gutterMargin,
    [p.contentPosition === 'end' ? 'right' : 'left']: p.density === 'compact' ? pxToRem(28) : 0,
    ...((p.attached === 'bottom' || p.attached === true) && {
      display: 'none',
    }),
  }),

  message: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    float: p.contentPosition === 'end' ? 'right' : 'left',
    marginLeft: p.density === 'compact' ? v.messageMarginCompact : v.messageMargin,
    marginRight: p.density === 'compact' ? v.messageMarginEndCompact : v.messageMargin,
    ...(p.density === 'compact' && {
      width: `calc(100% - ${v.messageMarginCompact} - ${v.messageMarginEndCompact})`,
    }),
  }),
};
