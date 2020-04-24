import { buttonBehavior } from '@fluentui/accessibility';
import { compose, ComponentWithAs } from '@fluentui/react-bindings';

import { createShorthandFactory, ShorthandFactory } from '../../utils';
import Button, { ButtonProps, ButtonStylesProps } from '../Button/Button';

interface AttachmentActionOwnProps {}
export interface AttachmentActionProps extends AttachmentActionOwnProps, ButtonProps {}

export type AttachmentActionStylesProps = never;
export const attachmentActionClassName = 'ui-attachment__action';

/**
 * An AttachmentAction provides a slot for actions in the Attachment.
 */
const AttachmentAction = compose<
  'button',
  AttachmentActionOwnProps,
  AttachmentActionStylesProps,
  ButtonProps,
  ButtonStylesProps
>(Button, {
  className: attachmentActionClassName,
  displayName: 'AttachmentAction',
}) as ComponentWithAs<'button', AttachmentActionProps> & { create: ShorthandFactory<any> };

AttachmentAction.defaultProps = {
  accessibility: buttonBehavior,
  as: 'button',
  iconOnly: true,
  text: true,
};
AttachmentAction.propTypes = Button.propTypes;

AttachmentAction.create = createShorthandFactory({ Component: AttachmentAction, mappedProp: 'content' });

export default AttachmentAction;
