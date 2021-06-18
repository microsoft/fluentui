import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { ChatLayout } from './chatLayoutContext';

export interface ChatMessageDetailsOwnProps {
  /** Chat density layout. */
  layout?: ChatLayout;
  mine?: boolean;
}
export interface ChatMessageDetailsProps extends ChatMessageDetailsOwnProps, BoxProps {}

export type ChatMessageDetailsStylesProps = Required<Pick<ChatMessageDetailsOwnProps, 'layout' | 'mine'>>;
export const chatMessageDetailsClassName = 'ui-chat__messagedetails';

/**
 * A ChatMessageDetails provides a slot for details in the ChatMessage.
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
  handledProps: ['layout', 'mine'],
  mapPropsToStylesProps: ({ layout, mine }) => ({ layout, mine }),
  overrideStyles: true,
  shorthandConfig: { mappedProp: 'content' },
});

ChatMessageDetails.propTypes = {
  ...commonPropTypes.createCommon(),
  layout: PropTypes.oneOf<ChatLayout>(['comfy', 'compact']),
  mine: PropTypes.bool,
};
