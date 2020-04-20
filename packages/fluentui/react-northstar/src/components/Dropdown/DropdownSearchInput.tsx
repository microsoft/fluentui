import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

import {
  UIComponent,
  RenderResultConfig,
  createShorthandFactory,
  commonPropTypes,
  ShorthandFactory,
} from '../../utils';
import { ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types';
import { UIComponentProps } from '../../utils/commonPropInterfaces';
import Input from '../Input/Input';

export interface DropdownSearchInputSlotClassNames {
  input: string;
  wrapper: string;
}

export interface DropdownSearchInputProps extends UIComponentProps<DropdownSearchInputProps> {
  /** Accessibility props for combobox slot. */
  accessibilityComboboxProps?: any;

  /** Accessibility props for input slot. */
  accessibilityInputProps?: any;

  /** A dropdown search input can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A dropdown search input can be formatted to appear inline in the context of a Dropdown. */
  inline?: boolean;

  /** Ref for input DOM node. */
  inputRef?: React.Ref<HTMLElement>;

  /**
   * Called on input element focus.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onFocus?: ComponentEventHandler<DropdownSearchInputProps>;

  /**
   * Called on input element blur.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onInputBlur?: ComponentEventHandler<DropdownSearchInputProps>;

  /**
   * Called on input key down event.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onInputKeyDown?: ComponentEventHandler<DropdownSearchInputProps>;

  /**
   * Called on input key up event.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onKeyUp?: ComponentEventHandler<DropdownSearchInputProps>;

  /** A placeholder message. */
  placeholder?: string;
}

export const dropdownSearchInputClassName = 'ui-dropdown__searchinput';
export const dropdownSearchInputSlotClassNames: DropdownSearchInputSlotClassNames = {
  input: `${dropdownSearchInputClassName}__input`,
  wrapper: `${dropdownSearchInputClassName}__wrapper`,
};

class DropdownSearchInput extends UIComponent<WithAsProp<DropdownSearchInputProps>, any> {
  static displayName = 'DropdownSearchInput';
  static create: ShorthandFactory<DropdownSearchInputProps>;
  static deprecated_className = dropdownSearchInputClassName;

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      children: false,
      content: false,
    }),
    accessibilityInputProps: PropTypes.object,
    accessibilityComboboxProps: PropTypes.object,
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    inputRef: customPropTypes.ref,
    onFocus: PropTypes.func,
    onInputBlur: PropTypes.func,
    onInputKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
  };

  handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onFocus', e, this.props);
  };

  handleInputKeyDown = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onInputKeyDown', e, this.props);
  };

  handleInputBlur = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onInputBlur', e, this.props);
  };

  handleKeyUp = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onKeyUp', e, this.props);
  };

  renderComponent({ unhandledProps, styles }: RenderResultConfig<DropdownSearchInputProps>) {
    const { accessibilityComboboxProps, accessibilityInputProps, inputRef, placeholder, disabled } = this.props;
    return (
      <Input
        disabled={disabled}
        inputRef={inputRef}
        onFocus={this.handleFocus}
        onKeyUp={this.handleKeyUp}
        {...unhandledProps}
        wrapper={{
          className: dropdownSearchInputSlotClassNames.wrapper,
          styles: styles.root,
          ...accessibilityComboboxProps,
          ...unhandledProps.wrapper,
        }}
        input={{
          type: 'text',
          className: dropdownSearchInputSlotClassNames.input,
          styles: styles.input,
          placeholder,
          onBlur: this.handleInputBlur,
          onKeyDown: this.handleInputKeyDown,
          ...accessibilityInputProps,
          ...unhandledProps.input,
        }}
      />
    );
  }
}

DropdownSearchInput.create = createShorthandFactory({ Component: DropdownSearchInput });

/**
 * A DropdownSearchInput represents item of 'search' Dropdown.
 * Used to display the search input field.
 */
export default withSafeTypeForAs<typeof DropdownSearchInput, DropdownSearchInputProps>(DropdownSearchInput);
