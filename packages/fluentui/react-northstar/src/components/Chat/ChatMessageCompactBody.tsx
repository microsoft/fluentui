import { compose } from '@fluentui/react-bindings';

import { commonPropTypes } from '../../utils';
import { Flex, FlexProps, FlexStylesProps } from '../Flex/Flex';

export interface ChatMessageCompactBodyOwnProps {}
export interface ChatMessageCompactBodyProps extends ChatMessageCompactBodyOwnProps, FlexProps {}

export type ChatMessageCompactBodyStylesProps = never;
export const chatMessageCompactBodyClassName = 'ui-chat__messagecompactbody';

/**
 * An ChatMessageCompactBody provides a slot for details in the ChatMessage.
 */
export const ChatMessageCompactBody = compose<
  'div',
  ChatMessageCompactBodyOwnProps,
  ChatMessageCompactBodyStylesProps,
  FlexProps,
  FlexStylesProps
>(Flex, {
  className: chatMessageCompactBodyClassName,
  displayName: 'ChatMessageCompactBody',
  overrideStyles: true,
});

ChatMessageCompactBody.propTypes = commonPropTypes.createCommon();
