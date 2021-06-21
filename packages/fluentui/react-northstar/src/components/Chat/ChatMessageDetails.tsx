import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { ChatDensity } from './chatDensityContext';

export interface ChatMessageDetailsOwnProps {
  /** Chat density. */
  density?: ChatDensity;
  mine?: boolean;
}
export interface ChatMessageDetailsProps extends ChatMessageDetailsOwnProps, BoxProps {}

export type ChatMessageDetailsStylesProps = Required<Pick<ChatMessageDetailsOwnProps, 'density' | 'mine'>>;
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
  handledProps: ['density', 'mine'],
  mapPropsToStylesProps: ({ density, mine }) => ({ density, mine }),
  overrideStyles: true,
  shorthandConfig: { mappedProp: 'content' },
});

ChatMessageDetails.propTypes = {
  ...commonPropTypes.createCommon(),
  density: PropTypes.oneOf<ChatDensity>(['comfy', 'compact']),
  mine: PropTypes.bool,
};
