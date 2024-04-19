import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import {
  getPartitionedNativeProps,
  mergeCallbacks,
  useControllableState,
  useTimeout,
  slot,
} from '@fluentui/react-utilities';
import { ArrowUp, ArrowDown, End, Enter, Escape, Home, PageDown, PageUp } from '@fluentui/keyboard-keys';
import {
  SpinButtonProps,
  SpinButtonState,
  SpinButtonSpinState,
  SpinButtonChangeEvent,
  SpinButtonBounds,
} from './SpinButton.types';
import { calculatePrecision, precisionRound, getBound, clamp } from '../../utils/index';
import { ChevronUp16Regular, ChevronDown16Regular } from '@fluentui/react-icons';
import { useOverrides_unstable as useOverrides } from '@fluentui/react-shared-contexts';

type InternalState = {
  value: number | null;
  spinState: SpinButtonSpinState;
  spinTime: number;
  spinDelay: number;
  previousTextValue?: string;
  atBound: SpinButtonBounds;
};

const DEFAULT_SPIN_DELAY_MS = 150;
const MIN_SPIN_DELAY_MS = 80;
const MAX_SPIN_TIME_MS = 1000;

// This is here to give an ease for the mouse held down case.
// Exact easing it to be defined. Once it is we'll likely
// pull this out into a util function in the SpinButton package.
const lerp = (start: number, end: number, percent: number): number => start + (end - start) * percent;

/**
 * Create the state required to render SpinButton.
 *
 * The returned state can be modified with hooks such as useSpinButtonStyles_unstable,
 * before being passed to renderSpinButton_unstable.
 *
 * @param props - props from this instance of SpinButton
 * @param ref - reference to root HTMLElement of SpinButton
 */
export const useSpinButton_unstable = (props: SpinButtonProps, ref: React.Ref<HTMLInputElement>): SpinButtonState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['defaultValue', 'max', 'min', 'onChange', 'size', 'value'],
  });

  const overrides = useOverrides();

  const {
    value,
    displayValue,
    defaultValue,
    min,
    max,
    step = 1,
    stepPage = 1,
    precision: precisionFromProps,
    onChange,
    size = 'medium',
    appearance = overrides.inputDefaultAppearance ?? 'outline',
    root,
    input,
    incrementButton,
    decrementButton,
  } = props;

  const precision = React.useMemo(() => {
    return precisionFromProps ?? Math.max(calculatePrecision(step), 0);
  }, [precisionFromProps, step]);

  const [currentValue, setCurrentValue] = useControllableState({
    state: value,
    defaultState: defaultValue,
    initialState: 0,
  });

  const isControlled = value !== undefined;

  const [textValue, setTextValue] = React.useState<string | undefined>(undefined);
  const [keyboardSpinState, setKeyboardSpinState] = React.useState<SpinButtonSpinState>('rest');

  const internalState = React.useRef<InternalState>({
    value: currentValue,
    spinState: 'rest',
    spinTime: 0,
    spinDelay: DEFAULT_SPIN_DELAY_MS,
    atBound: currentValue !== null ? getBound(precisionRound(currentValue, precision), min, max) : 'none',
  });

  const [setStepTimeout, clearStepTimeout] = useTimeout();

  const stepValue = (
    e: SpinButtonChangeEvent,
    direction: 'up' | 'down' | 'upPage' | 'downPage',
    startFrom?: string,
  ) => {
    let startValue = internalState.current.value;
    if (startFrom) {
      const num = parseFloat(startFrom);
      if (!isNaN(num)) {
        startValue = num;
      }
    }
    const val = startValue;
    const dir = direction === 'up' || direction === 'upPage' ? 1 : -1;
    const stepSize = direction === 'upPage' || direction === 'downPage' ? stepPage : step;

    if (val === null) {
      const stepStart = min === undefined ? 0 : min;
      const nullStep = clamp(stepStart + stepSize * dir, min, max);
      commit(e, nullStep);
      return;
    }

    let newValue = val + stepSize * dir;
    if (!Number.isNaN(newValue)) {
      newValue = clamp(newValue, min, max);
    }

    commit(e, newValue);

    if (internalState.current.spinState !== 'rest') {
      setStepTimeout(() => {
        // Ease the step speed a bit
        internalState.current.spinTime += internalState.current.spinDelay;
        internalState.current.spinDelay = lerp(
          DEFAULT_SPIN_DELAY_MS,
          MIN_SPIN_DELAY_MS,
          internalState.current.spinTime / MAX_SPIN_TIME_MS,
        );
        stepValue(e, direction);
      }, internalState.current.spinDelay);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!internalState.current.previousTextValue) {
      internalState.current.previousTextValue = textValue ?? String(currentValue);
    }
    const newValue = e.target.value;
    setTextValue(newValue);
  };

  const handleIncrementMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    internalState.current.spinState = 'up';
    stepValue(e, 'up');
  };

  const handleDecrementMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    internalState.current.spinState = 'down';
    stepValue(e, 'down');
  };

  const handleStepMouseUpOrLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    clearStepTimeout();
    internalState.current.spinState = 'rest';
    internalState.current.spinDelay = DEFAULT_SPIN_DELAY_MS;
    internalState.current.spinTime = 0;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    commit(e, currentValue, textValue);
    internalState.current.previousTextValue = undefined;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let nextKeyboardSpinState: SpinButtonSpinState = 'rest';

    if (e.key === ArrowUp) {
      stepValue(e, 'up', textValue);
      nextKeyboardSpinState = 'up';
    } else if (e.key === ArrowDown) {
      stepValue(e, 'down', textValue);
      nextKeyboardSpinState = 'down';
    } else if (e.key === PageUp) {
      e.preventDefault();
      stepValue(e, 'upPage', textValue);
      nextKeyboardSpinState = 'up';
    } else if (e.key === PageDown) {
      e.preventDefault();
      stepValue(e, 'downPage', textValue);
      nextKeyboardSpinState = 'down';
    } else if (!e.shiftKey && e.key === Home && min !== undefined) {
      commit(e, min);
      nextKeyboardSpinState = 'down';
    } else if (!e.shiftKey && e.key === End && max !== undefined) {
      commit(e, max);
      nextKeyboardSpinState = 'up';
    } else if (e.key === Enter) {
      commit(e, currentValue, textValue);
      internalState.current.previousTextValue = undefined;
    } else if (e.key === Escape) {
      if (internalState.current.previousTextValue) {
        setTextValue(undefined);
        internalState.current.previousTextValue = undefined;
      }
    }

    if (keyboardSpinState !== nextKeyboardSpinState) {
      setKeyboardSpinState(nextKeyboardSpinState);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyboardSpinState !== 'rest') {
      setKeyboardSpinState('rest');
      internalState.current.spinState = 'rest';
    }
  };

  const commit = (e: SpinButtonChangeEvent, newValue?: number | null, newDisplayValue?: string) => {
    const valueChanged = newValue !== undefined && currentValue !== newValue;
    const displayValueChanged =
      newDisplayValue !== undefined &&
      internalState.current.previousTextValue !== undefined &&
      internalState.current.previousTextValue !== newDisplayValue;

    let roundedValue;
    if (valueChanged) {
      roundedValue = precisionRound(newValue!, precision);
      setCurrentValue(roundedValue);
    } else if (displayValueChanged && !isControlled) {
      const nextValue = parseFloat(newDisplayValue as string);
      if (!isNaN(nextValue)) {
        setCurrentValue(precisionRound(nextValue, precision));
      }
    }

    if (valueChanged || displayValueChanged) {
      onChange?.(e, { value: roundedValue, displayValue: newDisplayValue });
    }

    setTextValue(undefined);
  };

  let valueToDisplay;
  if (textValue !== undefined) {
    valueToDisplay = textValue;
  } else if (value === null || currentValue === null) {
    valueToDisplay = displayValue ?? '';
    internalState.current.value = null;
    internalState.current.atBound = 'none';
  } else {
    const roundedValue = precisionRound(currentValue, precision);
    internalState.current.value = roundedValue;
    internalState.current.atBound = getBound(roundedValue, min, max);
    if (isControlled) {
      valueToDisplay = displayValue ?? String(roundedValue);
    } else {
      valueToDisplay = String(roundedValue);
    }
  }

  const state: SpinButtonState = {
    size,
    appearance,
    spinState: keyboardSpinState,
    atBound: internalState.current.atBound,

    components: {
      root: 'span',
      input: 'input',
      incrementButton: 'button',
      decrementButton: 'button',
    },
    root: slot.always(root, {
      defaultProps: nativeProps.root,
      elementType: 'span',
    }),
    input: slot.always(input, {
      defaultProps: {
        ref,
        autoComplete: 'off',
        role: 'spinbutton',
        appearance,
        type: 'text',
        ...nativeProps.primary,
      },
      elementType: 'input',
    }),
    incrementButton: slot.always(incrementButton, {
      defaultProps: {
        tabIndex: -1,
        children: <ChevronUp16Regular />,
        disabled: nativeProps.primary.disabled,
        'aria-label': 'Increment value',
        type: 'button',
      },
      elementType: 'button',
    }),
    decrementButton: slot.always(decrementButton, {
      defaultProps: {
        tabIndex: -1,
        children: <ChevronDown16Regular />,
        disabled: nativeProps.primary.disabled,
        'aria-label': 'Decrement value',
        type: 'button',
      },
      elementType: 'button',
    }),
  };

  state.input.value = valueToDisplay;
  state.input['aria-valuemin'] = min;
  state.input['aria-valuemax'] = max;
  state.input['aria-valuenow'] = currentValue ?? undefined;
  state.input['aria-valuetext'] = state.input['aria-valuetext'] ?? ((value !== undefined && displayValue) || undefined);
  state.input.onChange = mergeCallbacks(state.input.onChange, handleInputChange);
  state.input.onBlur = mergeCallbacks(state.input.onBlur, handleBlur);
  state.input.onKeyDown = mergeCallbacks(state.input.onKeyDown, handleKeyDown);
  state.input.onKeyUp = mergeCallbacks(state.input.onKeyUp, handleKeyUp);

  state.incrementButton.onMouseDown = mergeCallbacks(handleIncrementMouseDown, state.incrementButton.onMouseDown);
  state.incrementButton.onMouseUp = mergeCallbacks(state.incrementButton.onMouseUp, handleStepMouseUpOrLeave);
  state.incrementButton.onMouseLeave = mergeCallbacks(state.incrementButton.onMouseLeave, handleStepMouseUpOrLeave);

  state.decrementButton.onMouseDown = mergeCallbacks(handleDecrementMouseDown, state.decrementButton.onMouseDown);
  state.decrementButton.onMouseUp = mergeCallbacks(state.decrementButton.onMouseUp, handleStepMouseUpOrLeave);
  state.decrementButton.onMouseLeave = mergeCallbacks(state.decrementButton.onMouseLeave, handleStepMouseUpOrLeave);

  return state;
};
