import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { chatLayout } from './chatLayoutContext';

interface ChatMessageReadStatusOwnProps {
  /** Chat density layout. */
  layout?: chatLayout;
  title?: string;
}
export interface ChatMessageReadStatusProps extends ChatMessageReadStatusOwnProps, BoxProps {}

export type ChatMessageReadStatusStylesProps = Pick<ChatMessageReadStatusProps, 'layout' | 'title'>;
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
  handledProps: ['layout'],
  mapPropsToStylesProps: ({ layout, title }) => ({ layout, title }),
  overrideStyles: true,
  shorthandConfig: { mappedProp: 'content' },
});

ChatMessageReadStatus.propTypes = {
  ...commonPropTypes.createCommon(),
  layout: PropTypes.oneOf<chatLayout>(['comfy', 'compact']),
  title: PropTypes.string,
};
