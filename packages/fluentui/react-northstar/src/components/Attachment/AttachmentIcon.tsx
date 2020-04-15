import { compose } from '@fluentui/react-bindings';
import * as React from 'react';

import { WithAsProp } from '../../types';
import { commonPropTypes, createShorthandFactory, ShorthandFactory } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface AttachmentIconOwnProps {}
export interface AttachmentIconProps extends AttachmentIconOwnProps, WithAsProp<BoxProps> {}

export type AttachmentIconStylesProps = never;
export const attachmentIconClassName = 'ui-attachment__icon';

/**
 * An AttachmentIcon provides a slot for a glyph that describes content in the Attachment.
 */
const AttachmentIcon = compose<AttachmentIconOwnProps, AttachmentIconStylesProps, WithAsProp<BoxProps>, BoxStylesProps>(
  Box,
  {
    className: attachmentIconClassName,
    displayName: 'AttachmentIcon',

    overrideStyles: true,
  },
) as React.FC<AttachmentIconProps> & { create?: ShorthandFactory<AttachmentIconProps>; deprecated_className: string };

AttachmentIcon.defaultProps = {
  as: 'span',
};
AttachmentIcon.propTypes = commonPropTypes.createCommon();

AttachmentIcon.create = createShorthandFactory({ Component: AttachmentIcon, mappedProp: 'content' });

export default AttachmentIcon;
