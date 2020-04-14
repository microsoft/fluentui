import { compose } from '@fluentui/react-bindings';
import * as React from 'react';

import { WithAsProp } from '../../types';
import { createShorthandFactory, ShorthandFactory } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

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
}) as React.FC<AttachmentHeaderProps> & { create?: ShorthandFactory<AttachmentHeaderProps>; className: string };

AttachmentHeader.create = createShorthandFactory({ Component: AttachmentHeader, mappedProp: 'content' });
AttachmentHeader.defaultProps = {
  as: 'span',
};

export default AttachmentHeader;
