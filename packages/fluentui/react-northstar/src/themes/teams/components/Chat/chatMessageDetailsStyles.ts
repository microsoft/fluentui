import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { ChatMessageDetailsStylesProps } from '../../../../components/Chat/ChatMessageDetails';
import type { ChatMessageDetailsVariables } from './chatMessageDetailsVariables';

export const chatMessageDetailsStyles: ComponentSlotStylesPrepared<
  ChatMessageDetailsStylesProps,
  ChatMessageDetailsVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    color: v.detailsColor,
    display: 'inline-block',
    fontSize: v.detailsFontSize,
    ...(p.density === 'comfy' && {
      ...((p.attached === 'top' || !p.attached) && {
        marginLeft: v.detailsMargin,
      }),
    }),
    ...(p.density === 'compact' && {
      alignSelf: 'flex-start',
      flexShrink: 0,
      marginLeft: v.detailsMargin,
    }),
  }),
};
