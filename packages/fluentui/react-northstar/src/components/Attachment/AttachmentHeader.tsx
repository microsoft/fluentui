import { compose } from '@fluentui/react-bindings';
import * as React from 'react';

import { WithAsProp } from '../../types';
import { commonPropTypes, createShorthandFactory, ShorthandFactory } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface AttachmentHeaderOwnProps {}
export interface AttachmentHeaderProps extends AttachmentHeaderOwnProps, WithAsProp<BoxProps> {}

export type AttachmentHeaderStylesProps = never;
export const attachmentHeaderClassName = 'ui-attachment__header';

/**
 * A AttachmentHeader provides a title for the Attachment.
 */
const AttachmentHeader = compose<
  AttachmentHeaderOwnProps,
  AttachmentHeaderStylesProps,
  WithAsProp<BoxProps>,
  BoxStylesProps
>(Box, {
  className: attachmentHeaderClassName,
  displayName: 'AttachmentHeader',

  overrideStyles: true,
}) as React.FC<AttachmentHeaderProps> & {
  create?: ShorthandFactory<AttachmentHeaderProps>;
};

AttachmentHeader.defaultProps = {
  as: 'span',
};
AttachmentHeader.propTypes = commonPropTypes.createCommon();

AttachmentHeader.create = createShorthandFactory({ Component: AttachmentHeader, mappedProp: 'content' });

export default AttachmentHeader;
