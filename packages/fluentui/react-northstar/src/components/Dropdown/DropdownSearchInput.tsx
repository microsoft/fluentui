import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { createShorthandFactory, commonPropTypes } from '../../utils';
import {
  ComponentEventHandler,
  WithAsProp,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import { UIComponentProps } from '../../utils/commonPropInterfaces';
import Input from '../Input/Input';
import { useTelemetry, useStyles, useUnhandledProps } from '@fluentui/react-bindings';

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

export type DropdownSearchInputStylesProps = Required<Pick<DropdownSearchInputProps, 'inline'>>;

export const DropdownSearchInput: React.FC<WithAsProp<DropdownSearchInputProps>> &
  FluentComponentStaticProps<DropdownSearchInputProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(DropdownSearchInput.displayName, context.telemetry);
  setStart();
  const {
    accessibilityComboboxProps,
    accessibilityInputProps,
    inputRef,
    inline,
    placeholder,
    disabled,
    className,
    design,
    styles,
    variables,
  } = props;

  const unhandledProps = useUnhandledProps(DropdownSearchInput.handledProps, props);

  const { styles: resolvedStyles } = useStyles<DropdownSearchInputStylesProps>(DropdownSearchInput.displayName, {
    className: dropdownSearchInputClassName,
    mapPropsToStyles: () => ({ inline }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
  });

  const handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onFocus', e, props);
  };

  const handleInputKeyDown = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onInputKeyDown', e, props);
  };

  const handleInputBlur = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onInputBlur', e, props);
  };

  const handleKeyUp = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onKeyUp', e, props);
  };

  const element = (
    <Input
      disabled={disabled}
      inputRef={inputRef}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
      {...unhandledProps}
      wrapper={{
        className: dropdownSearchInputSlotClassNames.wrapper,
        styles: resolvedStyles.root,
        ...accessibilityComboboxProps,
        ...unhandledProps.wrapper,
      }}
      input={{
        type: 'text',
        className: dropdownSearchInputSlotClassNames.input,
        styles: resolvedStyles.input,
        placeholder,
        onBlur: handleInputBlur,
        onKeyDown: handleInputKeyDown,
        ...accessibilityInputProps,
        ...unhandledProps.input,
      }}
    />
  );
  setEnd();
  return element;
};

DropdownSearchInput.displayName = 'DropdownSearchInput';

DropdownSearchInput.propTypes = {
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

DropdownSearchInput.handledProps = Object.keys(DropdownSearchInput.propTypes) as any;

DropdownSearchInput.create = createShorthandFactory({ Component: DropdownSearchInput });

/**
 * A DropdownSearchInput represents item of 'search' Dropdown.
 * Used to display the search input field.
 */
export default withSafeTypeForAs<typeof DropdownSearchInput, DropdownSearchInputProps>(DropdownSearchInput);
