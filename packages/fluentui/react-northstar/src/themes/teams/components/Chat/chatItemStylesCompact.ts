import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatItemStylesProps } from '../../../../components/Chat/ChatItem';
import { pxToRem } from '../../../../utils';
import { ChatItemVariables } from './chatItemVariables';

/** ChatItem styles specific for the compact density. */
export const chatItemStylesCompact: ComponentSlotStylesPrepared<ChatItemStylesProps, ChatItemVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...((!p.attached || p.attached === 'top') && {
      paddingTop: pxToRem(8),
    }),
    marginTop: pxToRem(-2),
    marginBottom: pxToRem(-2),
  }),

  gutter: ({ variables: v }): ICSSInJSStyle => ({
    marginTop: v.gutterMarginCompact,
    left: pxToRem(28),
  }),

  message: ({ variables: v }): ICSSInJSStyle => ({
    marginLeft: v.messageMarginCompact,
    marginRight: v.messageMarginEndCompact,
    width: `calc(100% - ${v.messageMarginCompact} - ${v.messageMarginEndCompact})`,
  }),
};
