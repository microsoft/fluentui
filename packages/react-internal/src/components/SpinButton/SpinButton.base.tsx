import * as React from 'react';
import { IconButton } from '../../compat/Button';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import {
  KeyCodes,
  calculatePrecision,
  classNamesFunction,
  precisionRound,
  getNativeProps,
  getPropsWithDefaults,
  divProperties,
} from '../../Utilities';
import { getArrowButtonStyles } from './SpinButton.styles';
import { ISpinButtonProps, ISpinButtonStyleProps, ISpinButtonStyles, KeyboardSpinDirection } from './SpinButton.types';
import { Position } from '../../Positioning';
import { useSetTimeout, useControllableValue, useWarnings, useId } from '@fluentui/react-hooks';

interface ISpinButtonInternalState {
  lastValidValue?: string;
  spinningByMouse: boolean;
  valueToValidate?: string;
  currentStepFunctionHandle: number;
  initialStepDelay: number;
  stepDelay: number;
}

const getClassNames = classNamesFunction<ISpinButtonStyleProps, ISpinButtonStyles>();

const COMPONENT_NAME = 'SpinButton';
const DEFAULT_PROPS = {
  disabled: false,
  label: '',
  min: 0,
  max: 100,
  step: 1,
  labelPosition: Position.start,
  incrementButtonIcon: { iconName: 'ChevronUpSmall' },
  decrementButtonIcon: { iconName: 'ChevronDownSmall' },
};
type ISpinButtonPropsWithDefaults = ISpinButtonProps & Required<Pick<ISpinButtonProps, keyof typeof DEFAULT_PROPS>>;

const useComponentRef = (
  props: ISpinButtonProps,
  input: React.RefObject<HTMLDivElement>,
  value: string | undefined,
) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get value() {
        return value;
      },
      focus() {
        if (input.current) {
          input.current.focus();
        }
      },
    }),
    [input, value],
  );
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

export const SpinButtonBase: React.FunctionComponent<ISpinButtonProps> = React.forwardRef<
  HTMLDivElement,
  ISpinButtonProps
>((propsWithoutDefaults, ref) => {
  const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults) as ISpinButtonPropsWithDefaults;
  const {
    disabled,
    label,
    min,
    max,
    step,
    defaultValue,
    value: valueFromProps,
    precision: precisionFromProps,
    labelPosition,
    iconProps,
    incrementButtonIcon,
    incrementButtonAriaLabel,
    decrementButtonIcon,
    decrementButtonAriaLabel,
    ariaLabel,
    ariaDescribedBy,
    upArrowButtonStyles: customUpArrowButtonStyles,
    downArrowButtonStyles: customDownArrowButtonStyles,
    theme,
    ariaPositionInSet,
    ariaSetSize,
    ariaValueNow,
    ariaValueText,
    className,
    inputProps,
    onDecrement,
    onIncrement,
    iconButtonProps,
    onValidate,
    styles,
  } = props;

  const input = React.useRef<HTMLInputElement>(null);
  const inputId = useId('input');
  const labelId = useId('Label');

  const [isFocused, setIsFocused] = React.useState(false);
  const [keyboardSpinDirection, setKeyboardSpinDirection] = React.useState(KeyboardSpinDirection.notSpinning);
  const { setTimeout, clearTimeout } = useSetTimeout();

  const [value, setValue] = useControllableValue(valueFromProps, defaultValue ?? String(min));

  const { current: internalState } = React.useRef<ISpinButtonInternalState>({
    lastValidValue: value,
    spinningByMouse: false,
    currentStepFunctionHandle: -1,
    initialStepDelay: 400,
    stepDelay: 75,
  });

  if (typeof valueFromProps === 'string') {
    // Ensure that we respect updates to props.value when determining the last valid value
    internalState.lastValidValue = valueFromProps;
  }

  const precision = React.useMemo(() => {
    return precisionFromProps ?? Math.max(calculatePrecision(step), 0);
  }, [precisionFromProps, step]);

  const classNames = getClassNames(styles, {
    theme: theme!,
    disabled,
    isFocused,
    keyboardSpinDirection,
    labelPosition,
    className,
  });

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, [
    'onBlur',
    'onFocus',
    'className',
  ]);

  /** Composed validation handler (uses `props.onValidate` or default) */
  const handleValidate = (newValue: string, ev: React.SyntheticEvent<HTMLInputElement>) => {
    if (onValidate) {
      return onValidate(newValue, ev);
    }
    if (!newValue || newValue.trim().length === 0 || isNaN(Number(newValue))) {
      return internalState.lastValidValue;
    }
    return String(Math.min(max, Math.max(min, Number(newValue))));
  };

  /** Validate function called on blur or enter keypress. */

  const validate = (ev: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>): void => {
    if (
      value !== undefined &&
      internalState.valueToValidate !== undefined &&
      internalState.valueToValidate !== internalState.lastValidValue
    ) {
      const newValue = handleValidate(internalState.valueToValidate, ev);

      // Done validating this value, so clear it
      internalState.valueToValidate = undefined;
      if (newValue !== undefined) {
        internalState.lastValidValue = newValue;
        setValue(newValue);
      } else {
        // Value was invalid. Reset state to last valid value.
        setValue(internalState.lastValidValue);
      }
    }
  };

  /**
   * Stop spinning (clear any currently pending update and set spinning to false)
   */
  const stop = React.useCallback((): void => {
    if (internalState.currentStepFunctionHandle >= 0) {
      clearTimeout(internalState.currentStepFunctionHandle);
      internalState.currentStepFunctionHandle = -1;
    }
    if (internalState.spinningByMouse || keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
      internalState.spinningByMouse = false;
      setKeyboardSpinDirection(KeyboardSpinDirection.notSpinning);
    }
  }, [internalState, keyboardSpinDirection, clearTimeout]);

  /**
   * Update the value with the given stepFunction
   * @param shouldSpin - should we fire off another updateValue when we are done here? This should be true
   * when spinning in response to a mouseDown
   * @param stepFunction - function to use to step by
   * @param event - The event that triggered the updateValue
   */
  const updateValue = React.useCallback(
    (
      shouldSpin: boolean,
      stepDelay: number,
      stepFunction: (
        value: string,
        event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      ) => string | void,
      ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ): void => {
      const newValue: string | void = stepFunction(value || '', ev);
      if (newValue !== undefined) {
        internalState.lastValidValue = newValue;
        setValue(newValue);
      }

      if (internalState.spinningByMouse !== shouldSpin) {
        internalState.spinningByMouse = shouldSpin;
      }

      if (shouldSpin) {
        internalState.currentStepFunctionHandle = setTimeout(() => {
          updateValue(shouldSpin, internalState.stepDelay, stepFunction, ev);
        }, stepDelay);
      }
    },
    [internalState, setValue, setTimeout, value],
  );

  /** Composed increment handler (uses `props.onIncrement` or default) */
  const handleIncrement = React.useCallback(
    (newValue: string): string | void => {
      if (onIncrement) {
        return onIncrement(newValue);
      } else {
        let numericValue: number = Math.min(Number(newValue) + Number(step), max);
        numericValue = precisionRound(numericValue, precision);
        return String(numericValue);
      }
    },
    [precision, max, onIncrement, step],
  );

  /** Composed decrement handler (uses `props.onDecrement` or default) */
  const handleDecrement = React.useCallback(
    (newValue: string): string | void => {
      if (onDecrement) {
        return onDecrement(newValue);
      } else {
        let numericValue: number = Math.max(Number(newValue) - Number(step), min);
        numericValue = precisionRound(numericValue, precision);
        return String(numericValue);
      }
    },
    [precision, min, onDecrement, step],
  );

  /** Handles when the user types in the input */
  const handleInputChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const element: HTMLInputElement = ev.target as HTMLInputElement;
    const elementValue: string = element.value;
    internalState.valueToValidate = elementValue;
    setValue(elementValue);
  };

  /** Composed focus handler (does internal stuff and calls `props.onFocus`) */
  const handleFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
    // We can't set focus on a non-existing element
    if (!input.current) {
      return;
    }
    if (internalState.spinningByMouse || keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
      stop();
    }
    input.current.select();
    setIsFocused(true);
    props.onFocus?.(ev);
  };

  /** Composed blur handler (does internal stuff and calls `props.onBlur`) */
  const handleBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
    validate(ev);
    setIsFocused(false);
    props.onBlur?.(ev);
  };

  /** Update value when arrow keys are pressed, commit on enter, or revert on escape */
  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>): void => {
    // eat the up and down arrow keys to keep focus in the spinButton
    // (especially when a spinButton is inside of a FocusZone)
    if (ev.which === KeyCodes.up || ev.which === KeyCodes.down || ev.which === KeyCodes.enter) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (disabled) {
      stop();
      return;
    }

    let spinDirection = KeyboardSpinDirection.notSpinning;

    switch (ev.which) {
      case KeyCodes.up:
        spinDirection = KeyboardSpinDirection.up;
        updateValue(false /* shouldSpin */, internalState.initialStepDelay, handleIncrement, ev);
        break;
      case KeyCodes.down:
        spinDirection = KeyboardSpinDirection.down;
        updateValue(false /* shouldSpin */, internalState.initialStepDelay, handleDecrement, ev);
        break;
      case KeyCodes.enter:
        validate(ev);
        break;
      case KeyCodes.escape:
        setValue(internalState.lastValidValue);
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

  /** Stop spinning on keyUp if the up or down arrow key fired this event */
  const handleKeyUp = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (disabled || ev.which === KeyCodes.up || ev.which === KeyCodes.down) {
        stop();
        return;
      }
    },
    [disabled, stop],
  );

  const handleIncrementMouseDown = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>): void => {
      updateValue(true /* shouldSpin */, internalState.initialStepDelay, handleIncrement, ev);
    },
    [internalState, handleIncrement, updateValue],
  );

  const handleDecrementMouseDown = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>): void => {
      updateValue(true /* shouldSpin */, internalState.initialStepDelay, handleDecrement, ev);
    },
    [internalState, handleDecrement, updateValue],
  );

  useComponentRef(props, input, value);
  useDebugWarnings(props);

  return (
    <div className={classNames.root} ref={ref}>
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
      <div
        {...nativeProps}
        className={classNames.spinButtonWrapper}
        aria-label={ariaLabel && ariaLabel}
        aria-posinset={ariaPositionInSet}
        aria-setsize={ariaSetSize}
        data-ktp-target={true}
      >
        <input
          value={value}
          id={inputId}
          onChange={onChange}
          onInput={handleInputChange}
          className={classNames.input}
          type="text"
          autoComplete="off"
          role="spinbutton"
          aria-labelledby={label && labelId}
          aria-valuenow={
            typeof ariaValueNow === 'number'
              ? ariaValueNow
              : value && !isNaN(Number(value)) // Number('') is 0 which may not be desirable
              ? Number(value)
              : undefined
          }
          aria-valuetext={ariaValueText ? ariaValueText : !value || isNaN(Number(value)) ? value : undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-describedby={ariaDescribedBy}
          onBlur={handleBlur}
          ref={input}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          disabled={disabled}
          aria-disabled={disabled}
          data-lpignore
          data-ktp-execute-target={true}
          {...inputProps}
        />
        <span className={classNames.arrowButtonsContainer}>
          <IconButton
            styles={getArrowButtonStyles(theme!, true, customUpArrowButtonStyles)}
            className={'ms-UpButton'}
            checked={keyboardSpinDirection === KeyboardSpinDirection.up}
            disabled={disabled}
            iconProps={incrementButtonIcon}
            onMouseDown={handleIncrementMouseDown}
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
            onMouseDown={handleDecrementMouseDown}
            onMouseLeave={stop}
            onMouseUp={stop}
            tabIndex={-1}
            ariaLabel={decrementButtonAriaLabel}
            data-is-focusable={false}
            {...iconButtonProps}
          />
        </span>
      </div>
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
});
SpinButtonBase.displayName = COMPONENT_NAME;

const useDebugWarnings = (props: ISpinButtonProps) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: COMPONENT_NAME,
      props,
      mutuallyExclusive: { value: 'defaultValue' },
    });
  }
};
