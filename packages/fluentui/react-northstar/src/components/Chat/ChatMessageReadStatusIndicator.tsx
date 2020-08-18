import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

interface ChatMessageReadStatusIndicatorOwnProps {
  title?: string;
}
export interface ChatMessageReadStatusIndicatorProps extends ChatMessageReadStatusIndicatorOwnProps, BoxProps {}

export type ChatMessageReadStatusIndicatorStylesProps = { title?: string };
export const chatMessageReadStatusIndicatorClassName = `ui-chat__messagereadstatusindicator`;

/**
 * A ChatMessageReadStatusIndicator places a indicator to represent the read status of the message
 */
export const ChatMessageReadStatusIndicator = compose<
  'div',
  ChatMessageReadStatusIndicatorOwnProps,
  ChatMessageReadStatusIndicatorStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: chatMessageReadStatusIndicatorClassName,
  displayName: 'ChatMessageReadStatusIndicator',
  shorthandConfig: { mappedProp: 'content' },
  mapPropsToStylesProps: ({ title }) => ({
    title,
  }),
  overrideStyles: true,
});

ChatMessageReadStatusIndicator.propTypes = commonPropTypes.createCommon();
