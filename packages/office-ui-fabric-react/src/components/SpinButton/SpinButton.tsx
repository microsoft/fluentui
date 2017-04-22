import * as React from 'react';
import { IconButton } from '../../Button';
import { Label } from '../../Label';
import {
  BaseComponent,
  getId,
  KeyCodes
} from '../../Utilities';
import {
  ISpinButton,
  ISpinButtonProps
} from './SpinButton.Props';
import './SpinButton.scss';
import { Position } from '../../utilities/positioning';

export interface ISpinButtonState {
  /**
   * the value of the spin button
   */
  value?: string;

  /**
   * Are we spinning? Used in case we are spinning
   * and the text field gets focus (we should stop spinning)
   */
  spinning?: boolean;
}

export class SpinButton extends BaseComponent<ISpinButtonProps, ISpinButtonState> implements ISpinButton {

  public static defaultProps: ISpinButtonProps = {
    step: 1,
    min: 0,
    max: 100,
    disabled: false,
    labelPosition: Position.start,
    labelGapSpace: 10,
    label: null,
    incrementButtonIcon: 'CaretUpSolid8',
    decrementButtonIcon: 'CaretDownSolid8'
  };

  private _input: HTMLInputElement;
  private _inputId: string;
  private _labelId: string;
  private _lastValidValue: string;

  private _onValidate?: (value: string) => string;
  private _onIncrement?: (value: string) => string;
  private _onDecrement?: (value: string) => string;

  private _currentStepFunctionHandle: number;
  private _stepDelay = 100;
  private _formattedValidUnitOptions: string[] = [];

  constructor(props?: ISpinButtonProps) {
    super(props);

    let value = props.value || props.defaultValue || String(props.min);
    this._lastValidValue = value;

    this.state = {
      value: value,
      spinning: false,
    };

    this._labelId = getId('Label');
    this._inputId = getId('input');

    if (props.defaultValue) {
      this._onValidate = this._defaultOnValidate;
      this._onIncrement = this._defaultOnIncrement;
      this._onDecrement = this._defaultOnDecrement;
    } else {
      this._onValidate = props.onValidate;
      this._onIncrement = props.onIncrement;
      this._onIncrement = this._onIncrement.bind(this);
      this._onDecrement = props.onDecrement;
      this._onDecrement = this._onDecrement.bind(this);
    }

    // bind this (for this class) to all the methods
    this._validate = this._validate.bind(this);
    this._updateValue = this._updateValue.bind(this);
    this._stop = this._stop.bind(this);
    this.focus = this.focus.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._labelDirectionHelper = this._labelDirectionHelper.bind(this);
  }

  /**
  * Invoked when a component is receiving new props. This method is not called for the initial render.
  */
  public componentWillReceiveProps(newProps: ISpinButtonProps): void {
    if (newProps.value !== undefined) {
      let value = Math.max(newProps.min, Math.min(newProps.max, +newProps.value));

      this.setState({
        value: String(value)
      });
    }
  }

  public render() {
    const {
      className,
      disabled,
      label,
      min,
      max,
      width: spinbuttonWidth,
      labelPosition,
      icon,
      incrementButtonIcon,
      decrementButtonIcon
    } = this.props;

    const {
      value
    } = this.state;

    return (
      <div className='ms-SpinButtonContainer' style={ spinbuttonWidth && { width: spinbuttonWidth } }>
        { labelPosition !== Position.bottom && <div className='ms-labelWrapper' style={ this._labelDirectionHelper() }>
          { icon && <i className={ "ms-SpinButtonIcon ms-Icon ms-Icon--" + icon } aria-hidden="true"></i> }
          { label &&
            < Label
              id={ this._labelId }
              //style={ this._labelDirectionHelper() }
              htmlFor={ this._inputId }>{ label }
            </Label> }
        </div> }
        <div className={ 'ms-SpinButtonWrapper' + ((labelPosition === Position.top || labelPosition === Position.bottom) ? ' topBottom' : '') }>
          <input
            value={ value }
            id={ this._inputId }
            onChange={ this._onChange }
            onInput={ this._onInputChange }
            className='ms-SpinButton-Input'
            role='spinbutton'
            aria-labelledby={ label && this._labelId }
            aria-valuenow={ value }
            aria-valuemin={ min && String(min) }
            aria-valuemax={ max && String(max) }
            onBlur={ this._validate }
            ref={ this._resolveRef('_input') }
            onFocus={ this.focus }
            onKeyDown={ this._handleKeyDown }
            onKeyUp={ this._handleKeyUp }
            readOnly={ disabled }
            aria-disabled={ disabled }
          />
          <span className='ms-ArrowBox'>
            <IconButton
              className='ms-UpButton'
              disabled={ disabled }
              icon={ incrementButtonIcon }
              title='Increase'
              aria-hidden='true'
              onMouseDown={ () => { this._updateValue(true /* shouldSpin */, this._onIncrement); } }
              onMouseLeave={ this._stop }
              onMouseUp={ this._stop }
              onBlur={ this._stop }
              tabIndex={ -1 }
            />
            <IconButton
              className='ms-DownButton'
              disabled={ disabled }
              icon={ decrementButtonIcon }
              title='Decrease'
              aria-hidden='true'
              onMouseDown={ () => { this._updateValue(true /* shouldSpin */, this._onDecrement); } }
              onMouseLeave={ this._stop }
              onMouseUp={ this._stop }
              onBlur={ this._stop }
              tabIndex={ -1 }
            />
          </span >
        </div >
        { labelPosition === Position.bottom && <div className='ms-labelWrapper' style={ this._labelDirectionHelper() }>
          { icon && <i className={ "ms-SpinButtonIcon ms-Icon ms-Icon--" + icon } aria-hidden="true"></i> }
          { label &&
            <Label
              id={ this._labelId }
              //style={ this._labelDirectionHelper() }
              htmlFor={ this._inputId }>{ label }
            </Label> }
        </div> }
      </ div >
    ) as React.ReactElement<{}>;
  }

  /**
   * OnFocus select the contents of the input
   */
  public focus() {
    if (this.state.spinning) {
      this._stop();
    }

    this._input.focus();
    this._input.select();
  }

  private _defaultOnValidate = (value: string) => {
    if (isNaN(+value)) {
      return this._lastValidValue;
    }
    const newValue = Math.min(this.props.max, Math.max(this.props.min, +value));
    return String(newValue);
  }
  private _defaultOnIncrement = (value: string) => {
    let newValue = Math.min(+value + this.props.step, this.props.max);
    return String(newValue);
  }
  private _defaultOnDecrement = (value: string) => {
    let newValue = Math.max(+value - this.props.step, this.props.min);
    return String(newValue);
  }

  private _labelDirectionHelper(): any {
    let style: any = {};

    switch (this.props.labelPosition) {
      case Position.start:
        style = { float: 'left', marginRight: this.props.labelGapSpace + 'px' };
        break;
      case Position.end:
        style = { float: 'right', marginLeft: this.props.labelGapSpace + 'px' };
        break;
      case Position.top:
        style = { marginBottom: this.props.labelGapSpace + 'px' };
        break;
      case Position.bottom:
        style = { marginTop: this.props.labelGapSpace + 'px' };
    }

    return style;
  }

  private _onChange() {
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
   * @param newValue - the pending value to check if it is valid
   * @returns an error message to display to the user, empty string if no error
   */
  private _validate(event: React.FocusEvent<HTMLInputElement>) {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;
    if (this.state.value) {
      const newValue = this._onValidate(value);
      this._lastValidValue = newValue;
      this.setState({ value: newValue });
    }
  }

  private _onInputChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;

    this.setState({
      value: value,
    });
  }

  private _updateValue(shouldSpin: boolean, stepFunction: (string) => string) {
    const newValue = stepFunction(this.state.value);
    this._lastValidValue = newValue;
    this.setState({ value: newValue });

    if (this.state.spinning !== shouldSpin) {
      this.setState({ spinning: shouldSpin });
    }

    if (shouldSpin) {
      this._currentStepFunctionHandle = window.setTimeout(() => { this._updateValue(shouldSpin, stepFunction); }, this._stepDelay);
    }
  }

  /**
   * Stop spinning (clear any currently pending update and set spinning to false)
   */
  private _stop() {
    if (this._currentStepFunctionHandle !== null) {
      window.clearTimeout(this._currentStepFunctionHandle);
      this._currentStepFunctionHandle = 0;
    }

    if (this.state.spinning) {
      this.setState({ spinning: false });
    }
  }

  /**
   * Handle keydown on the text field. We need to update
   * the value when up or down arrow are depressed
   * @param event - the keyboardEvent that was fired
   */
  private _handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (this.props.disabled) {
      this._stop();

      // eat the up and down arrow keys to keep the page from scrolling
      if (event.which === KeyCodes.up || event.which === KeyCodes.down) {
        event.preventDefault();
        event.stopPropagation();
      }

      return;
    }

    if (event.which === KeyCodes.up) {
      this._updateValue(false /* shouldSpin */, this._onIncrement);
    } else if (event.which === KeyCodes.down) {
      this._updateValue(false /* shouldSpin */, this._onDecrement);
    } else if (event.which === KeyCodes.enter) {
      event.currentTarget.blur();
      this.focus();
    }
  }

  /**
   * Make sure that we have stopped spinning on keyUp
   * if the up or down arrow fired this event
   * @param event stop spinning if we
   */
  private _handleKeyUp(event: React.KeyboardEvent<HTMLElement>) {
    if (this.props.disabled) {
      this._stop();
      return;
    }

    if (event.which === KeyCodes.up || event.which === KeyCodes.down) {
      this._stop();
    }
  }
}