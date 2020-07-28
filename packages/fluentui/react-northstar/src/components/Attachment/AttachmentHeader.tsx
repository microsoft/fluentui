import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface AttachmentHeaderOwnProps {}
export interface AttachmentHeaderProps extends AttachmentHeaderOwnProps, BoxProps {}

export type AttachmentHeaderStylesProps = never;
export const attachmentHeaderClassName = 'ui-attachment__header';

/**
 * A AttachmentHeader provides a title for the Attachment.
 */
export const AttachmentHeader = compose<
  'span',
  AttachmentHeaderOwnProps,
  AttachmentHeaderStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: attachmentHeaderClassName,
  displayName: 'AttachmentHeader',

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

AttachmentHeader.defaultProps = {
  as: 'span',
};
AttachmentHeader.propTypes = commonPropTypes.createCommon();
