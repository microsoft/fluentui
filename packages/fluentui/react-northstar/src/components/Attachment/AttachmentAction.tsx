import { buttonBehavior } from '@fluentui/accessibility';
import { compose } from '@fluentui/react-bindings';
import * as React from 'react';

import { WithAsProp } from '../../types';
import { createShorthandFactory, ShorthandFactory } from '../../utils';
import Button, { ButtonProps, ButtonStylesProps } from '../Button/Button';

interface AttachmentActionOwnProps {}
export interface AttachmentActionProps extends AttachmentActionOwnProps, WithAsProp<ButtonProps> {}

export type AttachmentActionStylesProps = never;
export const attachmentActionClassName = 'ui-attachment__action';

/**
 * An AttachmentAction provides a slot for actions in the Attachment.
 */
const AttachmentAction = compose<
  AttachmentActionOwnProps,
  AttachmentActionStylesProps,
  WithAsProp<ButtonProps>,
  ButtonStylesProps
>(Button, {
  className: attachmentActionClassName,
  displayName: 'AttachmentAction',
}) as React.FC<AttachmentActionProps> & {
  create?: ShorthandFactory<AttachmentActionProps>;
  deprecated_className: string;
};

AttachmentAction.defaultProps = {
  accessibility: buttonBehavior,
  as: 'button',
  iconOnly: true,
  text: true,
};
AttachmentAction.propTypes = (Button as React.FC).propTypes;

AttachmentAction.create = createShorthandFactory({ Component: AttachmentAction, mappedProp: 'content' });

export default AttachmentAction;
