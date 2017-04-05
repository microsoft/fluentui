import * as React from 'react';
import {
  TextField,
  IconButton,
  Label
} from '../../../lib/';
import {
  BaseComponent,
  css,
  getId,
  KeyCodes,
  assign
} from '../../Utilities';
import {
  IStepper,
  IStepperProps
} from './Stepper.Props';
import './Stepper.scss';

export interface IStepperState {
  /**
   * the value of the stepper
   */
  value?: number;

  /**
   * Are we spinning? Used in case we are spinning
   * and the text field gets focus (we should stop spinning)
   */
  spinning?: boolean;

  /**
   * the index into the unit options array that corresponds
   * to the current unit that is being used in the textField
   */
  currentUnitIndex?: number;
}

export class Stepper extends BaseComponent<IStepperProps, IStepperState> implements IStepper {
  private _textField: TextField;
  private _stepperId: string;
  private _labelId: string;

  private _onGetErrorMessage?: (value: string, state: IStepperState, props: IStepperProps) => string;
  public static defaultProps: IStepperProps = {
    step: 1,
    min: 0,
    max: 100,
    disabled: false,
    defaultValue: 0
  };

  private _currentStepFunctionHandle: number;
  private _stepDelay = 50;

  private _formattedValidUnitOptions: string[] = [];

  constructor(props?: IStepperProps) {
    super(props);

    let value = props.value || props.defaultValue || props.min;
    this.state = {
      value: value,
      spinning: false,
      currentUnitIndex: -1
    };

    this._labelId = getId('Label');
    this._stepperId = getId('Stepper');

    if (props.onGetErrorMessage) {
      this._onGetErrorMessage = props.onGetErrorMessage;
      this._onGetErrorMessage = this._onGetErrorMessage.bind(this);
    }

    // bind this (for this class) to all the methods
    this._getErrorMessage = this._getErrorMessage.bind(this);
    this._parseNumIfValidSuffix = this._parseNumIfValidSuffix.bind(this);
    this._increment = this._increment.bind(this);
    this._decrement = this._decrement.bind(this);
    this._stop = this._stop.bind(this);
    this.focus = this.focus.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._getCurrentUnit = this._getCurrentUnit.bind(this);
    this._normalizeUnit = this._normalizeUnit.bind(this);
    this._formatUnitOptions = this._formatUnitOptions.bind(this);
    this._updateValueByStep = this._updateValueByStep.bind(this);

    // Format all the unit options passed in to
    // simplify the work we have to do when rendering the full value
    this._formatUnitOptions();
  }

  /**
  * Invoked when a component is receiving new props. This method is not called for the initial render.
  */
  public componentWillReceiveProps(newProps: IStepperProps): void {
    if (newProps.value !== undefined) {
      let value = Math.max(newProps.min, Math.min(newProps.max, newProps.value));

      this.setState({
        value: value
      });
    }
  }

  public render() {
    const {
      className,
      disabled,
      min,
      max,
      label
    } = this.props;

    const {
      value
    } = this.state;

    return (
      <div className='stepperContainer' >
        { label && <Label id={ this._labelId } htmlFor={ this._stepperId }>{ label }</Label> }
        <TextField
          value={ String(value).concat(this._getCurrentUnit()) }
          resizable={ false }
          validateOnFocusOut={ true }
          id={ this._stepperId }
          className='textField'
          role='spinbutton'
          aria-labelledby={ label && this._labelId }
          aria-valuemin={ String(this.props.min) }
          aria-valuemax={ String(this.props.max) }
          aria-valuenow={ String(value) }
          onGetErrorMessage={ this._getErrorMessage }
          ref={ this._resolveRef('_textField') }
          onFocus={ this.focus }
          onKeyDown={ this._handleKeyDown }
          onKeyUp={ this._handleKeyUp }
        />
        <span className='arrowBox'>
          <IconButton
            className='upButton'
            disabled={ disabled }
            icon='CaretUpSolid8'
            title='Increase'
            aria-hidden='true'
            onMouseDown={ () => { this._increment() } }
            onMouseLeave={ this._stop }
            onMouseUp={ this._stop }
            onBlur={ this._stop }
            tabIndex={ -1 }
          />
          <IconButton
            className='downButton'
            disabled={ disabled }
            icon='CaretDownSolid8'
            title='Decrease'
            aria-hidden='true'
            onMouseDown={ () => { this._decrement() } }
            onMouseLeave={ this._stop }
            onMouseUp={ this._stop }
            onBlur={ this._stop }
            tabIndex={ -1 }
          />
        </span >
      </ div >
    ) as React.ReactElement<{}>;
  }

  /**
   * OnFocus select the contents of the textField
   */
  public focus() {
    if (this.state.spinning) {
      this._stop();
    }

    this._textField.focus();
    this._textField.select();
  }

  /**
   * Format the unit options passed in so we do not have
   * to think about it when rendering the unit with the value
   */
  private _formatUnitOptions() {
    if (this.props.validUnitOptions == null || this.props.validUnitOptions.length == 0) {
      return;
    }

    this.props.validUnitOptions.forEach(element => {
      this._formattedValidUnitOptions = this._formattedValidUnitOptions.concat(this._normalizeUnit(element));
    });
  }

  /**
   * Normalize the given unit (e.g. if it is only alpha characters
   * and does not start with a space, add a space otherwise
   * do not alter the value)
   * @param unitValue - the unit to normalize
   * @returns the normalized unit
   */
  private _normalizeUnit(unitValue: string): string {

    if (unitValue == null || unitValue.length == 0) {
      return '';
    }

    let formattedUnit: string = unitValue;

    // if our unitValue only contains alpha chars and does not
    // already start with a space, add one
    if (formattedUnit.match('^([a-zA-Z]+)$') && formattedUnit.indexOf(' ') != 0) {
      formattedUnit = String(' ').concat(formattedUnit);
    }

    return formattedUnit;
  }

  /**
   * Returns the currently formatted unit (based off of state)
   */
  private _getCurrentUnit(): string {
    const currentUnitIndex = this.state.currentUnitIndex;

    if (this._formattedValidUnitOptions == null ||
      this._formattedValidUnitOptions.length == 0 ||
      currentUnitIndex >= this._formattedValidUnitOptions.length) {
      return '';
    }
    else if (currentUnitIndex <= -1) {
      return this._formattedValidUnitOptions[0];
    }

    return this._formattedValidUnitOptions[currentUnitIndex];
  }

  /**
   * This is used when validating text entry
   * in the text field (not when changed via the buttons)
   * @param newValue - the pending value to check if it is valid
   * @returns an error message to display to the user, empty string if no error
   */
  private _getErrorMessage(newValue: string): string {
    let errorMessage: string = '';

    if (this._onGetErrorMessage) {
      errorMessage = this._onGetErrorMessage(newValue, this.state, this.props);

      if (errorMessage == '' && Number(newValue) != this.state.value) {
        this.setState({ value: Number(newValue) });
      }

      return errorMessage;
    }

    const {
      value,
      currentUnitIndex,
    } = this.state;

    let valueToSet: number = null;
    let unitIndexToSet: number = null;

    // Attempt to parse the number from the new value,
    // checking against the valid unit options. It returns
    // a tuple of [ <parsedNumber>, <correspondingMatchedUnit> ]
    let parsedNumberInfo: number[] = this._parseNumIfValidSuffix(newValue);

    // Did we get back a well formatted response from the parse?
    if (parsedNumberInfo != null && parsedNumberInfo.length == 2) {
      let parsedNumberValue: number = parsedNumberInfo[0];
      let parsedNumberUnitIndex: number = parsedNumberInfo[1];

      // We have a perspective number value, make sure it is valid
      // before going any further
      if (parsedNumberValue != null &&
        (parsedNumberValue >= this.props.min && parsedNumberValue <= this.props.max)) {
        valueToSet = parsedNumberValue;
      }

      // We have a perspective index into the unit options array, make sure
      // it is valid before going any further
      if (parsedNumberUnitIndex != null && parsedNumberUnitIndex < this._formattedValidUnitOptions.length) {
        unitIndexToSet = parsedNumberUnitIndex;
      }
    }

    // At this point, if parsing the new value was successful,
    // the value and unit index to set should not be null
    if (valueToSet == null || unitIndexToSet == null) {
      errorMessage = `${newValue} is not a valid value`;
    }

    // If the value to set is null, fall back
    // to a known valid value
    if (valueToSet == null) {
      if (value == null) {
        valueToSet = this.props.min;
      }
      else {
        valueToSet = value;
      }
    }

    // If the unit index is null, fall back
    // to a known valid unit index
    if (unitIndexToSet == null) {
      if (currentUnitIndex == null) {
        unitIndexToSet = -1;
      }
      else {
        unitIndexToSet = currentUnitIndex;
      }
    }

    let stateToSet: any = {};

    if (value != valueToSet) {
      assign(stateToSet, { value: valueToSet });
    }

    if (currentUnitIndex != unitIndexToSet) {
      assign(stateToSet, { currentUnitIndex: unitIndexToSet });
    }

    if (stateToSet != {}) {
      this.setState({ ...stateToSet });
    }

    return errorMessage;
  }

  /**
   * Attempt to parse the number and units that
   * the user entered
   * @param value - the value to process
   * @returns a number array of the format:
   * null if we fail to parse the value, or [<parsedNumber>, <correspondingUnitIndex>]
   */
  private _parseNumIfValidSuffix(value: string): number[] {
    if (value == null) {
      return null;
    }

    let valToConvert = value.trim();
    if (valToConvert.length == 0) {
      return null;
    }

    // Check to see if the value is alreay just a number,
    // if so, convert it and return (keeping the current unit)
    if (!isNaN(Number(valToConvert))) {
      return [Number(valToConvert), this.state.currentUnitIndex];
    }

    // if we got a value that is not a number, we better have
    // some valid unit options, otherwise we know this is invalid and we are done
    if (this.props.validUnitOptions == null || this.props.validUnitOptions.length == 0) {
      return null
    }

    let index = -1;
    let optionIndex = 0;

    // loop over the valid unit options to see if we've got a match
    // at the end of the string (after the being trimmed)
    do {
      index = valToConvert.indexOf(this.props.validUnitOptions[optionIndex]);
    } while (index === -1 && ++optionIndex < this.props.validUnitOptions.length);

    // Did we find a valid unit match? If not, return null
    if (index === -1 || index + this.props.validUnitOptions[optionIndex].length != valToConvert.length) {
      return null;
    }

    // If we mad it here we found a matching unit, now
    // parse the number from the value
    let parsedNumbers: string = valToConvert.substring(0, index);
    let numberValue: number = Number(parsedNumbers);

    // Is what we parsed a valid number?
    numberValue = isNaN(numberValue) ? null : numberValue;

    return [numberValue, optionIndex];
  }

  /**
   * Used to increment the current value by the provided step count
   * @param shouldSpin - Should we continue to increment?
   * True by default and useful if we get here from a mousedown event
   * on one of the buttons. False if this fired from a keydown event
   */
  private _increment(shouldSpin: boolean = true) {
    this._updateValueByStep(shouldSpin, true /* increase */);
  }

  /**
   * Used to decrement the current value by the provided step count
   * @param shouldSpin - Should we continue to decrement?
   * True by default and useful if we get here from a mousedown event
   * on one of the buttons. False if this fired from a keydown event
   */
  private _decrement(shouldSpin: boolean = true) {
    this._updateValueByStep(shouldSpin, false /* increase */);
  }

  /**
   * Update (increment or decrement) the current value by the step value (from props)
   * @param shouldSpin - When finished updating, should we spin up another update?
   * (for example, if responding to mousedown should be true so that the value will spin
   * (since only one mousedown fires); but if responding to a keydown this should be false
   * (since keydowns continue to fire as long as the key is depressed))
   * @param increase - Are we increasing the value?
   */
  private _updateValueByStep(shouldSpin: boolean, increase: boolean) {
    if (this.props.disabled) {
      this._stop();
      return;
    }

    let direction: number = increase ? 1 : -1;
    let updatedValue: number = this.state.value + (direction * this.props.step);
    let isnewValueWithinRange: boolean = updatedValue <= this.props.max && updatedValue >= this.props.min;

    // Only update the value if it is valid
    if (isnewValueWithinRange) {
      let stateToSet: any = {};

      assign(stateToSet, { value: updatedValue });

      if (this.state.spinning != shouldSpin) {
        assign(stateToSet, { spinning: shouldSpin })
      }

      if (stateToSet != {}) {
        this.setState({ ...stateToSet });
      }

      // spin up the next update if should spin is true
      if (shouldSpin) {
        this._currentStepFunctionHandle = window.setTimeout(() => { this._updateValueByStep(shouldSpin, increase); }, this._stepDelay);
        return;
      }
    }

    this._stop();
  }

  /**
   * Stop spinning (clear any currently pending update and set spinning to false)
   */
  private _stop() {
    if (this._currentStepFunctionHandle != null) {
      window.clearTimeout(this._currentStepFunctionHandle);
      this._currentStepFunctionHandle == 0;
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
      return;
    }

    if (event.which === KeyCodes.up) {
      this._increment(false /* shouldSpin */);
    }
    else if (event.which === KeyCodes.down) {
      this._decrement(false /* shouldSpin */);
    }

    else if (event.which === KeyCodes.enter) {
      event.currentTarget.blur();
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