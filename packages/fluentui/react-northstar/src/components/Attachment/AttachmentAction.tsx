import { compose } from '@fluentui/react-bindings';

import Box, { BoxProps, BoxStylesProps } from '../Box/Box';
import { WithAsProp } from '../../types';
import { createShorthandFactory, ShorthandFactory } from '../../utils';
import * as React from 'react';

interface AttachmentActionOwnProps {}
export interface AttachmentActionProps extends AttachmentActionOwnProps, WithAsProp<BoxProps> {}

export type AttachmentActionStylesProps = never;

/**
 * An AttachmentAction provides a slot for actions in the Attachment.
 */
const AttachmentAction = compose<
  AttachmentActionOwnProps,
  AttachmentActionStylesProps,
  WithAsProp<BoxProps>,
  BoxStylesProps
>(Box, {
  className: 'ui-attachment__action',
  displayName: 'AttachmentAction',

  overrideStyles: true,
}) as React.FC<AttachmentActionProps> & { create?: ShorthandFactory<AttachmentActionProps> };

AttachmentAction.create = createShorthandFactory({ Component: AttachmentAction });
AttachmentAction.defaultProps = {
  as: 'button',
};

export default AttachmentAction;
