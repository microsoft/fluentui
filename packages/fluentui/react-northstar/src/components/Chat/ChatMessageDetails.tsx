import { compose } from '@fluentui/react-bindings';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface ChatMessageDetailsOwnProps {
  mine?: boolean;
}
export interface ChatMessageDetailsProps extends ChatMessageDetailsOwnProps, BoxProps {}

export type ChatMessageDetailsStylesProps = Required<Pick<ChatMessageDetailsOwnProps, 'mine'>>;
export const chatMessageDetailsClassName = 'ui-chat__messagedetails';

/**
 * An ChatMessageDetails provides a slot for details in the ChatMessage.
 */
export const ChatMessageDetails = compose<
  'div',
  ChatMessageDetailsOwnProps,
  ChatMessageDetailsStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: chatMessageDetailsClassName,
  displayName: 'ChatMessageDetails',
  overrideStyles: true,
  handledProps: ['mine'],
  shorthandConfig: {
    mappedProp: 'content',
  },
  mapPropsToStylesProps: ({ mine }) => ({
    mine,
  }),
});

ChatMessageDetails.propTypes = commonPropTypes.createCommon();
