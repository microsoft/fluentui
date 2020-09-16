import * as React from 'react';
import { IconButton } from '../../compat/Button';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import {
  KeyCodes,
  calculatePrecision,
  classNamesFunction,
  precisionRound,
  mergeAriaAttributeValues,
  getNativeProps,
  divProperties,
} from '../../Utilities';
import { getArrowButtonStyles } from './SpinButton.styles';
import { ISpinButtonProps, ISpinButtonStyleProps, ISpinButtonStyles, KeyboardSpinDirection } from './SpinButton.types';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import { KeytipData } from '../../KeytipData';
import { useBoolean, useSetTimeout, useControllableValue, useWarnings } from '@uifabric/react-hooks';
import { useId } from '@uifabric/react-hooks';
interface ISpinButtonInternalState {
  lastValidValue: string;
  spinningByMouse: boolean;
  valueToValidate: string | undefined;
  precision: number;
  currentStepFunctionHandle: number;
  initialStepDelay: number;
  stepDelay: number;
}

const getClassNames = classNamesFunction<ISpinButtonStyleProps, ISpinButtonStyles>();

const COMPONENT_NAME = 'SpinButton';

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

export const SpinButtonBase: React.FunctionComponent<ISpinButtonProps> = React.forwardRef<
  HTMLDivElement,
  ISpinButtonProps
>((props, ref) => {
  const input = React.useRef<HTMLInputElement>(null);
  const inputId = useId('input');
  const labelId = useId('Label');

  const {
    disabled = false,
    label = '',
    min = 0,
    max = 100,
    step = 1,
    defaultValue,
    labelPosition = Position.start,
    iconProps,
    incrementButtonIcon = { iconName: 'ChevronUpSmall' },
    incrementButtonAriaLabel,
    decrementButtonIcon = { iconName: 'ChevronDownSmall' },
    decrementButtonAriaLabel,
    ariaLabel,
    ariaDescribedBy,
    upArrowButtonStyles: customUpArrowButtonStyles,
    downArrowButtonStyles: customDownArrowButtonStyles,
    theme,
    value,
    ariaPositionInSet,
    ariaSetSize,
    ariaValueNow,
    ariaValueText,
    keytipProps,
    className,
    inputProps,
    onDecrement,
    onIncrement,
    iconButtonProps,
    onValidate,
    onFocus,
    onBlur,
    styles,
  } = props as ISpinButtonProps;

  const [isFocused, { setTrue: setTrueIsFocused, setFalse: setFalseIsFocused }] = useBoolean(false);
  const [keyboardSpinDirection, setKeyboardSpinDirection] = React.useState(KeyboardSpinDirection.notSpinning);
  const { setTimeout, clearTimeout } = useSetTimeout();
  const [spinButtonValue, setSpinButtonValue] = useControllableValue(
    value,
    defaultValue !== undefined ? defaultValue : String(min || '0'),
  );

  const callCalculatePrecision = (calculatePrecisionProps: ISpinButtonProps) => {
    const { precision = Math.max(calculatePrecision(calculatePrecisionProps.step!), 0) } = calculatePrecisionProps;
    return precision;
  };

  let { value: initialValue = defaultValue } = props;

  if (initialValue === undefined) {
    initialValue = typeof min === 'number' ? String(min) : '0';
  }

  const { current: internalState } = React.useRef<ISpinButtonInternalState>({
    lastValidValue: initialValue,
    spinningByMouse: false,
    valueToValidate: undefined,
    precision: callCalculatePrecision(props as ISpinButtonProps),
    currentStepFunctionHandle: -1,
    initialStepDelay: 400,
    stepDelay: 75,
  });

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

  if (value !== undefined) {
    internalState.lastValidValue = value;
  }

  const handleValidate = (valueProp: string, ev?: React.SyntheticEvent<HTMLElement>): string | void => {
    if (onValidate) {
      return onValidate(valueProp, ev);
    } else {
      return defaultOnValidate(valueProp);
    }
  };

  /**
   * The default validate function to use if it is not provided.
   */
  const defaultOnValidate = (valueProp: string) => {
    if (valueProp === null || valueProp.trim().length === 0 || isNaN(Number(valueProp))) {
      return internalState.lastValidValue;
    }
    const newValue = Math.min(max as number, Math.max(min as number, Number(valueProp)));
    return String(newValue);
  };

  const validate = (ev: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>): void => {
    if (
      spinButtonValue !== undefined &&
      internalState.valueToValidate !== undefined &&
      internalState.valueToValidate !== internalState.lastValidValue
    ) {
      const newValue = handleValidate!(internalState.valueToValidate, ev);
      // Done validating this value, so clear it
      internalState.valueToValidate = undefined;
      if (newValue !== undefined) {
        internalState.lastValidValue = newValue;
        setSpinButtonValue(newValue);
      } else {
        // Value was invalid. Reset state to last valid value.
        setSpinButtonValue(internalState.lastValidValue);
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
   *  @param shouldSpin - should we fire off another updateValue when we are done here? This should be true
   * when spinning in response to a mouseDown.
   * @param stepFunction - function to use to step by.
   */
  const updateValue = React.useCallback(
    (shouldSpin: boolean, stepDelay: number, stepFunction: (value: string) => string | void): void => {
      const newValue: string | void = stepFunction(spinButtonValue || '');
      if (newValue !== undefined) {
        setSpinButtonValue(newValue);
      }

      if (internalState.spinningByMouse !== shouldSpin) {
        internalState.spinningByMouse = shouldSpin;
      }

      if (shouldSpin) {
        internalState.currentStepFunctionHandle = setTimeout(() => {
          updateValue(shouldSpin, internalState.stepDelay, stepFunction);
        }, stepDelay);
      }
    },
    [internalState, setSpinButtonValue, setTimeout, spinButtonValue],
  );

  const handleIncrement = React.useCallback(
    (valueProp: string): string | void => {
      if (onIncrement) {
        return onIncrement(valueProp);
      } else {
        let newValue: number = Math.min(Number(valueProp) + Number(step), max);
        newValue = precisionRound(newValue, internalState.precision);
        return String(newValue);
      }
    },
    [internalState, max, onIncrement, step],
  );

  const handleDecrement = React.useCallback(
    (valueProp: string): string | void => {
      if (onDecrement) {
        return onDecrement(valueProp);
      } else {
        let newValue: number = Math.max(Number(valueProp) - Number(step), min);
        newValue = precisionRound(newValue, internalState.precision);
        return String(newValue);
      }
    },
    [internalState, min, onDecrement, step],
  );

  //  The method is needed to ensure we are updating the actual input value.
  //  without this our value will never change (and validation will not have the correct number)
  const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const elementValue: string = element.value;
    internalState.valueToValidate = elementValue;
    setSpinButtonValue(elementValue);
  };

  const handleFocus = React.useCallback(
    (ev: React.FocusEvent<HTMLInputElement>): void => {
      // We can't set focus on a non-existing element
      if (!input.current) {
        return;
      }
      if (internalState.spinningByMouse || keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
        stop();
      }
      input.current.select();
      setTrueIsFocused();
      onFocus?.(ev);
    },
    [internalState.spinningByMouse, keyboardSpinDirection, onFocus, setTrueIsFocused, stop],
  );

  const handleBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
    validate(ev);
    setFalseIsFocused();
    onBlur?.(ev);
  };

  const handleChange = React.useCallback((): void => {
    /**
     * A noop input change handler. Using onInput instead of onChange was meant to address an issue
     * which apparently has been resolved in React 16 (https://github.com/facebook/react/issues/7027).
     * The no-op onChange handler was still needed because React gives console errors if an input
     * doesn't have onChange.
     *
     * TODO (Fabric 8?) - switch to just calling onChange (this is a breaking change for any tests,
     * ours or 3rd-party, which simulate entering text in a SpinButton)
     */
  }, []);

  //  Handle keydown on the text field. We need to update
  //  the value when up or down arrow are depressed
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
        updateValue(false /* shouldSpin */, internalState.initialStepDelay, handleIncrement!);
        break;
      case KeyCodes.down:
        spinDirection = KeyboardSpinDirection.down;
        updateValue(false /* shouldSpin */, internalState.initialStepDelay, handleDecrement!);
        break;
      case KeyCodes.enter:
        validate(ev);
        break;
      case KeyCodes.escape:
        if (spinButtonValue !== internalState.lastValidValue) {
          setSpinButtonValue(internalState.lastValidValue);
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

  // Make sure that we have stopped spinning on keyUp
  // if the up or down arrow fired this event
  const handleKeyUp = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (disabled || ev.which === KeyCodes.up || ev.which === KeyCodes.down) {
        stop();
        return;
      }
    },
    [disabled, stop],
  );

  const handleIncrementMouseDown = React.useCallback((): void => {
    updateValue(true /* shouldSpin */, internalState.initialStepDelay, handleIncrement!);
  }, [handleIncrement, internalState, updateValue]);

  const handleDecrementMouseDown = React.useCallback((): void => {
    updateValue(true /* shouldSpin */, internalState.initialStepDelay, handleDecrement!);
  }, [handleDecrement, internalState, updateValue]);

  useComponentRef(props, input, spinButtonValue);
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
      <KeytipData keytipProps={keytipProps} disabled={disabled}>
        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        (keytipAttributes: any): JSX.Element => (
          <div
            {...nativeProps}
            className={classNames.spinButtonWrapper}
            aria-label={ariaLabel && ariaLabel}
            aria-posinset={ariaPositionInSet}
            aria-setsize={ariaSetSize}
            data-ktp-target={keytipAttributes['data-ktp-target']}
          >
            <input
              value={spinButtonValue}
              id={inputId}
              onChange={handleChange}
              onInput={handleInputChange}
              className={classNames.input}
              type="text"
              autoComplete="off"
              role="spinbutton"
              aria-labelledby={label && labelId}
              aria-valuenow={
                typeof ariaValueNow === 'number'
                  ? ariaValueNow
                  : spinButtonValue && !isNaN(Number(spinButtonValue)) // Number('') is 0 which may not be desirable
                  ? Number(spinButtonValue)
                  : undefined
              }
              aria-valuetext={
                ariaValueText
                  ? ariaValueText
                  : !spinButtonValue || isNaN(Number(spinButtonValue))
                  ? spinButtonValue
                  : undefined
              }
              aria-valuemin={min}
              aria-valuemax={max}
              aria-describedby={mergeAriaAttributeValues(ariaDescribedBy, keytipAttributes['aria-describedby'])}
              onBlur={handleBlur}
              ref={input}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              disabled={disabled}
              aria-disabled={disabled}
              data-lpignore
              data-ktp-execute-target={keytipAttributes['data-ktp-execute-target']}
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
});
SpinButtonBase.displayName = COMPONENT_NAME;

function useDebugWarnings(props: ISpinButtonProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: COMPONENT_NAME,
      props,
      mutuallyExclusive: { value: 'defaultValue' },
    });
  }
}
