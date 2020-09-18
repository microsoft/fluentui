import { compose } from '@fluentui/react-bindings';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface AttachmentBodyOwnProps {}
export interface AttachmentBodyProps extends AttachmentBodyOwnProps, BoxProps {}

export type AttachmentBodyStylesProps = never;
export const attachmentBodyClassName = 'ui-attachment__body';

/**
 * An AttachmentBody provides a slot for header and description in the Attachment.
 */
export const AttachmentBody = compose<
  'div',
  AttachmentBodyOwnProps,
  AttachmentBodyStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: attachmentBodyClassName,
  displayName: 'AttachmentBody',

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

AttachmentBody.propTypes = commonPropTypes.createCommon();
