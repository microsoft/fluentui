import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { ChatDensity } from './chatDensity';

export interface ChatMessageDetailsOwnProps {
  /** Controls messages's relation to other chat messages. */
  attached?: boolean | 'top' | 'bottom';
  /** Chat density. */
  density?: ChatDensity;
  /** Whether the message displays reactions in the header */
  hasHeaderReactionGroup?: boolean;
  mine?: boolean;
}
export interface ChatMessageDetailsProps extends ChatMessageDetailsOwnProps, BoxProps {}

export type ChatMessageDetailsStylesProps = Required<
  Pick<ChatMessageDetailsOwnProps, 'attached' | 'density' | 'hasHeaderReactionGroup' | 'mine'>
>;
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
  handledProps: ['attached', 'density', 'hasHeaderReactionGroup', 'mine'],
  mapPropsToStylesProps: ({ attached, density, hasHeaderReactionGroup, mine }) => ({
    attached,
    density,
    hasHeaderReactionGroup,
    mine,
  }),
  overrideStyles: true,
  shorthandConfig: { mappedProp: 'content' },
});

ChatMessageDetails.propTypes = {
  ...commonPropTypes.createCommon(),
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf<'top' | 'bottom'>(['top', 'bottom'])]),
  density: PropTypes.oneOf<ChatDensity>(['comfy', 'compact']),
  hasHeaderReactionGroup: PropTypes.bool,
  mine: PropTypes.bool,
};
