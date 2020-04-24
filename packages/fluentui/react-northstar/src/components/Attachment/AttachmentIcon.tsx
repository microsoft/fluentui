import { compose, ComponentWithAs } from '@fluentui/react-bindings';

import { commonPropTypes, createShorthandFactory, ShorthandFactory } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface AttachmentIconOwnProps {}
export interface AttachmentIconProps extends AttachmentIconOwnProps, BoxProps {}

export type AttachmentIconStylesProps = never;
export const attachmentIconClassName = 'ui-attachment__icon';

/**
 * An AttachmentIcon provides a slot for a glyph that describes content in the Attachment.
 */
const AttachmentIcon = compose<'span', AttachmentIconOwnProps, AttachmentIconStylesProps, BoxProps, BoxStylesProps>(
  Box,
  {
    className: attachmentIconClassName,
    displayName: 'AttachmentIcon',

    overrideStyles: true,
  },
) as ComponentWithAs<'span', AttachmentIconProps> & { create: ShorthandFactory<AttachmentIconProps> };

AttachmentIcon.defaultProps = {
  as: 'span',
};
AttachmentIcon.propTypes = commonPropTypes.createCommon();

AttachmentIcon.create = createShorthandFactory({ Component: AttachmentIcon, mappedProp: 'content' });

export default AttachmentIcon;
