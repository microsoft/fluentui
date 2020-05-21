import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface ChatMessageHeaderOwnProps {}
export interface ChatMessageHeaderProps extends ChatMessageHeaderOwnProps, BoxProps {}

export type ChatMessageHeaderStylesProps = never;
export const ChatMessageHeaderClassName = `ui-chat__message__header`;

/**
 * A ChatMessageHeader provides a title for the Attachment.
 */
const ChatMessageHeader = compose<
  'span',
  ChatMessageHeaderOwnProps,
  ChatMessageHeaderStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: ChatMessageHeaderClassName,
  displayName: 'ChatMessageHeader',

  overrideStyles: true,
}) as ComponentWithAs<'span', ChatMessageHeaderProps> & {
  shorthandConfig: ShorthandConfig<ChatMessageHeaderProps>;
};

ChatMessageHeader.defaultProps = {};
ChatMessageHeader.propTypes = commonPropTypes.createCommon();
ChatMessageHeader.shorthandConfig = {};

export default ChatMessageHeader;
