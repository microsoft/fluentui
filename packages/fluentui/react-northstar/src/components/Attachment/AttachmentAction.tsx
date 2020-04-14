import { buttonBehavior } from '@fluentui/accessibility';
import { compose } from '@fluentui/react-bindings';
import * as React from 'react';

import { WithAsProp } from '../../types';
import { createShorthandFactory, ShorthandFactory } from '../../utils';
import Button, { ButtonProps, ButtonStylesProps } from '../Button/Button';

interface AttachmentActionOwnProps {}
export interface AttachmentActionProps extends AttachmentActionOwnProps, WithAsProp<ButtonProps> {}

export type AttachmentActionStylesProps = never;

/**
 * An AttachmentAction provides a slot for actions in the Attachment.
 */
const AttachmentAction = compose<
  AttachmentActionOwnProps,
  AttachmentActionStylesProps,
  WithAsProp<ButtonProps>,
  ButtonStylesProps
>(Button, {
  className: 'ui-attachment__action',
  displayName: 'AttachmentAction',
}) as React.FC<AttachmentActionProps> & { create?: ShorthandFactory<AttachmentActionProps>; className: string };

AttachmentAction.defaultProps = {
  accessibility: buttonBehavior,
  iconOnly: true,
  text: true,
};
AttachmentAction.propTypes = (Button as React.FC).propTypes;

AttachmentAction.create = createShorthandFactory({ Component: AttachmentAction, mappedProp: 'content' });

export default AttachmentAction;
