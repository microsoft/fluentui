import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { ChatDensity } from './chatDensity';
import { ChatMessageLayout, ChatMessageProps } from './ChatMessage';

export interface ChatMessageContentOwnProps
  extends Pick<ChatMessageProps, 'badgePosition' | 'density' | 'failed' | 'mine' | 'unstable_layout'> {
  /** Indicates whether parent ChatMessage has badge. */
  hasBadge?: boolean;
}
export interface ChatMessageContentProps extends ChatMessageContentOwnProps, BoxProps {}

export type ChatMessageContentStylesProps = Required<
  Pick<ChatMessageContentOwnProps, 'badgePosition' | 'density' | 'failed' | 'hasBadge' | 'mine'>
> & {
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
  handledProps: ['badgePosition', 'density', 'failed', 'hasBadge', 'mine', 'unstable_layout'],
  mapPropsToStylesProps: ({ badgePosition, density, failed, hasBadge, mine, unstable_layout }) => ({
    badgePosition,
    density,
    failed,
    hasBadge,
    layout: unstable_layout,
    mine,
  }),
  overrideStyles: true,
  shorthandConfig: { mappedProp: 'content' },
});

ChatMessageContent.propTypes = {
  ...commonPropTypes.createCommon(),
  badgePosition: PropTypes.oneOf(['start', 'end']),
  density: PropTypes.oneOf<ChatDensity>(['comfy', 'compact']),
  failed: PropTypes.bool,
  hasBadge: PropTypes.bool,
  mine: PropTypes.bool,
  unstable_layout: PropTypes.oneOf(['default', 'refresh']),
};
