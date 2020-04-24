import { Accessibility } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  UIComponent,
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ShorthandFactory,
} from '../../utils';

import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types';
import Text, { TextProps } from '../Text/Text';
import Input from '../Input/Input';
import Box, { BoxProps } from '../Box/Box';

export interface FormFieldProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility;

  /** A control for the form field. */
  control?: ShorthandValue<BoxProps>;

  /** The HTML input id. This will be set on the control element and will be use for linking it with the label for correct accessibility. */
  id?: string;

  /** A field can have its label next to instead of above it. */
  inline?: boolean;

  /** A label for the form field. */
  label?: ShorthandValue<TextProps>;

  /** Text message that will be displayed below the control (can be used for error, warning, success messages). */
  message?: ShorthandValue<TextProps>;

  /** The HTML input name. */
  name?: string;

  /** A field can show that input is mandatory. */
  required?: boolean;

  /** The HTML input type. */
  type?: string;
}

export const formFieldClassName = 'ui-form__field';

class FormField extends UIComponent<WithAsProp<FormFieldProps>, any> {
  static displayName = 'FormField';

  static deprecated_className = formFieldClassName;

  static create: ShorthandFactory<FormFieldProps>;

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    control: customPropTypes.itemShorthand,
    id: PropTypes.string,
    inline: PropTypes.bool,
    label: customPropTypes.itemShorthand,
    message: customPropTypes.itemShorthand,
    name: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
  };

  static defaultProps = {
    as: 'div',
    control: { as: Input },
  };

  renderComponent({ ElementType, classes, accessibility, styles, unhandledProps }): React.ReactNode {
    const { children, control, id, label, message, name, required, type } = this.props;

    const labelElement = Text.create(label, {
      defaultProps: () => ({
        as: 'label',
        htmlFor: id,
        styles: styles.label,
      }),
    });

    const messageElement = Text.create(message, {
      defaultProps: () => ({
        styles: styles.message,
      }),
    });

    const controlElement = Box.create(control || {}, {
      defaultProps: () => ({ required, id, name, type, styles: styles.control }),
    });

    const content = (
      <>
        {this.shouldControlAppearFirst() && controlElement}
        {labelElement}
        {!this.shouldControlAppearFirst() && controlElement}
        {messageElement}
      </>
    );

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {childrenExist(children) ? children : content}
      </ElementType>
    );
  }

  shouldControlAppearFirst = () => {
    const { type } = this.props;
    return type && (type === 'checkbox' || type === 'radio');
  };
}

FormField.create = createShorthandFactory({ Component: FormField, mappedProp: 'label' });

/**
 * A FormField represents a Form element containing a label and an input.
 */
export default withSafeTypeForAs<typeof FormField, FormFieldProps>(FormField);
