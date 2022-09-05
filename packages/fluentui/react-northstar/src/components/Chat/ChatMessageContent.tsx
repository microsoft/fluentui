import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { ChatDensity } from './chatDensity';
import { ChatMessageLayout } from './ChatMessage';

export interface ChatMessageContentOwnProps {
  /** Chat density. */
  density?: ChatDensity;
  /** Indicates whether message belongs to the current user. */
  mine?: boolean;
  /** A message can render with different layouts. */
  unstable_layout?: ChatMessageLayout;
}
export interface ChatMessageContentProps extends ChatMessageContentOwnProps, BoxProps {}

export type ChatMessageContentStylesProps = Required<Pick<ChatMessageContentOwnProps, 'density' | 'mine'>> & {
  layout: ChatMessageLayout;
};
export const chatMessageContentClassName = 'ui-chat__messagecontent';

/**
 * A ChatMessageContent provides a slot for content in the ChatMessage.
 */
export const ChatMessageContent = compose<
  'div',
  ChatMessageContentOwnProps,
  ChatMessageContentStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: chatMessageContentClassName,
  displayName: 'ChatMessageContent',
  handledProps: ['density', 'mine', 'unstable_layout'],
  mapPropsToStylesProps: ({ density, mine, unstable_layout }) => ({
    density,
    mine,
    layout: unstable_layout,
  }),
  overrideStyles: true,
  shorthandConfig: { mappedProp: 'content' },
});

ChatMessageContent.propTypes = {
  ...commonPropTypes.createCommon(),
  density: PropTypes.oneOf<ChatDensity>(['comfy', 'compact']),
  mine: PropTypes.bool,
  unstable_layout: PropTypes.oneOf(['default', 'refresh']),
};
