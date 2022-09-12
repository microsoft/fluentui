import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { defaultChatDensity } from '../../../../components/Chat/chatDensity';

import { ChatMessageContentStylesProps } from '../../../../components/Chat/ChatMessageContent';
import { ChatMessageVariables } from './chatMessageVariables';
import { pxToRem } from '../../../../utils';

const getChatMessageVariantStyles = (props: ChatMessageContentStylesProps) => {
  const density = props.density || defaultChatDensity;
  switch (true) {
    case props.layout === 'refresh' && density === 'comfy':
      return ({ props: p, variables: v, theme }): ICSSInJSStyle => ({
        color: v.contentColor,
        wordBreak: 'break-word',
        wordWrap: 'break-word',
        '& a': {
          color: 'inherit',
          textDecoration: 'underline',
          wordBreak: 'break-all',
          '&:hover': { textDecorationStyle: 'double' },
          '&:focus': { textDecorationStyle: 'double' },
        },
        ...(p.failed && {
          color: theme.siteVariables.colorScheme.default.foreground,
        }),
      });
    case density === 'comfy':
      return ({ props: p }): ICSSInJSStyle => ({
        ...(p.hasBadge && p.badgePosition === 'end' && { marginRight: pxToRem(4) }),
      });

    default:
      return () => ({});
  }
};

export const chatMessageContentStyles: ComponentSlotStylesPrepared<
  ChatMessageContentStylesProps,
  ChatMessageVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      color: v.contentColor,
      display: 'block',
      '& a': {
        outline: 'none',
        color: p.mine ? v.linkColorMine : v.linkColor,
        ':focus': {
          textDecoration: 'underline',
        },
      },
      ...getChatMessageVariantStyles(p)(componentStyleFunctionParam),
    };
  },
};
