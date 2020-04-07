import { compose } from '@fluentui/react-bindings';
import * as React from 'react';

import Box, { BoxProps, BoxStylesProps } from '../Box/Box';
import { WithAsProp } from '../../types';
import { commonPropTypes, createShorthandFactory, ShorthandFactory } from '../../utils';

interface AttachmentIconOwnProps {}
export interface AttachmentIconProps extends AttachmentIconOwnProps, WithAsProp<BoxProps> {}

export type AttachmentIconStylesProps = never;

/**
 * An AttachmentIcon provides a slot for a glyph that describes content in the Attachment.
 */
const AttachmentIcon = compose<AttachmentIconOwnProps, AttachmentIconStylesProps, WithAsProp<BoxProps>, BoxStylesProps>(
  Box,
  {
    className: 'ui-attachment__icon',
    displayName: 'AttachmentIcon',

    overrideStyles: true,
  },
) as React.FC<AttachmentIconProps> & { create?: ShorthandFactory<AttachmentIconProps> };

AttachmentIcon.defaultProps = {
  as: 'span',
};
AttachmentIcon.propTypes = commonPropTypes.createCommon();

AttachmentIcon.create = createShorthandFactory({ Component: AttachmentIcon });

export default AttachmentIcon;
