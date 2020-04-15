import { compose } from '@fluentui/react-bindings';
import * as React from 'react';

import { WithAsProp } from '../../types';
import { commonPropTypes, createShorthandFactory, ShorthandFactory } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface AttachmentBodyOwnProps {}
export interface AttachmentBodyProps extends AttachmentBodyOwnProps, WithAsProp<BoxProps> {}

export type AttachmentBodyStylesProps = never;

/**
 * An AttachmentBody provides a slot for header and description in the Attachment.
 */
const AttachmentBody = compose<AttachmentBodyOwnProps, AttachmentBodyStylesProps, WithAsProp<BoxProps>, BoxStylesProps>(
  Box,
  {
    className: 'ui-attachment__body',
    displayName: 'AttachmentBody',
  },
) as React.FC<AttachmentBodyProps> & { create?: ShorthandFactory<AttachmentBodyProps>; deprecated_className: string };

AttachmentBody.propTypes = commonPropTypes.createCommon();

AttachmentBody.create = createShorthandFactory({ Component: AttachmentBody, mappedProp: 'content' });

export default AttachmentBody;
