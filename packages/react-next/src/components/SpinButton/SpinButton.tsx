import * as React from 'react';
import { IconButton } from '../../Button';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import {
  initializeComponentRef,
  warnMutuallyExclusive,
  Async,
  getId,
  KeyCodes,
  customizable,
  calculatePrecision,
  precisionRound,
  mergeAriaAttributeValues,
  getNativeProps,
  divProperties,
} from '../../Utilities';
import { ISpinButton, ISpinButtonProps } from './SpinButton.types';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import { getStyles, getArrowButtonStyles } from './SpinButton.styles';
import { getClassNames } from './SpinButton.classNames';
import { KeytipData } from '../../KeytipData';
import { useBoolean, useId } from '@uifabric/react-hooks';

export enum KeyboardSpinDirection {
  down = -1,
  notSpinning = 0,
  up = 1,
}

export interface ISpinButtonState {
  // Is true when the control has focus.
  isFocused: boolean;

  // The value of the spin button
  value: string;

  //  keyboard spin direction, used to style the up or down button
  //  as active when up/down arrow is pressed
  keyboardSpinDirection: KeyboardSpinDirection;
}

// TODO (Fabric Next): remove default min/max values (issue #11358).
export type DefaultProps = Required<
  Pick<
    ISpinButtonProps,
    'step' | 'min' | 'max' | 'disabled' | 'labelPosition' | 'label' | 'incrementButtonIcon' | 'decrementButtonIcon'
  >
>;

/** Internal only props */
type ISpinButtonInternalProps = ISpinButtonProps & DefaultProps;

// @customizable('SpinButton', ['theme', 'styles'], true)
export const SpinButton: React.FunctionComponent = (props: ISpinButtonProps) => {
  const [isFocused, { toggle: toggleIsFocused }] = useBoolean(false);
  const initialValues = props.value || props.defaultValue || String(props.min) || '0';
  const [value, setValue] = React.useState(initialValues);
  const [keyboardSpinDirection, setKeyboardSpinDirection] = React.useState(KeyboardSpinDirection.notSpinning);

  // const async: Async;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputId: string = useId('input');
  const labelId: string = useId('Label');
  let lastValidValue: string = value;
  let spinningByMouse: boolean = false;
  let valueToValidate: string | undefined = undefined; // To avoid duplicate validations/submissions
  // Ensure that the autocalculated precision is not negative.
  const precision: number = calculatePrecision(props as ISpinButtonInternalProps);
  let currentStepFunctionHandle: number;
  const initialStepDelay = 400;
  const stepDelay = 75;

  const {
    step = 1,
    disabled = false,
    label = '',
    min = 0,
    max = 100,
    labelPosition = Position.start,
    iconProps,
    incrementButtonIcon = { iconName: 'ChevronUpSmall' },
    incrementButtonAriaLabel,
    decrementButtonIcon = { iconName: 'ChevronDownSmall' },
    decrementButtonAriaLabel,
    ariaLabel,
    ariaDescribedBy,
    styles: customStyles,
    upArrowButtonStyles: customUpArrowButtonStyles,
    downArrowButtonStyles: customDownArrowButtonStyles,
    theme,
    ariaPositionInSet,
    ariaSetSize,
    ariaValueNow,
    ariaValueText,
    keytipProps,
    className,
    inputProps,
    iconButtonProps,
  } = props as ISpinButtonInternalProps;

  const classNames = props.getClassNames
    ? props.getClassNames(theme!, disabled, isFocused, keyboardSpinDirection, labelPosition, className)
    : getClassNames(
        getStyles(theme!, customStyles),
        disabled,
        isFocused,
        keyboardSpinDirection,
        labelPosition,
        className,
      );

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, [
    'onBlur',
    'onFocus',
    'className',
  ]);

  warnMutuallyExclusive('SpinButton', props, {
    value: 'defaultValue',
  });

  // const focus = (): void => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // };

  const onFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
    // We can't set focus on a non-existing element
    if (!inputRef.current) {
      return;
    }
    if (spinningByMouse || keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
      stop();
    }
    inputRef.current.select();
    toggleIsFocused();
    if (props.onFocus) {
      props.onFocus(ev);
    }
  };

  const onBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
    validate(ev);
    toggleIsFocused();
    if (props.onBlur) {
      props.onBlur(ev);
    }
  };

  /**
   * Gets the value of the spin button.
   */
  // public get value(): string | undefined {
  //   return this.props.value === undefined ? this.state.value : this.props.value;
  // }

  const onValidate = (propValue: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    if (props.onValidate) {
      return props.onValidate(propValue, event);
    } else {
      return defaultOnValidate(propValue);
    }
  };

  // const calculatePrecision = (precisionProps: ISpinButtonProps & DefaultProps) => {
  //   const { setprecision = Math.max(calculatePrecision(props.step), 0) } = precisionProps;
  //   return precision;
  // };

  /**
   * Validate function to use if one is not passed in
   */
  const defaultOnValidate = (propValue: string) => {
    if (value === null || value.trim().length === 0 || isNaN(Number(value))) {
      return lastValidValue;
    }
    const newValue = Math.min(props.max as number, Math.max(props.min as number, Number(value)));
    return String(newValue);
  };

  const onIncrement = (propValue: string): string | void => {
    if (props.onIncrement) {
      return props.onIncrement(propValue);
    } else {
      return defaultOnIncrement(propValue);
    }
  };

  /**
   * Increment function to use if one is not passed in
   */
  const defaultOnIncrement = (propValue: string): string | void => {
    let newValue: number = Math.min(Number(propValue) + Number(step), max);
    newValue = precisionRound(newValue, precision);
    return String(newValue);
  };

  const onDecrement = (propValue: string): string | void => {
    if (props.onDecrement) {
      return props.onDecrement(propValue);
    } else {
      return defaultOnDecrement(propValue);
    }
  };

  /**
   * Increment function to use if one is not passed in
   */
  const defaultOnDecrement = (propValue: string): string | void => {
    let newValue: number = Math.max(Number(propValue) - Number(step), min);
    newValue = precisionRound(newValue, precision);
    return String(newValue);
  };

  const onChange = (): void => {
    /**
     * A noop input change handler. Using onInput instead of onChange was meant to address an issue
     * which apparently has been resolved in React 16 (https://github.com/facebook/react/issues/7027).
     * The no-op onChange handler was still needed because React gives console errors if an input
     * doesn't have onChange.
     *
     * TODO (Fabric 8?) - switch to just calling onChange (this is a breaking change for any tests,
     * ours or 3rd-party, which simulate entering text in a SpinButton)
     */
  };

  /**
   * This is used when validating text entry
   * in the input (not when changed via the buttons)
   * @param event - the event that fired
   */
  const validate = (event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>): void => {
    if (value !== undefined && valueToValidate !== undefined && valueToValidate !== lastValidValue) {
      const newValue = onValidate!(valueToValidate, event);
      if (newValue) {
        lastValidValue = newValue;
        valueToValidate = undefined;
        setValue(newValue);
      }
    }
  };

  /**
   * The method is needed to ensure we are updating the actual input value.
   * without this our value will never change (and validation will not have the correct number)
   * @param event - the event that was fired
   */
  const onInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const newValue: string = element.value;
    valueToValidate = newValue;
    setValue(newValue);
  };

  /**
   * Update the value with the given stepFunction
   * @param shouldSpin - should we fire off another updateValue when we are done here? This should be true
   * when spinning in response to a mouseDown
   * @param stepFunction - function to use to step by
   */
  const updateValue = (
    shouldSpin: boolean,
    propStepDelay: number,
    stepFunction: (value: string) => string | void,
  ): void => {
    const newValue: string | void = stepFunction(value);
    if (newValue) {
      lastValidValue = newValue;
      setValue(newValue);
    }
    if (spinningByMouse !== shouldSpin) {
      spinningByMouse = shouldSpin;
    }
    if (shouldSpin) {
      React.useEffect(() => {
        const id = setInterval(() => {
          updateValue(shouldSpin, propStepDelay, stepFunction);
        }, propStepDelay);
        return () => {
          clearInterval(id);
        };
      });

      // currentStepFunctionHandle = this._async.setTimeout(() => {
      //   updateValue(shouldSpin, propStepDelay, stepFunction);
      // }, propStepDelay);
    }
  };

  /**
   * Stop spinning (clear any currently pending update and set spinning to false)
   */
  const stop = (): void => {
    if (currentStepFunctionHandle >= 0) {
      this._async.clearTimeout(currentStepFunctionHandle);
      currentStepFunctionHandle = -1;
    }

    if (spinningByMouse || keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
      spinningByMouse = false;
      setKeyboardSpinDirection(KeyboardSpinDirection.notSpinning);
    }
  };

  /**
   * Handle keydown on the text field. We need to update
   * the value when up or down arrow are depressed
   * @param event - the keyboardEvent that was fired
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // eat the up and down arrow keys to keep focus in the spinButton
    // (especially when a spinButton is inside of a FocusZone)
    if (event.which === KeyCodes.up || event.which === KeyCodes.down || event.which === KeyCodes.enter) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (props.disabled) {
      stop();
      return;
    }

    let spinDirection = KeyboardSpinDirection.notSpinning;

    switch (event.which) {
      case KeyCodes.up:
        spinDirection = KeyboardSpinDirection.up;
        updateValue(false /* shouldSpin */, initialStepDelay, onIncrement!);
        break;
      case KeyCodes.down:
        spinDirection = KeyboardSpinDirection.down;
        updateValue(false /* shouldSpin */, initialStepDelay, onDecrement!);
        break;
      case KeyCodes.enter:
        validate(event);
        break;
      case KeyCodes.escape:
        if (value !== lastValidValue) {
          setValue(lastValidValue);
        }
        break;
      default:
        break;
    }
    // style the increment/decrement button to look active
    // when the corresponding up/down arrow keys trigger a step
    if (keyboardSpinDirection !== spinDirection) {
      setKeyboardSpinDirection(spinDirection);
    }
  };

  /**
   * Make sure that we have stopped spinning on keyUp
   * if the up or down arrow fired this event
   * @param event - keyboard event
   */

  const handleKeyUp = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (props.disabled || event.which === KeyCodes.up || event.which === KeyCodes.down) {
      stop();
      return;
    }
  };

  const onIncrementMouseDown = (): void => {
    updateValue(true /* shouldSpin */, initialStepDelay, onIncrement!);
  };

  const onDecrementMouseDown = (): void => {
    updateValue(true /* shouldSpin */, initialStepDelay, onDecrement!);
  };

  return (
    <div className={classNames.root}>
      {labelPosition !== Position.bottom && (iconProps || label) && (
        <div className={classNames.labelWrapper}>
          {iconProps && <Icon {...iconProps} className={classNames.icon} aria-hidden="true" />}
          {label && (
            <Label id={labelId} htmlFor={inputId} className={classNames.label} disabled={disabled}>
              {label}
            </Label>
          )}
        </div>
      )}
      <KeytipData keytipProps={keytipProps} disabled={disabled}>
        {(keytipAttributes: any): JSX.Element => (
          <div
            {...nativeProps}
            className={classNames.spinButtonWrapper}
            aria-label={ariaLabel && ariaLabel}
            aria-posinset={ariaPositionInSet}
            aria-setsize={ariaSetSize}
            data-ktp-target={keytipAttributes['data-ktp-target']}
          >
            <input
              value={value}
              id={inputId}
              onChange={onChange}
              onInput={onInputChange}
              className={classNames.input}
              type="text"
              autoComplete="off"
              role="spinbutton"
              aria-labelledby={label && labelId}
              aria-valuenow={
                !isNaN(Number(ariaValueNow)) ? ariaValueNow : !isNaN(Number(value)) ? Number(value) : undefined
              }
              aria-valuetext={ariaValueText ? ariaValueText : isNaN(Number(value)) ? value : undefined}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-describedby={mergeAriaAttributeValues(ariaDescribedBy, keytipAttributes['aria-describedby'])}
              onBlur={onBlur}
              ref={inputRef}
              onFocus={onFocus}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              disabled={disabled}
              aria-disabled={disabled}
              data-lpignore
              data-ktp-execute-target={keytipAttributes['data-ktp-execute-target']}
              {...inputProps}
            />
            <span className={classNames.arrowBox}>
              <IconButton
                styles={getArrowButtonStyles(theme!, true, customUpArrowButtonStyles)}
                className={'ms-UpButton'}
                checked={keyboardSpinDirection === KeyboardSpinDirection.up}
                disabled={disabled}
                iconProps={incrementButtonIcon}
                onMouseDown={onIncrementMouseDown}
                onMouseLeave={stop}
                onMouseUp={stop}
                tabIndex={-1}
                ariaLabel={incrementButtonAriaLabel}
                data-is-focusable={false}
                {...iconButtonProps}
              />
              <IconButton
                styles={getArrowButtonStyles(theme!, false, customDownArrowButtonStyles)}
                className={'ms-DownButton'}
                checked={keyboardSpinDirection === KeyboardSpinDirection.down}
                disabled={disabled}
                iconProps={decrementButtonIcon}
                onMouseDown={onDecrementMouseDown}
                onMouseLeave={stop}
                onMouseUp={stop}
                tabIndex={-1}
                ariaLabel={decrementButtonAriaLabel}
                data-is-focusable={false}
                {...iconButtonProps}
              />
            </span>
          </div>
        )}
      </KeytipData>
      {labelPosition === Position.bottom && (iconProps || label) && (
        <div className={classNames.labelWrapper}>
          {iconProps && <Icon iconName={iconProps.iconName} className={classNames.icon} aria-hidden="true" />}
          {label && (
            <Label id={labelId} htmlFor={inputId} className={classNames.label} disabled={disabled}>
              {label}
            </Label>
          )}
        </div>
      )}
    </div>
  );
};
