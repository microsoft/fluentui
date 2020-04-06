import { Accessibility, textAreaBehavior } from '@fluentui/accessibility';
import { ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types';
import * as _ from 'lodash';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  RenderResultConfig,
  AutoControlledComponent,
  applyAccessibilityKeyHandlers,
} from '../../utils';

export interface TextAreaProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** The default value of the text area. */
  defaultValue?: string;

  /**
   * Called on change.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onChange?: ComponentEventHandler<TextAreaProps>;

  /** The value of the text area. */
  value?: string;

  /** The text area becomes read-only. */
  disabled?: boolean;

  /** An input can have inverted colors. */
  inverted?: boolean;

  /** A textarea can be resized. */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';

  /** A textarea can take the width of its container. */
  fluid?: boolean;
}

export interface TextAreaState {
  value?: TextAreaProps['value'];
}

class TextArea extends AutoControlledComponent<WithAsProp<TextAreaProps>, TextAreaState> {
  static className = 'ui-textarea';

  static displayName = 'TextArea';

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    as: 'textarea',
    accessibility: textAreaBehavior,
  };

  static autoControlledProps = ['value'];

  renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    unhandledProps,
  }: RenderResultConfig<TextAreaProps>) {
    const { disabled } = this.props;
    const { value = '' } = this.state;

    return (
      <ElementType
        value={value}
        className={classes.root}
        onChange={this.handleChange}
        disabled={disabled}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      />
    );
  }

  handleChange = (e: React.ChangeEvent | React.FormEvent) => {
    const value = _.get(e, 'target.value');

    _.invoke(this.props, 'onChange', e, { ...this.props, value });
    this.setState({ value });
  };
}

/**
 * A TextArea is a multi-line plan-text editing control.
 *
 * @accessibility
 * For good screen reader experience set `aria-label` or `aria-labelledby` attribute for textarea.
 * When using maxlength attribute, provide the information about max length in label for screen reader.
 * @accessibilityIssues
 * [NVDA - No announcement of maxlength](https://github.com/nvaccess/nvda/issues/7910)
 * [JAWS - textarea - no announcement of maxlength](https://github.com/FreedomScientific/VFO-standards-support/issues/300)
 */
export default withSafeTypeForAs<typeof TextArea, TextAreaProps, 'textarea'>(TextArea);
