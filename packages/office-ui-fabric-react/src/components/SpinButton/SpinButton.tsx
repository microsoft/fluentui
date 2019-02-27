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

export enum KeyboardSpinDirection {
  down = -1,
  notSpinning = 0,
  up = 1
}

export interface ISpinButtonState {
  /**
   * Is true when the control has focus.
   */
  isFocused: boolean;

  /**
   * the value of the spin button
   */
  value: string;

  /**
   * keyboard spin direction, used to style the up or down button
   * as active when up/down arrow is pressed
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
  public static defaultProps: DefaultProps = {
    step: 1,
    min: 0,
    max: 100,
    disabled: false,
    labelPosition: Position.start,
    label: '',
    incrementButtonIcon: { iconName: 'ChevronUpSmall' },
    decrementButtonIcon: { iconName: 'ChevronDownSmall' }
  };

  private _input = React.createRef<HTMLInputElement>();
  private _inputId: string;
  private _labelId: string;
  private _lastValidValue: string;
  private _spinningByMouse: boolean;
  private _valueToValidate: string | undefined; // To avoid duplicate validations/submissions
  private _precision: number;

  private _currentStepFunctionHandle: number;
  private _initialStepDelay = 400;
  private _stepDelay = 75;

  constructor(props: ISpinButtonProps) {
    super(props);

    this._warnMutuallyExclusive({
      value: 'defaultValue'
    });

    const value = props.value || props.defaultValue || String(props.min) || '0';
    this._lastValidValue = value;

    // Ensure that the autocalculated precision is not negative.
    this._precision = this._calculatePrecision(this.props as ISpinButtonInternalProps);

    this.state = {
      isFocused: false,
      value: value,
      keyboardSpinDirection: KeyboardSpinDirection.notSpinning
    };

    this._currentStepFunctionHandle = -1;
    this._labelId = getId('Label');
    this._inputId = getId('input');
    this._spinningByMouse = false;
    this._valueToValidate = undefined;
  }

  /**
   * Invoked when a component is receiving new props. This method is not called for the initial render.
   */
  public componentWillReceiveProps(newProps: ISpinButtonProps): void {
    this._lastValidValue = this.state.value;
    let value: string = newProps.value ? newProps.value : String(newProps.min);
    if (newProps.defaultValue) {
      value = String(Math.max(newProps.min as number, Math.min(newProps.max as number, Number(newProps.defaultValue))));
    }

    if (newProps.value !== undefined) {
      this.setState({
        value: value
      });
    }
    this._precision = this._calculatePrecision(newProps as ISpinButtonProps & DefaultProps);
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

    const { isFocused, value, keyboardSpinDirection } = this.state;

    const classNames = this.props.getClassNames
      ? this.props.getClassNames(theme!, !!disabled, !!isFocused, keyboardSpinDirection, labelPosition, className)
      : getClassNames(getStyles(theme!, customStyles), !!disabled, !!isFocused, keyboardSpinDirection, labelPosition, className);

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
                onChange={this._onChange}
                onInput={this._onInputChange}
                className={classNames.input}
                type="text"
                autoComplete="off"
                role="spinbutton"
                aria-labelledby={label && this._labelId}
                aria-valuenow={!isNaN(Number(ariaValueNow)) ? ariaValueNow : !isNaN(Number(value)) ? Number(value) : undefined}
                aria-valuetext={ariaValueText ? ariaValueText : isNaN(Number(value)) ? value : undefined}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-describedby={mergeAriaAttributeValues(ariaDescribedBy, keytipAttributes['aria-describedby'])}
                onBlur={this._onBlur}
                ref={this._input}
                onFocus={this._onFocus}
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
                  checked={keyboardSpinDirection === KeyboardSpinDirection.up}
                  disabled={disabled}
                  iconProps={incrementButtonIcon}
                  onMouseDown={this._onIncrementMouseDown}
                  onMouseLeave={this._stop}
                  onMouseUp={this._stop}
                  tabIndex={-1}
                  ariaLabel={incrementButtonAriaLabel}
                  data-is-focusable={false}
                />
                <IconButton
                  styles={getArrowButtonStyles(theme!, false, customDownArrowButtonStyles)}
                  className={'ms-DownButton'}
                  checked={keyboardSpinDirection === KeyboardSpinDirection.down}
                  disabled={disabled}
                  iconProps={decrementButtonIcon}
                  onMouseDown={this._onDecrementMouseDown}
                  onMouseLeave={this._stop}
                  onMouseUp={this._stop}
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

  private _onFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
    // We can't set focus on a non-existing element
    if (!this._input.current) {
      return;
    }

    if (this._spinningByMouse || this.state.keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
      this._stop();
    }

    this._input.current.select();

    this.setState({ isFocused: true });

    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }
  };

  private _onBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
    this._validate(ev);
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  };

  /**
   * Gets the value of the spin button.
   */
  public get value(): string | undefined {
    return this.props.value === undefined ? this.state.value : this.props.value;
  }

  private _onValidate = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    if (this.props.onValidate) {
      return this.props.onValidate(value, event);
    } else {
      return this._defaultOnValidate(value);
    }
  };

  private _calculatePrecision = (props: ISpinButtonProps & DefaultProps) => {
    const { precision = Math.max(calculatePrecision(props.step), 0) } = props;
    return precision;
  };

  /**
   * Validate function to use if one is not passed in
   */
  private _defaultOnValidate = (value: string) => {
    if (value === null || value.trim().length === 0 || isNaN(Number(value))) {
      return this._lastValidValue;
    }
    const newValue = Math.min(this.props.max as number, Math.max(this.props.min as number, Number(value)));
    return String(newValue);
  };

  private _onIncrement = (value: string): string | void => {
    if (this.props.onIncrement) {
      return this.props.onIncrement(value);
    } else {
      return this._defaultOnIncrement(value);
    }
  };

  /**
   * Increment function to use if one is not passed in
   */
  private _defaultOnIncrement = (value: string): string | void => {
    const { max, step } = this.props as ISpinButtonInternalProps;
    let newValue: number = Math.min(Number(value) + Number(step), max);
    newValue = precisionRound(newValue, this._precision);
    return String(newValue);
  };

  private _onDecrement = (value: string): string | void => {
    if (this.props.onDecrement) {
      return this.props.onDecrement(value);
    } else {
      return this._defaultOnDecrement(value);
    }
  };

  /**
   * Increment function to use if one is not passed in
   */
  private _defaultOnDecrement = (value: string): string | void => {
    const { min, step } = this.props as ISpinButtonInternalProps;
    let newValue: number = Math.max(Number(value) - Number(step), min);
    newValue = precisionRound(newValue, this._precision);
    return String(newValue);
  };

  private _onChange(): void {
    /**
     * A noop input change handler.
     * https://github.com/facebook/react/issues/7027.
     * Using the native onInput handler fixes the issue but onChange
     * still need to be wired to avoid React console errors
     * TODO: Check if issue is resolved when React 16 is available.
     */
  }

  /**
   * This is used when validating text entry
   * in the input (not when changed via the buttons)
   * @param event - the event that fired
   */
  private _validate = (event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>): void => {
    if (this.state.value !== undefined && this._valueToValidate !== undefined && this._valueToValidate !== this._lastValidValue) {
      const newValue = this._onValidate!(this._valueToValidate, event);
      if (newValue) {
        this._lastValidValue = newValue;
        this._valueToValidate = undefined;
        this.setState({ value: newValue });
      }
    }
  };

  /**
   * The method is needed to ensure we are updating the actual input value.
   * without this our value will never change (and validation will not have the correct number)
   * @param event - the event that was fired
   */
  private _onInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;
    this._valueToValidate = value;
    this.setState({
      value: value
    });
  };

  /**
   * Update the value with the given stepFunction
   * @param shouldSpin - should we fire off another updateValue when we are done here? This should be true
   * when spinning in response to a mouseDown
   * @param stepFunction - function to use to step by
   */
  private _updateValue = (shouldSpin: boolean, stepDelay: number, stepFunction: (value: string) => string | void): void => {
    const newValue: string | void = stepFunction(this.state.value);
    if (newValue) {
      this._lastValidValue = newValue;
      this.setState({ value: newValue });
    }

    if (this._spinningByMouse !== shouldSpin) {
      this._spinningByMouse = shouldSpin;
    }

    if (shouldSpin) {
      this._currentStepFunctionHandle = this._async.setTimeout(() => {
        this._updateValue(shouldSpin, this._stepDelay, stepFunction);
      }, stepDelay);
    }
  };

  /**
   * Stop spinning (clear any currently pending update and set spinning to false)
   */
  private _stop = (): void => {
    if (this._currentStepFunctionHandle >= 0) {
      this._async.clearTimeout(this._currentStepFunctionHandle);
      this._currentStepFunctionHandle = -1;
    }

    if (this._spinningByMouse || this.state.keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
      this._spinningByMouse = false;
      this.setState({ keyboardSpinDirection: KeyboardSpinDirection.notSpinning });
    }
  };

  /**
   * Handle keydown on the text field. We need to update
   * the value when up or down arrow are depressed
   * @param event - the keyboardEvent that was fired
   */
  private _handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // eat the up and down arrow keys to keep focus in the spinButton
    // (especially when a spinButton is inside of a FocusZone)
    if (event.which === KeyCodes.up || event.which === KeyCodes.down || event.which === KeyCodes.enter) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.props.disabled) {
      this._stop();
      return;
    }

    let spinDirection = KeyboardSpinDirection.notSpinning;

    switch (event.which) {
      case KeyCodes.up:
        spinDirection = KeyboardSpinDirection.up;
        this._updateValue(false /* shouldSpin */, this._initialStepDelay, this._onIncrement!);
        break;
      case KeyCodes.down:
        spinDirection = KeyboardSpinDirection.down;
        this._updateValue(false /* shouldSpin */, this._initialStepDelay, this._onDecrement!);
        break;
      case KeyCodes.enter:
      case KeyCodes.tab:
        this._validate(event);
        break;
      case KeyCodes.escape:
        if (this.state.value !== this._lastValidValue) {
          this.setState({ value: this._lastValidValue });
        }
        break;
      default:
        break;
    }

    // style the increment/decrement button to look active
    // when the corresponding up/down arrow keys trigger a step
    if (this.state.keyboardSpinDirection !== spinDirection) {
      this.setState({ keyboardSpinDirection: spinDirection });
    }
  };

  /**
   * Make sure that we have stopped spinning on keyUp
   * if the up or down arrow fired this event
   * @param event stop spinning if we
   */
  private _handleKeyUp = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (this.props.disabled || event.which === KeyCodes.up || event.which === KeyCodes.down) {
      this._stop();
      return;
    }
  };

  private _onIncrementMouseDown = (): void => {
    this._updateValue(true /* shouldSpin */, this._initialStepDelay, this._onIncrement!);
  };

  private _onDecrementMouseDown = (): void => {
    this._updateValue(true /* shouldSpin */, this._initialStepDelay, this._onDecrement!);
  };
}
