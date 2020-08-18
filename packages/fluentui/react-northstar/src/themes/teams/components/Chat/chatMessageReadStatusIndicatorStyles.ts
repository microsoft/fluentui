import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ChatMessageReadStatusIndicatorStylesProps } from '../../../../components/Chat/ChatMessageReadStatusIndicator';
import { screenReaderContainerStyles } from '../../../../utils';
import { ChatMessageReadStatusIndicatorVariables } from './ChatMessageReadStatusIndicatorVariables';

export const ChatMessageReadStatusIndicatorStyles: ComponentSlotStylesPrepared<
  ChatMessageReadStatusIndicatorStylesProps,
  ChatMessageReadStatusIndicatorVariables
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
