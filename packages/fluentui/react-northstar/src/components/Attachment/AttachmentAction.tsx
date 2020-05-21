import { buttonBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Button, { ButtonProps, ButtonStylesProps } from '../Button/Button';

interface AttachmentActionOwnProps {}
export interface AttachmentActionProps extends AttachmentActionOwnProps, ButtonProps {
  text?: never;
  iconOnly?: never;
  circular?: never;
  size?: never;
  fluid?: never;
  inverted?: never;
}

export type AttachmentActionStylesProps = ButtonStylesProps & {
  text?: never;
  iconOnly?: never;
  circular?: never;
  size?: never;
  fluid?: never;
  inverted?: never;
};
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
  overrideStyles: true,
}) as ComponentWithAs<'button', AttachmentActionProps> & { shorthandConfig: ShorthandConfig<AttachmentActionProps> };

AttachmentAction.defaultProps = {
  accessibility: buttonBehavior,
  as: 'button',
};
AttachmentAction.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  disabled: PropTypes.bool,
  icon: customPropTypes.shorthandAllowingChildren,
  iconPosition: PropTypes.oneOf(['before', 'after']),
  loader: customPropTypes.itemShorthandWithoutJSX,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
};

AttachmentAction.shorthandConfig = {
  mappedProp: 'content',
};

export default AttachmentAction;
