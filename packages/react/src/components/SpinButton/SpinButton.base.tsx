import * as React from 'react';
import { IconButton } from '../../Button';
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
import { KeyboardSpinDirection } from './SpinButton.types';
import { Position } from '../../Positioning';
import { useAsync, useControllableValue, useWarnings, useId, usePrevious } from '@fluentui/react-hooks';
import type { ISpinButtonProps, ISpinButtonStyleProps, ISpinButtonStyles } from './SpinButton.types';

interface ISpinButtonInternalState {
  spinningByMouse?: boolean;
  stepTimeoutHandle: number;
  /** Allows access to the latest `value` inside reused callbacks (to avoid stale capture issues) */
  latestValue: string | undefined;
  /** Allows access to the latest `intermediateValue` inside reused callbacks (to avoid stale capture issues) */
  latestIntermediateValue: string | undefined;
}

const getClassNames = classNamesFunction<ISpinButtonStyleProps, ISpinButtonStyles>();

const COMPONENT_NAME = 'SpinButton';
const DEFAULT_PROPS: Required<
  Pick<
    ISpinButtonProps,
    // These are explicitly specified so that only the things which actually have defaults
    // get marked as required in ISpinButtonPropsWithDefaults below
    'disabled' | 'label' | 'step' | 'labelPosition' | 'incrementButtonIcon' | 'decrementButtonIcon'
  >
> = {
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

const noOp = (): void => {
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

/** Clamp the value to the provided min and/or max */
const clampValue = (value: number, { min, max }: { max?: number; min?: number }) => {
  if (typeof max === 'number') {
    value = Math.min(value, max);
  }
  if (typeof min === 'number') {
    value = Math.max(value, min);
  }
  return value;
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
    onChange,
    styles,
  } = props;

  const input = React.useRef<HTMLInputElement>(null);
  const inputId = useId('input');
  const labelId = useId('Label');

  const [isFocused, setIsFocused] = React.useState(false);
  const [keyboardSpinDirection, setKeyboardSpinDirection] = React.useState(KeyboardSpinDirection.notSpinning);
  const async = useAsync();

  const precision = React.useMemo(() => {
    return precisionFromProps ?? Math.max(calculatePrecision(step), 0);
  }, [precisionFromProps, step]);

  /**
   * Actual current value. If `props.value` is provided (controlled), it will always be used.
   * If not (uncontrolled), this tracks the current value based on user modifications.
   * Note that while the user is editing text in the field, this will not be updated until "commit"
   * (blur or press enter).
   */
  const [value, setValue] = useControllableValue(valueFromProps, defaultValue ?? String(min || 0), onChange);
  /**
   * "Uncommitted" internal value while the user is editing text in the field. This lets us wait to
   * call `onChange` (and possibly update the real value) until the user "commits" the value by
   * pressing enter or blurring the field.
   */
  const [intermediateValue, setIntermediateValue] = React.useState<string>();

  const { current: internalState } = React.useRef<ISpinButtonInternalState>({
    stepTimeoutHandle: -1,
    latestValue: undefined,
    latestIntermediateValue: undefined,
  });
  // On each render, update this saved value used by callbacks. (This should be safe even if render
  // is called multiple times, because an event handler or timeout callback will only run once.)
  internalState.latestValue = value;
  internalState.latestIntermediateValue = intermediateValue;

  const previousValueFromProps = usePrevious(valueFromProps);
  React.useEffect(() => {
    // If props.value changes while editing, clear the intermediate value
    if (valueFromProps !== previousValueFromProps && intermediateValue !== undefined) {
      setIntermediateValue(undefined);
    }
  }, [valueFromProps, previousValueFromProps, intermediateValue]);

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
    'onChange',
  ]);

  /** Validate (commit) function called on blur or enter keypress. */
  const validate = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>): void => {
      // Only run validation if the value changed
      const enteredValue = internalState.latestIntermediateValue;
      if (enteredValue !== undefined && enteredValue !== internalState.latestValue) {
        let newValue: string | undefined;
        if (onValidate) {
          newValue = onValidate(enteredValue, ev) as string | undefined;
        } else if (enteredValue && enteredValue.trim().length && !isNaN(Number(enteredValue))) {
          // default validation handling
          newValue = String(clampValue(Number(enteredValue), { min, max }));
        }
        if (newValue !== undefined && newValue !== internalState.latestValue) {
          // Commit the value if it changed
          setValue(newValue, ev);
        }
      }

      // Done validating, so clear the intermediate typed value (if any)
      setIntermediateValue(undefined);
    },
    [internalState, max, min, onValidate, setValue],
  );

  /**
   * Stop spinning (clear any currently pending update and set spinning to false)
   */
  const stop = React.useCallback((): void => {
    if (internalState.stepTimeoutHandle >= 0) {
      async.clearTimeout(internalState.stepTimeoutHandle);
      internalState.stepTimeoutHandle = -1;
    }
    if (internalState.spinningByMouse || keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
      internalState.spinningByMouse = false;
      setKeyboardSpinDirection(KeyboardSpinDirection.notSpinning);
    }
  }, [internalState, keyboardSpinDirection, async]);

  /**
   * Update the value with the given stepFunction.
   * Also starts spinning for mousedown events by scheduling another update with setTimeout.
   * @param stepFunction - function to use to step by
   * @param event - The event that triggered the updateValue
   */
  const updateValue = React.useCallback(
    (
      stepFunction: Required<ISpinButtonProps>['onIncrement'],
      ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
    ): void => {
      ev.persist();

      if (internalState.latestIntermediateValue !== undefined) {
        // Edge case: if intermediateValue is set, this means that the user was editing the input
        // text and then started spinning (either with mouse or keyboard). We need to validate and
        // call onChange before starting to spin.
        if (ev.type === 'keydown' || ev.type === 'mousedown') {
          // For the arrow keys, we have to manually trigger validation.
          // (For the buttons, validation will happen automatically since the input's onBlur will
          // be triggered after mousedown on the button completes.)
          validate(ev);
        }
        async.requestAnimationFrame(() => {
          // After handling any value updates, do the spinning update
          updateValue(stepFunction, ev);
        });
        return;
      }

      // Call the step function and update the value.
      // (Note: we access the latest value via internalState (not directly) to ensure we don't use
      // a stale captured value. This is mainly important for spinning by mouse, where we trigger
      // additional calls to the original updateValue function via setTimeout. It also lets us
      // avoid useCallback deps on frequently changing values.)
      const newValue = stepFunction(internalState.latestValue || '', ev) as string | undefined;
      if (newValue !== undefined && newValue !== internalState.latestValue) {
        setValue(newValue, ev);
      }

      // Schedule the next spin if applicable
      // (will be canceled if there's a mouseup before the timeout runs)
      const wasSpinning = internalState.spinningByMouse;
      internalState.spinningByMouse = ev.type === 'mousedown';
      if (internalState.spinningByMouse) {
        internalState.stepTimeoutHandle = async.setTimeout(
          () => {
            updateValue(stepFunction, ev);
          },
          wasSpinning ? STEP_DELAY : INITIAL_STEP_DELAY, // the first step is slower
        );
      }
    },
    [internalState, async, validate, setValue],
  );

  /** Composed increment handler (uses `props.onIncrement` or default) */
  const handleIncrement = React.useCallback(
    (newValue: string): string | void => {
      if (onIncrement) {
        return onIncrement(newValue);
      } else {
        let numericValue = clampValue(Number(newValue) + Number(step), { max });
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
        let numericValue = clampValue(Number(newValue) - Number(step), { min });
        numericValue = precisionRound(numericValue, precision);
        return String(numericValue);
      }
    },
    [precision, min, onDecrement, step],
  );

  /** Handles when the user types in the input */
  const handleInputChange = (ev: React.FormEvent<HTMLInputElement>): void => {
    setIntermediateValue((ev.target as HTMLInputElement).value);
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
    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.up || ev.which === KeyCodes.down || ev.which === KeyCodes.enter) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (disabled) {
      stop();
      return;
    }

    let spinDirection = KeyboardSpinDirection.notSpinning;

    // eslint-disable-next-line deprecation/deprecation
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
        // Commit the edited value
        validate(ev);
        break;
      case KeyCodes.escape:
        // Revert to previous value
        setIntermediateValue(undefined);
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
      // eslint-disable-next-line deprecation/deprecation
      if (disabled || ev.which === KeyCodes.up || ev.which === KeyCodes.down) {
        stop();
        return;
      }
    },
    [disabled, stop],
  );

  const handleIncrementMouseDown = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>): void => {
      updateValue(handleIncrement, ev);
    },
    [handleIncrement, updateValue],
  );

  const handleDecrementMouseDown = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>): void => {
      updateValue(handleDecrement, ev);
    },
    [handleDecrement, updateValue],
  );

  useComponentRef(props, input, value);
  useDebugWarnings(props);

  const valueIsNumber = !!value && !isNaN(Number(value)); // Number('') is 0 which may not be desirable

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
          // Display intermediateValue while editing the text (before commit)
          value={intermediateValue ?? value}
          id={inputId}
          onChange={noOp}
          onInput={handleInputChange}
          className={classNames.input}
          type="text"
          autoComplete="off"
          role="spinbutton"
          aria-labelledby={label && labelId}
          // TODO: test what happens while editing
          aria-valuenow={ariaValueNow ?? (valueIsNumber ? Number(value) : undefined)}
          aria-valuetext={ariaValueText ?? (valueIsNumber ? undefined : value)}
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
