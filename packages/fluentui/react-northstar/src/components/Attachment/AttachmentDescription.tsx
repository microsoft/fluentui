import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface AttachmentDescriptionOwnProps {}
export interface AttachmentDescriptionProps extends AttachmentDescriptionOwnProps, BoxProps {}

export type AttachmentDescriptionStylesProps = never;
export const attachmentDescriptionClassName = 'ui-attachment__description';

/**
 * A AttachmentDescription provides more detailed information about the Attachment.
 */
export const AttachmentDescription = compose<
  'span',
  AttachmentDescriptionOwnProps,
  AttachmentDescriptionStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: attachmentDescriptionClassName,
  displayName: 'AttachmentDescription',

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

AttachmentDescription.defaultProps = {
  as: 'span',
};
AttachmentDescription.propTypes = commonPropTypes.createCommon();
