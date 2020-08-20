import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ChatMessageReadStatusStylesProps } from '../../../../components/Chat/ChatMessageReadStatus';
import { screenReaderContainerStyles } from '../../../../utils';
import { ChatMessageReadStatusVariables } from './chatMessageReadStatusVariables';

export const chatMessageReadStatusStyles: ComponentSlotStylesPrepared<
  ChatMessageReadStatusStylesProps,
  ChatMessageReadStatusVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    right: v.readStatusIndicatorRightPoistion,
    bottom: v.readStatusIndicatorBottomPoistion,
    ':after': {
      content: `"${p.title}"`,
      ...(screenReaderContainerStyles as ICSSInJSStyle),
    },
  }),
};
