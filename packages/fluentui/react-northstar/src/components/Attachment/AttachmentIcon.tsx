import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface AttachmentIconOwnProps {}
export interface AttachmentIconProps extends AttachmentIconOwnProps, BoxProps {}

export type AttachmentIconStylesProps = never;
export const attachmentIconClassName = 'ui-attachment__icon';

/**
 * An AttachmentIcon provides a slot for a glyph that describes content in the Attachment.
 */
export const AttachmentIcon = compose<
  'span',
  AttachmentIconOwnProps,
  AttachmentIconStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: attachmentIconClassName,
  displayName: 'AttachmentIcon',

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

AttachmentIcon.defaultProps = {
  as: 'span',
};
AttachmentIcon.propTypes = commonPropTypes.createCommon();
