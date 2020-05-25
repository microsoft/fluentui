import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface ChatMessageHeaderOwnProps {
  attached?: boolean | 'top' | 'bottom';
  hasReactionGroup?: boolean;
}
export interface ChatMessageHeaderProps extends ChatMessageHeaderOwnProps, BoxProps {}

export type ChatMessageHeaderStylesProps = Pick<ChatMessageHeaderOwnProps, 'hasReactionGroup' | 'attached'>;
export const ChatMessageHeaderClassName = `ui-chat__message__header`;

/**
 * A ChatMessageHeader provides a slot for author/date/reactions for the ChatMessage.
 */
const ChatMessageHeader = compose<
  'div',
  ChatMessageHeaderOwnProps,
  ChatMessageHeaderStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: ChatMessageHeaderClassName,
  displayName: 'ChatMessageHeader',
  shorthandConfig: { mappedProp: 'content' },
  handledProps: ['attached', 'hasReactionGroup'],
  mapPropsToStylesProps: ({ hasReactionGroup, attached }) => ({
    hasReactionGroup,
    attached,
  }),
  overrideStyles: true,
});

ChatMessageHeader.propTypes = {
  ...commonPropTypes.createCommon(),
  hasReactionGroup: PropTypes.bool,
  attached: PropTypes.oneOf([true, false, 'bottom', 'top']),
};

export default ChatMessageHeader;
