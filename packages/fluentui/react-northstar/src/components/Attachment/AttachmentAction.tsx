import { buttonBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Button, ButtonProps, ButtonStylesProps } from '../Button/Button';

export interface AttachmentActionOwnProps {}
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
export const AttachmentAction = compose<
  'button',
  AttachmentActionOwnProps,
  AttachmentActionStylesProps,
  ButtonProps,
  ButtonStylesProps
>(Button, {
  className: attachmentActionClassName,
  displayName: 'AttachmentAction',
  overrideStyles: true,

  shorthandConfig: {
    mappedProp: 'content',
  },
});

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
