import { compose, ComponentWithAs } from '@fluentui/react-bindings';

import { commonPropTypes, createShorthandFactory, ShorthandFactory } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface AttachmentDescriptionOwnProps {}
export interface AttachmentDescriptionProps extends AttachmentDescriptionOwnProps, BoxProps {}

export type AttachmentDescriptionStylesProps = never;
export const attachmentDescriptionClassName = 'ui-attachment__description';

/**
 * A AttachmentDescription provides more detailed information about the Attachment.
 */
const AttachmentDescription = compose<
  'span',
  AttachmentDescriptionOwnProps,
  AttachmentDescriptionStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: attachmentDescriptionClassName,
  displayName: 'AttachmentDescription',

  overrideStyles: true,
}) as ComponentWithAs<'span', AttachmentDescriptionProps> & { create?: ShorthandFactory<AttachmentDescriptionProps> };

AttachmentDescription.defaultProps = {
  as: 'span',
};
AttachmentDescription.propTypes = commonPropTypes.createCommon();

AttachmentDescription.create = createShorthandFactory({ Component: AttachmentDescription, mappedProp: 'content' });

export default AttachmentDescription;
