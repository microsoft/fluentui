import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { ChatDensity } from './chatDensity';

export interface ChatMessageTimestampOwnProps {
  /** Controls messages's relation to other chat messages. Is automatically set by the ChatItem. */
  attached?: boolean | 'top' | 'bottom';
  /** Chat density. Is automatically set by the Chat. */
  density?: ChatDensity;
  /** Whether the message displays reactions in the header */
  hasHeaderReactionGroup?: boolean;
}
export interface ChatMessageTimestampProps extends ChatMessageTimestampOwnProps, BoxProps {}

export type ChatMessageTimestampStylesProps = Required<
  Pick<ChatMessageTimestampOwnProps, 'attached' | 'density' | 'hasHeaderReactionGroup'>
>;
export const chatMessageTimestampClassName = 'ui-chat__messagetimestamp';

/**
 * A ChatMessageTimestamp provides a slot for timestamp in the ChatMessage.
 */
export const ChatMessageTimestamp = compose<
  'span',
  ChatMessageTimestampOwnProps,
  ChatMessageTimestampStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: chatMessageTimestampClassName,
  displayName: 'ChatMessageTimestamp',
  handledProps: ['attached', 'density', 'hasHeaderReactionGroup'],
  mapPropsToStylesProps: ({ attached, density, hasHeaderReactionGroup }) => ({
    attached,
    density,
    hasHeaderReactionGroup,
  }),
  overrideStyles: true,
  shorthandConfig: { mappedProp: 'content' },
});

ChatMessageTimestamp.defaultProps = {
  as: 'span',
};

ChatMessageTimestamp.propTypes = {
  ...commonPropTypes.createCommon(),
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf<'top' | 'bottom'>(['top', 'bottom'])]),
  density: PropTypes.oneOf<ChatDensity>(['comfy', 'compact']),
  hasHeaderReactionGroup: PropTypes.bool,
};
