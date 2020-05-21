import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';
import { chatMessageClassName } from './ChatMessage';

interface ChatMessageHeaderOwnProps {}
export interface ChatMessageHeaderProps extends ChatMessageHeaderOwnProps, BoxProps {}

export type ChatMessageHeaderStylesProps = never;
export const ChatMessageHeaderClassName = `${chatMessageClassName}__header`;

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

ChatMessageHeader.defaultProps = {
  as: 'span',
};
ChatMessageHeader.propTypes = commonPropTypes.createCommon();
ChatMessageHeader.shorthandConfig = {
  mappedProp: 'content',
};

export default ChatMessageHeader;
