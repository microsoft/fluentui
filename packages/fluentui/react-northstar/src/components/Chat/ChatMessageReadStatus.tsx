import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

interface ChatMessageReadStatusOwnProps {
  /** Compact chat density. */
  compact?: boolean;
  title?: string;
}
export interface ChatMessageReadStatusProps extends ChatMessageReadStatusOwnProps, BoxProps {}

export type ChatMessageReadStatusStylesProps = Pick<ChatMessageReadStatusProps, 'compact' | 'title'>;
export const chatMessageReadStatusClassName = `ui-chat__messagereadstatus`;

/**
 * A ChatMessageReadStatus places a indicator to represent the read status of the message
 */
export const ChatMessageReadStatus = compose<
  'div',
  ChatMessageReadStatusOwnProps,
  ChatMessageReadStatusStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: chatMessageReadStatusClassName,
  displayName: 'ChatMessageReadStatus',
  shorthandConfig: { mappedProp: 'content' },
  mapPropsToStylesProps: ({ compact, title }) => ({ compact, title }),
  handledProps: ['compact'],
  overrideStyles: true,
});

ChatMessageReadStatus.propTypes = commonPropTypes.createCommon();
