import * as React from 'react';
import {
  getPartitionedNativeProps,
  resolveShorthand,
  useControllableState,
  useMergedEventCallbacks,
  useTimeout,
} from '@fluentui/react-utilities';
import * as Keys from '@fluentui/keyboard-keys';
import {
  SpinButtonProps,
  SpinButtonState,
  SpinButtonSpinState,
  SpinButtonChangeEvent,
  SpinButtonBounds,
} from './SpinButton.types';
import { calculatePrecision, precisionRound, getBound, clampWhenInRange } from '../../utils/index';
import { ChevronUp16Regular, ChevronDown16Regular } from '@fluentui/react-icons';

type InternalState = {
  value: number;
  spinState: SpinButtonSpinState;
  spinTime: number;
  spinDelay: number;
  previousTextValue?: string;
};

const DEFAULT_SPIN_DELAY_MS = 150;
const MIN_SPIN_DELAY_MS = 80;
const MAX_SPIN_TIME_MS = 1000;

// This is here to give an ease the mouse held down case.
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
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange', 'size'],
  });

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
    appearance = 'outline',
    root,
    input,
    incrementButton,
    decrementButton,
    inputType = 'all',
  } = props;

  const precision = React.useMemo(() => {
    return precisionFromProps ?? Math.max(calculatePrecision(step), 0);
  }, [precisionFromProps, step]);

  const [currentValue, setCurrentValue] = useControllableState({
    state: value,
    defaultState: defaultValue,
    initialState: 0,
  });
  const [textValue, setTextValue] = React.useState(
    value !== undefined && displayValue !== undefined ? displayValue : String(currentValue),
  );
  const [spinState, setSpinState] = React.useState<SpinButtonSpinState>('rest');
  const [atBound, setAtBound] = React.useState<SpinButtonBounds>('none');

  const internalState = React.useRef<InternalState>({
    value: currentValue,
    spinState,
    spinTime: 0,
    spinDelay: DEFAULT_SPIN_DELAY_MS,
  });

  const state: SpinButtonState = {
    size,
    appearance,
    spinState,
    atBound,

    components: {
      root: 'span',
      input: 'input',
      incrementButton: 'button',
      decrementButton: 'button',
    },
    root: resolveShorthand(root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
    input: resolveShorthand(input, {
      required: true,
      defaultProps: {
        ref,
        autoComplete: 'off',
        role: 'spinbutton',
        appearance: appearance,
        ...nativeProps.primary,
      },
    }),
    incrementButton: resolveShorthand(incrementButton, {
      required: true,
      defaultProps: {
        tabIndex: -1,
        children: <ChevronUp16Regular />,
        disabled: nativeProps.primary.disabled,
      },
    }),
    decrementButton: resolveShorthand(decrementButton, {
      required: true,
      defaultProps: {
        tabIndex: -1,
        children: <ChevronDown16Regular />,
        disabled: nativeProps.primary.disabled,
      },
    }),
  };

  const [setStepTimeout, clearStepTimeout] = useTimeout();

  React.useEffect(() => {
    let newTextValue;
    if (value !== undefined) {
      const roundedValue = precisionRound(value, precision);
      newTextValue = displayValue ?? String(roundedValue);
      internalState.current.value = roundedValue;
      setAtBound(getBound(roundedValue, min, max));
    } else {
      newTextValue = String(precisionRound(currentValue, precision));
      internalState.current.value = currentValue;
    }
    setTextValue(newTextValue);
  }, [value, displayValue, currentValue, precision, setAtBound, min, max]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputType === 'spinners-only') {
      return;
    }

    if (!internalState.current.previousTextValue) {
      internalState.current.previousTextValue = textValue;
    }

    const newValue = e.target.value;
    setTextValue(newValue);
  };

  const stepValue = (e: SpinButtonChangeEvent, direction: 'up' | 'down' | 'upPage' | 'downPage') => {
    const dir = direction === 'up' || direction === 'upPage' ? 1 : -1;
    const stepSize = direction === 'upPage' || direction === 'downPage' ? stepPage : step;
    const val = internalState.current.value;

    let newValue = val + stepSize * dir;
    if (!Number.isNaN(newValue)) {
      newValue = clampWhenInRange(val, newValue, min, max);
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
    if (e.key === Keys.ArrowUp) {
      stepValue(e, 'up');
      setSpinState('up');
    } else if (e.key === Keys.ArrowDown) {
      stepValue(e, 'down');
      setSpinState('down');
    } else if (e.key === Keys.PageUp) {
      e.preventDefault();
      stepValue(e, 'upPage');
      setSpinState('up');
    } else if (e.key === Keys.PageDown) {
      e.preventDefault();
      stepValue(e, 'downPage');
      setSpinState('down');
    } else if (!e.shiftKey && e.key === Keys.Home && min !== undefined) {
      commit(e, min);
      setSpinState('down');
    } else if (!e.shiftKey && e.key === Keys.End && max !== undefined) {
      commit(e, max);
      setSpinState('up');
    } else if (e.key === Keys.Enter) {
      commit(e, currentValue, textValue);
      setSpinState('rest');
    } else if (e.key === Keys.Escape) {
      if (internalState.current.previousTextValue) {
        setTextValue(internalState.current.previousTextValue);
        internalState.current.previousTextValue = undefined;
      }
      setSpinState('rest');
    } else {
      setSpinState('rest');
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setSpinState('rest');
  };

  const commit = (e: SpinButtonChangeEvent, newValue?: number, newDisplayValue?: string) => {
    const valueChanged = newValue !== undefined && currentValue !== newValue;
    const displayValueChanged =
      newDisplayValue !== undefined &&
      internalState.current.previousTextValue !== undefined &&
      internalState.current.previousTextValue !== newDisplayValue;

    let roundedValue;
    if (valueChanged) {
      roundedValue = precisionRound(newValue!, precision);
      setCurrentValue(roundedValue);
      internalState.current.value = roundedValue;
      setAtBound(getBound(roundedValue, min, max));
    }

    if (valueChanged || displayValueChanged) {
      onChange?.(e, { value: roundedValue, displayValue: newDisplayValue });
    }
  };

  state.input.value = textValue;
  state.input['aria-valuemin'] = min;
  state.input['aria-valuemax'] = max;
  state.input['aria-valuenow'] = currentValue;
  state.input['aria-valuetext'] = (value !== undefined && displayValue) || undefined;
  state.input.onChange = useMergedEventCallbacks(state.input.onChange, handleInputChange);
  state.input.onBlur = useMergedEventCallbacks(state.input.onBlur, handleBlur);
  state.input.onKeyDown = useMergedEventCallbacks(state.input.onKeyDown, handleKeyDown);
  state.input.onKeyUp = useMergedEventCallbacks(state.input.onKeyUp, handleKeyUp);

  state.incrementButton.onMouseDown = useMergedEventCallbacks(
    handleIncrementMouseDown,
    state.incrementButton.onMouseDown,
  );
  state.incrementButton.onMouseUp = useMergedEventCallbacks(state.incrementButton.onMouseUp, handleStepMouseUpOrLeave);
  state.incrementButton.onMouseLeave = useMergedEventCallbacks(
    state.incrementButton.onMouseLeave,
    handleStepMouseUpOrLeave,
  );

  state.decrementButton.onMouseDown = useMergedEventCallbacks(
    handleDecrementMouseDown,
    state.decrementButton.onMouseDown,
  );
  state.decrementButton.onMouseUp = useMergedEventCallbacks(state.decrementButton.onMouseUp, handleStepMouseUpOrLeave);
  state.decrementButton.onMouseLeave = useMergedEventCallbacks(
    state.decrementButton.onMouseLeave,
    handleStepMouseUpOrLeave,
  );

  return state;
};
