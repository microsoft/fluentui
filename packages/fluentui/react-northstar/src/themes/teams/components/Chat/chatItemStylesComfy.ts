import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatItemStylesProps } from '../../../../components/Chat/ChatItem';
import { pxToRem } from '../../../../utils';
import { ChatItemVariables } from './chatItemVariables';

/** ChatItem styles specific for the default/comfy density. */
export const chatItemStylesComfy: ComponentSlotStylesPrepared<ChatItemStylesProps, ChatItemVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...((!p.attached || p.attached === 'top') && {
      paddingTop: pxToRem(16),
    }),
    ...((p.attached === 'bottom' || p.attached === true) && {
      paddingTop: pxToRem(2),
    }),
  }),

  gutter: ({ props: p, variables: v }): ICSSInJSStyle => ({
    marginTop: p.layout === 'refresh' ? v.gutterMarginComfyRefresh : v.gutterMargin,
    [p.contentPosition === 'end' ? 'right' : 'left']: 0,
  }),

  message: ({ variables: v }): ICSSInJSStyle => ({
    marginLeft: v.messageMargin,
    marginRight: v.messageMargin,
  }),
};
