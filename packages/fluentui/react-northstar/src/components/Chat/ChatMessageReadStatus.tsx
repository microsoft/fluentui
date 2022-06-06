import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { ChatDensity } from './chatDensity';

interface ChatMessageReadStatusOwnProps {
  /** Chat density. */
  density?: ChatDensity;
  title?: string;
}
export interface ChatMessageReadStatusProps extends ChatMessageReadStatusOwnProps, BoxProps {}

export type ChatMessageReadStatusStylesProps = Pick<ChatMessageReadStatusProps, 'density' | 'title'>;
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
  handledProps: ['density'],
  mapPropsToStylesProps: ({ density, title }) => ({ density, title }),
  overrideStyles: true,
  shorthandConfig: { mappedProp: 'content' },
});

ChatMessageReadStatus.propTypes = {
  ...commonPropTypes.createCommon(),
  density: PropTypes.oneOf<ChatDensity>(['comfy', 'compact']),
};
