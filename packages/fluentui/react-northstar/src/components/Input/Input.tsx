import { Accessibility, inputBehavior } from '@fluentui/accessibility';
import { handleRef, Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import * as _ from 'lodash';

import {
  AutoControlledComponent,
  RenderResultConfig,
  partitionHTMLProps,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  applyAccessibilityKeyHandlers,
} from '../../utils';
import { SupportedIntrinsicInputProps } from '../../utils/htmlPropsUtils';
import { WithAsProp, ShorthandValue, ComponentEventHandler, withSafeTypeForAs } from '../../types';
import Box, { BoxProps } from '../Box/Box';

export interface InputSlotClassNames {
  input: string;
  icon: string;
}

export interface InputProps extends UIComponentProps, ChildrenComponentProps, SupportedIntrinsicInputProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility;

  /** A property that will change the icon on the input and clear the input on click on Cancel. */
  clearable?: boolean;

  /** The default value of the input. */
  defaultValue?: string | string[];

  /** An Input can be disabled. */
  disabled?: boolean;

  /** An input can take the width of its container. */
  fluid?: boolean;

  /** Optional Icon to display inside the Input. */
  icon?: ShorthandValue<BoxProps>;

  /** An Input with icon can format the icon to appear at the start or at the end of the input field. */
  iconPosition?: 'start' | 'end';

  /** An input can be used inline with text. */
  inline?: boolean;

  /** Shorthand for the input component. */
  input?: ShorthandValue<BoxProps>;

  /** An input can have inverted colors. */
  inverted?: boolean;

  /**
   * Called on change.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onChange?: ComponentEventHandler<InputProps & { value: string }>;

  /** The HTML input type. */
  type?: string;

  /** Ref for input DOM node. */
  inputRef?: React.Ref<HTMLElement>;

  /** The value of the input. */
  value?: string | number;

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue<BoxProps>;
}

export interface InputState {
  value?: InputProps['value'];
  hasValue?: boolean;
}

export const inputClassName = 'ui-input';
export const inputSlotClassNames: InputSlotClassNames = {
  input: `${inputClassName}__input`,
  icon: `${inputClassName}__icon`,
};

class Input extends AutoControlledComponent<WithAsProp<InputProps>, InputState> {
  inputRef = React.createRef<HTMLElement>();

  static deprecated_className = inputClassName;

  static displayName = 'Input';

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    clearable: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    fluid: PropTypes.bool,
    icon: customPropTypes.shorthandAllowingChildren,
    iconPosition: PropTypes.oneOf(['start', 'end']),
    input: customPropTypes.itemShorthand,
    inputRef: customPropTypes.ref,
    inline: PropTypes.bool,
    inverted: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wrapper: customPropTypes.wrapperShorthand,
  };

  static defaultProps = {
    accessibility: inputBehavior,
    type: 'text',
    wrapper: {},
    iconPosition: 'end',
  };

  static autoControlledProps = ['value'];

  static getAutoControlledStateFromProps(props: InputProps, state: InputState): Partial<InputState> {
    const { value } = state;

    return {
      hasValue: !!value && (value as string).length !== 0,
    };
  }

  actionHandlers = {
    clear: (e: React.KeyboardEvent) => {
      if (this.props.clearable && this.state.value !== '') {
        e.stopPropagation();
        e.nativeEvent && e.nativeEvent.stopPropagation();
        this.handleOnClear(e);
      }
    },
  };

  renderComponent({ accessibility, ElementType, unhandledProps, styles, variables }: RenderResultConfig<InputProps>) {
    const { className, input, inputRef, type, wrapper, disabled } = this.props;
    const { value = '' } = this.state;
    const [htmlInputProps, restProps] = partitionHTMLProps(unhandledProps);

    return Box.create(wrapper, {
      defaultProps: () => ({
        ...accessibility.attributes.root,
        className: cx(inputClassName, className),
        children: (
          <>
            <Ref
              innerRef={(inputElement: HTMLElement) => {
                handleRef(this.inputRef, inputElement);
                handleRef(inputRef, inputElement);
              }}
            >
              {Box.create(input || type, {
                defaultProps: () => ({
                  ...htmlInputProps,
                  as: 'input',
                  disabled,
                  type,
                  value,
                  className: inputSlotClassNames.input,
                  styles: styles.input,
                  onChange: this.handleChange,
                  ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.input, htmlInputProps),
                }),
              })}
            </Ref>
            {Box.create(this.computeIcon(), {
              defaultProps: () => ({
                className: inputSlotClassNames.icon,
                styles: styles.icon,
              }),
              overrideProps: this.handleIconOverrides,
            })}
          </>
        ),
        styles: styles.root,
        ...restProps,
      }),
      overrideProps: {
        as: (wrapper && (wrapper as any).as) || ElementType,
      },
    });
  }

  handleIconOverrides = predefinedProps => ({
    onClick: (e: React.SyntheticEvent) => {
      if (!this.props.disabled) {
        this.handleOnClear(e);
        this.inputRef.current.focus();
      }

      _.invoke(predefinedProps, 'onClick', e, this.props);
    },
  });

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.disabled) {
      return;
    }

    const value = _.get(e, 'target.value');

    _.invoke(this.props, 'onChange', e, { ...this.props, value });

    this.setState({ value });
  };

  handleOnClear = (e: React.SyntheticEvent) => {
    if (this.props.clearable) {
      _.invoke(this.props, 'onChange', e, { ...this.props, value: '' });
      this.setState({ value: '' });
    }
  };

  computeIcon = (): ShorthandValue<BoxProps> => {
    const { clearable, icon } = this.props;
    const { value } = this.state;

    if (clearable && (value as string).length !== 0) {
      return {};
    }

    return icon || null;
  };
}

/**
 * An Input is a field used to elicit an input from a user.
 *
 * @accessibility
 * For good screen reader experience set `aria-label` or `aria-labelledby` attribute for input.
 */
export default withSafeTypeForAs<typeof Input, InputProps, 'div'>(Input);
