import { ComponentSlotStyleFunction, ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatMessageContentStylesProps } from '../../../../components/Chat/ChatMessageContent';
import { ChatMessageVariables } from './chatMessageVariables';
import { pxToRem } from '../../../../utils';

const getChatMessageVariantStyles: ComponentSlotStyleFunction<ChatMessageContentStylesProps, ChatMessageVariables> = ({
  props: p,
  variables: v,
  theme,
}) => {
  return {
    ...(p.layout === 'refresh' &&
      p.density === 'comfy' && {
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
      }),

    ...(p.density === 'comfy' && {
      ...(p.hasBadge && p.badgePosition === 'end' && { marginRight: pxToRem(4) }),
    }),
  };
};

export const chatMessageContentStyles: ComponentSlotStylesPrepared<
  ChatMessageContentStylesProps,
  ChatMessageVariables
> = {
  root: (componentStyleFunctionParam): ICSSInJSStyle => {
    const { props: p, variables: v } = componentStyleFunctionParam;
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
      ...getChatMessageVariantStyles(componentStyleFunctionParam),
    };
  },
};
