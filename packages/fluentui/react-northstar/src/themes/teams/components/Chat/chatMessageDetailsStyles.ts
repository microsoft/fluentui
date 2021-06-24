import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatMessageDetailsStylesProps } from '../../../../components/Chat/ChatMessageDetails';
import { ChatMessageDetailsVariables } from './chatMessageDetailsVariables';

export const chatMessageDetailsStyles: ComponentSlotStylesPrepared<
  ChatMessageDetailsStylesProps,
  ChatMessageDetailsVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    marginLeft: v.detailsMargin,
    fontSize: v.detailsFontSize,
    display: 'inline-block',
    ...(p.density === 'comfy' && {
      color: v.detailsColor,
      ':hover': {
        color: v.detailsHoverColor,
      },
      ...(p.mine && {
        color: v.detailsColorMine,
        ':hover': {
          color: v.detailsHoverColorMine,
        },
      }),
    }),
    ...(p.density === 'compact' && {
      color: v.detailsColorCompact,
      alignSelf: 'flex-start',
      flexShrink: 0,
    }),
  }),
};
