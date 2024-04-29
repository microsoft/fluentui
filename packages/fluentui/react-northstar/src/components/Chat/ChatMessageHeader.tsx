import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

interface ChatMessageHeaderOwnProps {
  attached?: boolean | 'top' | 'bottom';
  hasReactionGroup?: boolean;
}
export interface ChatMessageHeaderProps extends ChatMessageHeaderOwnProps, BoxProps {}

export type ChatMessageHeaderStylesProps = never;
export const chatMessageHeaderClassName = `ui-chat__messageheader`;

/**
 * A ChatMessageHeader provides a slot for author/date/reactions for the ChatMessage.
 */
export const ChatMessageHeader = compose<
  'div',
  ChatMessageHeaderOwnProps,
  ChatMessageHeaderStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: chatMessageHeaderClassName,
  displayName: 'ChatMessageHeader',
  shorthandConfig: { mappedProp: 'content' },
  overrideStyles: true,
});

ChatMessageHeader.propTypes = commonPropTypes.createCommon();
