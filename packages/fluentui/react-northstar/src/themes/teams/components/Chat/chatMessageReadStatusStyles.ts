import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatMessageReadStatusStylesProps } from '../../../../components/Chat/ChatMessageReadStatus';
import { screenReaderContainerStyles } from '../../../../utils';
import { ChatMessageReadStatusVariables } from './chatMessageReadStatusVariables';

export const chatMessageReadStatusStyles: ComponentSlotStylesPrepared<
  ChatMessageReadStatusStylesProps,
  ChatMessageReadStatusVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    right: p.layout === 'compact' ? v.rightPositionCompact : v.rightPoistion,
    bottom: p.layout === 'compact' ? v.bottomPositionCompact : v.bottomPoistion,
    ':after': {
      content: `"${p.title}"`,
      ...(screenReaderContainerStyles as ICSSInJSStyle),
    },
  }),
};
