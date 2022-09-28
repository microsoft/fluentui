import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatMessageContentStylesProps } from '../../../../components/Chat/ChatMessageContent';
import { ChatMessageVariables } from './chatMessageVariables';
import { pxToRem } from '../../../../utils';

export const chatMessageContentStyles: ComponentSlotStylesPrepared<
  ChatMessageContentStylesProps,
  ChatMessageVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    color: v.contentColor,
    display: 'block',

    ...(p.layout === 'refresh' &&
      p.density === 'comfy' && {
        wordBreak: 'break-word',
        wordWrap: 'break-word',
        '& a': {
          color: 'inherit',
          textDecoration: 'underline',
          wordBreak: 'break-all',
          '&:hover': { textDecorationStyle: 'double' },
          '&:focus': { textDecorationStyle: 'double' },
        },
      }),

    ...(p.density === 'comfy' && {
      ...(p.hasBadge && p.badgePosition === 'end' && { marginRight: pxToRem(4) }),
    }),
  }),
};
