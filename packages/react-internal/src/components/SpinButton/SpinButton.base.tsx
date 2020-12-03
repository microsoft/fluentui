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
  spinningByMouse?: boolean;
  valueToValidate?: string;
  stepTimeoutHandle: number;
}

const getClassNames = classNamesFunction<ISpinButtonStyleProps, ISpinButtonStyles>();

const COMPONENT_NAME = 'SpinButton';
const DEFAULT_PROPS: Required<Pick<
  ISpinButtonProps,
  // These are explicitly specified so that the only the things which actually have defaults
  // get marked as required in ISpinButtonPropsWithDefaults below
  'disabled' | 'label' | 'step' | 'labelPosition' | 'incrementButtonIcon' | 'decrementButtonIcon'
>> = {
  disabled: false,
  label: '',
  step: 1,
  labelPosition: Position.start,
  incrementButtonIcon: { iconName: 'ChevronUpSmall' },
  decrementButtonIcon: { iconName: 'ChevronDownSmall' },
};
type ISpinButtonPropsWithDefaults = ISpinButtonProps & typeof DEFAULT_PROPS;

const INITIAL_STEP_DELAY = 400;
const STEP_DELAY = 75;

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

  const [value, setValue] = useControllableValue(valueFromProps, defaultValue ?? String(min || 0));

  const { current: internalState } = React.useRef<ISpinButtonInternalState>({
    lastValidValue: value,
    stepTimeoutHandle: -1,
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
    // default validation handling
    let newNumber = Number(newValue);
    if (newValue && newValue.trim().length && !isNaN(newNumber)) {
      if (typeof min === 'number') {
        newNumber = Math.max(min, newNumber);
      }
      if (typeof max === 'number') {
        newNumber = Math.min(max, newNumber);
      }
      return String(newNumber);
    }
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
    if (internalState.stepTimeoutHandle >= 0) {
      clearTimeout(internalState.stepTimeoutHandle);
      internalState.stepTimeoutHandle = -1;
    }
    if (internalState.spinningByMouse || keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
      internalState.spinningByMouse = false;
      setKeyboardSpinDirection(KeyboardSpinDirection.notSpinning);
    }
  }, [internalState, keyboardSpinDirection, clearTimeout]);

  /**
   * Update the value with the given stepFunction
   * @param stepFunction - function to use to step by
   * @param event - The event that triggered the updateValue
   * @param shouldSpin - should we fire off another updateValue when we are done here? This should be true
   * when spinning in response to a mousedown. It doesn't need to be true for keyboard spinning since
   * holding the key will automatically fire more keydown events.
   */
  const updateValue = React.useCallback(
    (
      stepFunction: (
        value: string,
        event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      ) => string | void,
      ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      shouldSpin: boolean = false,
    ): void => {
      setValue(prevValue => {
        // For spinning by mouse, where additional updateValue calls are triggered via setTimeout,
        // we must access the current value in an updater callback (rather than referencing `value`
        // directly) because otherwise we'd be reusing the stale captured value from the first call
        // and spinning wouldn't work. (The other possible approach here is storing the value in
        // internalState while spinning, then setting the actual state when spinning stops.)
        const newValue = stepFunction(prevValue || '', ev);
        if (newValue !== undefined) {
          internalState.lastValidValue = newValue;
          return newValue;
        }
        return prevValue;
      });

      const wasSpinning = internalState.spinningByMouse;
      internalState.spinningByMouse = shouldSpin;

      if (shouldSpin) {
        internalState.stepTimeoutHandle = setTimeout(
          () => {
            updateValue(stepFunction, ev, true);
          },
          wasSpinning ? STEP_DELAY : INITIAL_STEP_DELAY,
        );
      }
    },
    [internalState, setValue, setTimeout],
  );

  /** Composed increment handler (uses `props.onIncrement` or default) */
  const handleIncrement = React.useCallback(
    (newValue: string): string | void => {
      if (onIncrement) {
        return onIncrement(newValue);
      } else {
        let numericValue = Number(newValue) + Number(step);
        if (typeof max === 'number') {
          numericValue = Math.min(numericValue, max);
        }
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
        let numericValue = Number(newValue) - Number(step);
        if (typeof min === 'number') {
          numericValue = Math.max(numericValue, min);
        }
        numericValue = precisionRound(numericValue, precision);
        return String(numericValue);
      }
    },
    [precision, min, onDecrement, step],
  );

  /** Handles when the user types in the input */
  const handleInputChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const elementValue = (ev.target as HTMLInputElement).value;
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
        updateValue(handleIncrement, ev);
        break;
      case KeyCodes.down:
        spinDirection = KeyboardSpinDirection.down;
        updateValue(handleDecrement, ev);
        break;
      case KeyCodes.enter:
        validate(ev);
        break;
      case KeyCodes.escape:
        setValue(internalState.lastValidValue);
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
      updateValue(handleIncrement, ev, true /* shouldSpin */);
    },
    [handleIncrement, updateValue],
  );

  const handleDecrementMouseDown = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>): void => {
      updateValue(handleDecrement, ev, true /* shouldSpin */);
    },
    [handleDecrement, updateValue],
  );

  useComponentRef(props, input, value);
  useDebugWarnings(props);

  const labelContent = (iconProps || label) && (
    <div className={classNames.labelWrapper}>
      {iconProps && <Icon {...iconProps} className={classNames.icon} aria-hidden="true" />}
      {label && (
        <Label id={labelId} htmlFor={inputId} className={classNames.label} disabled={disabled}>
          {label}
        </Label>
      )}
    </div>
  );

  return (
    <div className={classNames.root} ref={ref}>
      {labelPosition !== Position.bottom && labelContent}
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
      {labelPosition === Position.bottom && labelContent}
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
