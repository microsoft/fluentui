import * as React from 'react';
import { IconButton } from '../../Button';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import {
  BaseComponent,
  getId,
  KeyCodes,
  customizable,
  calculatePrecision,
  precisionRound,
  mergeAriaAttributeValues
} from '../../Utilities';
import { ISpinButton, ISpinButtonProps } from './SpinButton.types';
import { Position } from '../../utilities/positioning';
import { getStyles, getArrowButtonStyles } from './SpinButton.styles';
import { getClassNames } from './SpinButton.classNames';
import { KeytipData } from '../../KeytipData';

export enum SpinDirection {
  down = -1,
  notSpinning = 0,
  up = 1
}

/**
 * @deprecated Use `SpinDirection` enum instead.
 */
export type KeyboardSpinDirection = SpinDirection;

export interface ISpinButtonState {
  /**
   * Is true when the control has focus.
   */
  isFocused: boolean;

  /**
   * The current display value.
   */
  value: string;

  /**
   * The last valid display value.
   */
  lastValidValue: string;

  /**
   * Current spinning direction. It is either not spinning, or up/down direction triggered by keyboard or mouse.
   */
  spinDirection: SpinDirection;

  /**
   * keyboard spin direction, used to style the up or down button as active when up/down arrow is pressed.
   * @deprecated Use `spinDirection` state Instead.
   */
  keyboardSpinDirection: KeyboardSpinDirection;
}

export type DefaultProps = Required<
  Pick<ISpinButtonProps, 'step' | 'min' | 'max' | 'disabled' | 'labelPosition' | 'label' | 'incrementButtonIcon' | 'decrementButtonIcon'>
>;

/** Internal only props */
type ISpinButtonInternalProps = ISpinButtonProps & DefaultProps;

@customizable('SpinButton', ['theme', 'styles'], true)
export class SpinButton extends BaseComponent<ISpinButtonProps, ISpinButtonState> implements ISpinButton {
  public static readonly defaultProps: DefaultProps = {
    step: 1,
    min: 0,
    max: 100,
    disabled: false,
    labelPosition: Position.start,
    label: '',
    incrementButtonIcon: { iconName: 'ChevronUpSmall' },
    decrementButtonIcon: { iconName: 'ChevronDownSmall' }
  };

  private readonly _input = React.createRef<HTMLInputElement>();
  private readonly _labelId: string = getId('label');
  private readonly _inputId: string = getId('input');

  // @todo The `_precision` should be a memorized getter on `props`.
  private _precision: number;

  private _currentStepFunctionHandle: number = -1;
  private readonly _initialStepDelay = 400;
  private readonly _stepDelay = 75;

  public constructor(props: ISpinButtonProps) {
    super(props);

    this._warnMutuallyExclusive({
      value: 'defaultValue'
    });

    const value = props.value || props.defaultValue || String(props.min) || '0';

    // Ensure that the auto-calculated precision is not negative.
    this._precision = this._calculatePrecision(this.props as ISpinButtonInternalProps);

    this.state = {
      isFocused: false,
      value: value,
      lastValidValue: value, // @todo Can we use this._validateValue(value)? Will it break the validate invoke assumption?
      spinDirection: SpinDirection.notSpinning,
      keyboardSpinDirection: SpinDirection.notSpinning
    };
  }

  public componentWillReceiveProps(nextProps: ISpinButtonProps): void {
    if (this.props.value !== undefined && nextProps.value !== undefined) {
      // Controlled mode, respect the next value if it is changed.
      const currValue: string = this.props.value || '0';
      const nextValue: string = nextProps.value || '0';
      if (currValue !== nextValue) {
        this.setState({
          value: nextValue
        });
      }
    }

    if (!this.props.disabled && nextProps.disabled) {
      this._stopSpinning();
    }

    this._precision = this._calculatePrecision(nextProps as ISpinButtonProps & DefaultProps);
  }

  public render(): JSX.Element {
    const {
      disabled,
      label,
      min,
      max,
      labelPosition,
      iconProps,
      incrementButtonIcon,
      incrementButtonAriaLabel,
      decrementButtonIcon,
      decrementButtonAriaLabel,
      title,
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
      className
    } = this.props as ISpinButtonInternalProps;

    const { isFocused, value, spinDirection } = this.state;

    const classNames = this.props.getClassNames
      ? this.props.getClassNames(theme!, !!disabled, !!isFocused, spinDirection, labelPosition, className)
      : getClassNames(getStyles(theme!, customStyles), !!disabled, !!isFocused, labelPosition, className);

    return (
      <div className={classNames.root}>
        {labelPosition !== Position.bottom && (
          <div className={classNames.labelWrapper}>
            {iconProps && <Icon {...iconProps} className={classNames.icon} aria-hidden="true" />}
            {label && (
              <Label id={this._labelId} htmlFor={this._inputId} className={classNames.label}>
                {label}
              </Label>
            )}
          </div>
        )}
        <KeytipData keytipProps={keytipProps} disabled={disabled}>
          {(keytipAttributes: any): JSX.Element => (
            <div
              className={classNames.spinButtonWrapper}
              title={title && title}
              aria-label={ariaLabel && ariaLabel}
              aria-posinset={ariaPositionInSet}
              aria-setsize={ariaSetSize}
              data-ktp-target={keytipAttributes['data-ktp-target']}
            >
              <input
                value={value}
                id={this._inputId}
                onChange={this._handleChange}
                className={classNames.input}
                type="text"
                autoComplete="off"
                role="spinbutton"
                aria-labelledby={label && this._labelId}
                aria-valuenow={!isNaN(Number(ariaValueNow)) ? ariaValueNow : !isNaN(Number(value)) ? Number(value) : undefined}
                aria-valuetext={ariaValueText ? ariaValueText : isNaN(Number(value)) ? value : undefined}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-describedby={mergeAriaAttributeValues(ariaDescribedBy, ' ', keytipAttributes['aria-describedby'])}
                onBlur={this._handleBlur}
                ref={this._input}
                onFocus={this._handleFocus}
                onKeyDown={this._handleKeyDown}
                onKeyUp={this._handleKeyUp}
                readOnly={disabled}
                aria-disabled={disabled}
                data-lpignore={true}
                data-ktp-execute-target={keytipAttributes['data-ktp-execute-target']}
              />
              <span className={classNames.arrowBox}>
                <IconButton
                  styles={getArrowButtonStyles(theme!, true, customUpArrowButtonStyles)}
                  className={'ms-UpButton'}
                  checked={spinDirection === SpinDirection.up}
                  disabled={disabled}
                  iconProps={incrementButtonIcon}
                  onMouseDown={this._handleIncrementMouseDown}
                  onMouseLeave={this._handleMouseUp}
                  onMouseUp={this._handleMouseUp}
                  tabIndex={-1}
                  ariaLabel={incrementButtonAriaLabel}
                  data-is-focusable={false}
                />
                <IconButton
                  styles={getArrowButtonStyles(theme!, false, customDownArrowButtonStyles)}
                  className={'ms-DownButton'}
                  checked={spinDirection === SpinDirection.down}
                  disabled={disabled}
                  iconProps={decrementButtonIcon}
                  onMouseDown={this._handleDecrementMouseDown}
                  onMouseLeave={this._handleMouseUp}
                  onMouseUp={this._handleMouseUp}
                  tabIndex={-1}
                  ariaLabel={decrementButtonAriaLabel}
                  data-is-focusable={false}
                />
              </span>
            </div>
          )}
        </KeytipData>
        {labelPosition === Position.bottom && (
          <div className={classNames.labelWrapper}>
            {iconProps && <Icon iconName={iconProps.iconName} className={classNames.icon} aria-hidden="true" />}
            {label && (
              <Label id={this._labelId} htmlFor={this._inputId} className={classNames.label}>
                {label}
              </Label>
            )}
          </div>
        )}
      </div>
    );
  }

  public focus(): void {
    if (this._input.current) {
      this._input.current.focus();
    }
  }

  private _handleFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
    if (!this._input.current) {
      return;
    }

    this._stopSpinning();
    this._input.current.select();
    this.setState({ isFocused: true });

    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }
  };

  private _handleBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
    this._commitValue();
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  };

  public get value(): string | undefined {
    return this.state.value;
  }

  private _validateValue = (value: string): string => {
    if (this.props.onValidate) {
      return this.props.onValidate(value) || value;
    } else {
      return this._defaultOnValidate(value);
    }
  };

  private _calculatePrecision = (props: ISpinButtonProps & DefaultProps) => {
    const { precision = Math.max(calculatePrecision(props.step), 0) } = props;
    return precision;
  };

  private _defaultOnValidate = (value: string): string => {
    if (value.trim().length === 0 || isNaN(Number(value))) {
      return this.state.lastValidValue;
    } else {
      const newValue = Math.min(this.props.max as number, Math.max(this.props.min as number, Number(value)));
      return String(newValue);
    }
  };

  private _incrementValue = (value: string): string => {
    if (this.props.onIncrement) {
      return this.props.onIncrement(value) || value;
    } else {
      return this._defaultOnIncrement(value);
    }
  };

  private _defaultOnIncrement = (value: string): string => {
    const { max, step } = this.props as ISpinButtonInternalProps;
    let newValue: number = Math.min(Number(value) + Number(step), max);
    newValue = precisionRound(newValue, this._precision);
    return String(newValue);
  };

  private _decrementValue = (value: string): string => {
    if (this.props.onDecrement) {
      return this.props.onDecrement(value) || value;
    } else {
      return this._defaultOnDecrement(value);
    }
  };

  private _defaultOnDecrement = (value: string): string => {
    const { min, step } = this.props as ISpinButtonInternalProps;
    let newValue: number = Math.max(Number(value) - Number(step), min);
    newValue = precisionRound(newValue, this._precision);
    return String(newValue);
  };

  private _handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      value: event.target.value
    });
  };

  private _updateValue = (
    shouldSpin: boolean,
    spinDirection: SpinDirection,
    stepDelay: number,
    stepFunction: (value: string) => string
  ): void => {
    this.setState(state => ({
      spinDirection,
      keyboardSpinDirection: spinDirection,
      value: stepFunction(state.value)
    }));

    if (shouldSpin) {
      this._currentStepFunctionHandle = this._async.setTimeout(() => {
        this._currentStepFunctionHandle = -1;
        this._updateValue(shouldSpin, spinDirection, this._stepDelay, stepFunction);
      }, stepDelay);
    } else {
      // If the component is spinning, commit the value at the comment when stop spinning.
      // If the component is not spinning, commit the value immediately.
      this._commitValue();
    }
  };

  private _stopSpinning = (): void => {
    if (this._currentStepFunctionHandle >= 0) {
      this._async.clearTimeout(this._currentStepFunctionHandle);
      this._currentStepFunctionHandle = -1;
    }

    this.setState({
      spinDirection: SpinDirection.notSpinning,
      keyboardSpinDirection: SpinDirection.notSpinning
    });
  };

  private _handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // eat the up and down arrow keys to keep focus in the spinButton
    // (especially when a spinButton is inside of a FocusZone)
    if (event.which === KeyCodes.up || event.which === KeyCodes.down || event.which === KeyCodes.enter) {
      event.preventDefault();
      event.stopPropagation();
    }

    switch (event.which) {
      case KeyCodes.up:
        this._updateValue(false /* shouldSpin */, SpinDirection.up, this._initialStepDelay, this._incrementValue);
        break;
      case KeyCodes.down:
        this._updateValue(false /* shouldSpin */, SpinDirection.down, this._initialStepDelay, this._decrementValue);
        break;
      case KeyCodes.enter:
      case KeyCodes.tab:
        this._commitValue();
        this._stopSpinning();
        break;
      case KeyCodes.escape:
        this._resetValue();
        this._stopSpinning();
        break;
      default:
        break;
    }
  };

  private _handleKeyUp = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.which === KeyCodes.up || event.which === KeyCodes.down) {
      this._stopSpinning();
    }
  };

  private _handleIncrementMouseDown = (): void => {
    this._updateValue(true /* shouldSpin */, SpinDirection.up, this._initialStepDelay, this._incrementValue);
  };

  private _handleDecrementMouseDown = (): void => {
    this._updateValue(true /* shouldSpin */, SpinDirection.down, this._initialStepDelay, this._decrementValue);
  };

  private _handleMouseUp = (): void => {
    this._commitValue();
    this._stopSpinning();
  };

  private _commitValue = () => {
    this.setState((state, props) => {
      if (props.value !== undefined) {
        // Controlled mode
        if (state.value === props.value) {
          // State value not changed. Do nothing.
          return { lastValidValue: state.lastValidValue, value: state.value };
        } else {
          // State value is changed. We only invoke validate and change callbacks when value changed.
          const normalizedValue = this._validateValue(state.value);

          // Invoke the `onChange` callback if available, the parent can use it to update the value.
          if (props.onChange) {
            props.onChange(normalizedValue);
          }

          // Reset `state.value` to the `props.value` first, but it may get update from parent.
          return { lastValidValue: normalizedValue, value: props.value };
        }
      } else {
        // Uncontrolled mode
        if (state.value === state.lastValidValue) {
          // State value not changed. Do nothing.
          return { lastValidValue: state.lastValidValue, value: state.value };
        } else {
          // State value is changed. We only invoke validate and change callbacks when value changed.
          const normalizedValue = this._validateValue(state.value);

          // Invoke the `onChange` callback if available, the parent can use it to update the value.
          if (props.onChange) {
            props.onChange(normalizedValue);
          }

          // Update the component state to the new normalized value directly.
          return { lastValidValue: normalizedValue, value: normalizedValue };
        }
      }
    });
  };

  private _resetValue = () => {
    this.setState((state, props) => {
      if (props.value !== undefined) {
        // Controlled mode, reset the value to whatever parent passed in.
        return { value: props.value };
      } else {
        // Uncontrolled mode, reset the value to last valid value.
        return { value: state.lastValidValue };
      }
    });
  };
}
