import { compose } from '@fluentui/react-bindings';
import * as React from 'react';

import { WithAsProp } from '../../types';
import { createShorthandFactory, ShorthandFactory } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface AttachmentDescriptionOwnProps {}
export interface AttachmentDescriptionProps extends AttachmentDescriptionOwnProps, WithAsProp<BoxProps> {}

export type AttachmentDescriptionStylesProps = never;

/**
 * A AttachmentDescription provides more detailed information about the Attachment.
 */
const AttachmentDescription = compose<
  AttachmentDescriptionOwnProps,
  AttachmentDescriptionStylesProps,
  WithAsProp<BoxProps>,
  BoxStylesProps
>(Box, {
  className: 'ui-attachment__description',
  displayName: 'AttachmentDescription',

  overrideStyles: true,
}) as React.FC<AttachmentDescriptionProps> & {
  create?: ShorthandFactory<AttachmentDescriptionProps>;
  className: string;
};

AttachmentDescription.create = createShorthandFactory({ Component: AttachmentDescription, mappedProp: 'content' });
AttachmentDescription.defaultProps = {
  as: 'span',
};

export default AttachmentDescription;
