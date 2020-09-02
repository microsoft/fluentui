import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ChatMessageDetailsVariables } from './chatMessageDetailsVariables';
import { ChatMessageDetailsStylesProps } from '../../../../components/Chat/ChatMessageDetails';

export const chatMessageDetailsStyles: ComponentSlotStylesPrepared<
  ChatMessageDetailsStylesProps,
  ChatMessageDetailsVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    marginLeft: v.detailsMargin,
    fontSize: v.detailsFontSize,
    display: 'inline-block',
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
};
