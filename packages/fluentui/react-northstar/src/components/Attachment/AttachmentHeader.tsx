import { compose } from '@fluentui/react-bindings';
import * as React from 'react';

import Box, { BoxProps, BoxStylesProps } from '../Box/Box';
import { WithAsProp } from '../../types';
import { createShorthandFactory, ShorthandFactory } from '../../utils';

interface AttachmentHeaderOwnProps {}
export interface AttachmentHeaderProps extends AttachmentHeaderOwnProps, WithAsProp<BoxProps> {}

export type AttachmentHeaderStylesProps = never;

/**
 * A AttachmentHeader provides a title for the Attachment.
 */
const AttachmentHeader = compose<
  AttachmentHeaderOwnProps,
  AttachmentHeaderStylesProps,
  WithAsProp<BoxProps>,
  BoxStylesProps
>(Box, {
  className: 'ui-attachment__header',
  displayName: 'AttachmentHeader',

  overrideStyles: true,
}) as React.FC<AttachmentHeaderProps> & { create?: ShorthandFactory<AttachmentHeaderProps> };

AttachmentHeader.create = createShorthandFactory({ Component: AttachmentHeader });
AttachmentHeader.defaultProps = {
  as: 'span',
};

export default AttachmentHeader;
