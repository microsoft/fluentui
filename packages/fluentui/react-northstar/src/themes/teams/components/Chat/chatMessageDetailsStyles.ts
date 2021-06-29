import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatMessageDetailsStylesProps } from '../../../../components/Chat/ChatMessageDetails';
import { ChatMessageDetailsVariables } from './chatMessageDetailsVariables';

export const chatMessageDetailsStyles: ComponentSlotStylesPrepared<
  ChatMessageDetailsStylesProps,
  ChatMessageDetailsVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
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
      ...((p.attached === 'top' || !p.attached) && {
        marginLeft: v.detailsMargin,
      }),
    }),
    ...(p.density === 'compact' && {
      color: v.detailsColorCompact,
      alignSelf: 'flex-start',
      flexShrink: 0,
      marginLeft: v.detailsMargin,
    }),
  }),
};
