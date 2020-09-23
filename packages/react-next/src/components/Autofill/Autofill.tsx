import * as React from 'react';
import { IAutofillProps, IAutofill } from './Autofill.types';
import { KeyCodes, getNativeProps, inputProperties, isIE11, Async, initializeComponentRef } from '../../Utilities';

export interface IAutofillState {
  displayValue?: string;
}

const SELECTION_FORWARD = 'forward';
const SELECTION_BACKWARD = 'backward';

/**
 * {@docCategory Autofill}
 */
export class Autofill extends React.Component<IAutofillProps, IAutofillState> implements IAutofill {
  public static defaultProps = {
    enableAutofillOnKeyPress: [KeyCodes.down, KeyCodes.up] as KeyCodes[],
  };

  private _inputElement = React.createRef<HTMLInputElement>();
  private _autoFillEnabled = true;
  private _value: string;
  private _isComposing: boolean = false;
  private _async: Async;

  constructor(props: IAutofillProps) {
    super(props);

    initializeComponentRef(this);
    this._async = new Async(this);

    this._value = props.defaultVisibleValue || '';
    this.state = {
      displayValue: props.defaultVisibleValue || '',
    };
  }

  public get cursorLocation(): number | null {
    if (this._inputElement.current) {
      const inputElement = this._inputElement.current;
      if (inputElement.selectionDirection !== SELECTION_FORWARD) {
        return inputElement.selectionEnd;
      } else {
        return inputElement.selectionStart;
      }
    } else {
      return -1;
    }
  }

  public get isValueSelected(): boolean {
    return Boolean(this.inputElement && this.inputElement.selectionStart !== this.inputElement.selectionEnd);
  }

  public get value(): string {
    return this._value;
  }

  public get selectionStart(): number | null {
    return this._inputElement.current ? this._inputElement.current.selectionStart : -1;
  }

  public get selectionEnd(): number | null {
    return this._inputElement.current ? this._inputElement.current.selectionEnd : -1;
  }

  public get inputElement(): HTMLInputElement | null {
    return this._inputElement.current;
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IAutofillProps): void {
    if (this.props.updateValueInWillReceiveProps) {
      const updatedInputValue = this.props.updateValueInWillReceiveProps();
      // Don't update if we have a null value or the value isn't changing
      // the value should still update if an empty string is passed in
      if (updatedInputValue !== null && updatedInputValue !== this._value) {
        this._value = updatedInputValue;
      }
    }

    const newDisplayValue = this._getDisplayValue(this._value, nextProps.suggestedDisplayValue);

    if (typeof newDisplayValue === 'string') {
      this.setState({ displayValue: newDisplayValue });
    }
  }

  public componentDidUpdate() {
    const value = this._value;
    const { suggestedDisplayValue, shouldSelectFullInputValueInComponentDidUpdate, preventValueSelection } = this.props;
    let differenceIndex = 0;

    if (preventValueSelection) {
      return;
    }

    if (
      this._autoFillEnabled &&
      value &&
      suggestedDisplayValue &&
      this._doesTextStartWith(suggestedDisplayValue, value)
    ) {
      let shouldSelectFullRange = false;

      if (shouldSelectFullInputValueInComponentDidUpdate) {
        shouldSelectFullRange = shouldSelectFullInputValueInComponentDidUpdate();
      }

      if (shouldSelectFullRange && this._inputElement.current) {
        this._inputElement.current.setSelectionRange(0, suggestedDisplayValue.length, SELECTION_BACKWARD);
      } else {
        while (
          differenceIndex < value.length &&
          value[differenceIndex].toLocaleLowerCase() === suggestedDisplayValue[differenceIndex].toLocaleLowerCase()
        ) {
          differenceIndex++;
        }
        if (differenceIndex > 0 && this._inputElement.current) {
          this._inputElement.current.setSelectionRange(
            differenceIndex,
            suggestedDisplayValue.length,
            SELECTION_BACKWARD,
          );
        }
      }
    }
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render(): JSX.Element {
    const { displayValue } = this.state;

    const nativeProps = getNativeProps<React.InputHTMLAttributes<HTMLInputElement>>(this.props, inputProperties);
    return (
      <input
        autoCapitalize="off"
        autoComplete="off"
        aria-autocomplete={'both'}
        {...nativeProps}
        ref={this._inputElement}
        value={displayValue}
        onCompositionStart={this._onCompositionStart}
        onCompositionUpdate={this._onCompositionUpdate}
        onCompositionEnd={this._onCompositionEnd}
        // TODO (Fabric 8?) - switch to calling only onChange. See notes in TextField._onInputChange.
        onChange={this._onChanged}
        onInput={this._onInputChanged}
        onKeyDown={this._onKeyDown}
        onClick={this.props.onClick ? this.props.onClick : this._onClick}
        data-lpignore={true}
      />
    );
  }

  public focus() {
    this._inputElement.current && this._inputElement.current.focus();
  }

  public clear() {
    this._autoFillEnabled = true;
    this._updateValue('', false);
    this._inputElement.current && this._inputElement.current.setSelectionRange(0, 0);
  }

  // Composition events are used when the character/text requires several keystrokes to be completed.
  // Some examples of this are mobile text input and langauges like Japanese or Arabic.
  // Find out more at https://developer.mozilla.org/en-US/docs/Web/Events/compositionstart
  private _onCompositionStart = (ev: React.CompositionEvent<HTMLInputElement>) => {
    this._isComposing = true;
    this._autoFillEnabled = false;
  };

  // Composition events are used when the character/text requires several keystrokes to be completed.
  // Some examples of this are mobile text input and languages like Japanese or Arabic.
  // Find out more at https://developer.mozilla.org/en-US/docs/Web/Events/compositionstart
  private _onCompositionUpdate = () => {
    if (isIE11()) {
      this._updateValue(this._getCurrentInputValue(), true);
    }
  };

  // Composition events are used when the character/text requires several keystrokes to be completed.
  // Some examples of this are mobile text input and langauges like Japanese or Arabic.
  // Find out more at https://developer.mozilla.org/en-US/docs/Web/Events/compositionstart
  private _onCompositionEnd = (ev: React.CompositionEvent<HTMLInputElement>) => {
    const inputValue = this._getCurrentInputValue();
    this._tryEnableAutofill(inputValue, this.value, false, true);
    this._isComposing = false;
    // Due to timing, this needs to be async, otherwise no text will be selected.
    this._async.setTimeout(() => {
      // it's technically possible that the value of _isComposing is reset during this timeout,
      // so explicitly trigger this with composing=true here, since it is supposed to be the
      // update for composition end
      this._updateValue(this._getCurrentInputValue(), false);
    }, 0);
  };

  private _onClick = () => {
    if (this._value && this._value !== '' && this._autoFillEnabled) {
      this._autoFillEnabled = false;
    }
  };

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    // If the event is actively being composed, then don't alert autofill.
    // Right now typing does not have isComposing, once that has been fixed any should be removed.

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(ev.nativeEvent as any).isComposing) {
      switch (ev.which) {
        case KeyCodes.backspace:
          this._autoFillEnabled = false;
          break;
        case KeyCodes.left:
        case KeyCodes.right:
          if (this._autoFillEnabled) {
            this._value = this.state.displayValue!;
            this._autoFillEnabled = false;
          }
          break;
        default:
          if (!this._autoFillEnabled) {
            if (this.props.enableAutofillOnKeyPress!.indexOf(ev.which) !== -1) {
              this._autoFillEnabled = true;
            }
          }
          break;
      }
    }
  };

  private _onInputChanged = (ev: React.FormEvent<HTMLElement>) => {
    const value: string = this._getCurrentInputValue(ev);

    if (!this._isComposing) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._tryEnableAutofill(value, this._value, (ev.nativeEvent as any).isComposing);
    }

    // If it is not IE11 and currently composing, update the value
    if (!(isIE11() && this._isComposing)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nativeEventComposing = (ev.nativeEvent as any).isComposing;
      const isComposing = nativeEventComposing === undefined ? this._isComposing : nativeEventComposing;
      this._updateValue(value, isComposing);
    }
  };

  private _onChanged = (): void => {
    // Swallow this event, we don't care about it
    // We must provide it because React PropTypes marks it as required, but onInput serves the correct purpose
    return;
  };

  private _getCurrentInputValue(ev?: React.FormEvent<HTMLElement>): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (ev && ev.target && (ev.target as any).value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (ev.target as any).value;
    } else if (this.inputElement && this.inputElement.value) {
      return this.inputElement.value;
    } else {
      return '';
    }
  }

  /**
   * Attempts to enable autofill. Whether or not autofill is enabled depends on the input value,
   * whether or not any text is selected, and only if the new input value is longer than the old input value.
   * Autofill should never be set to true if the value is composing. Once compositionEnd is called, then
   * it should be completed.
   * See https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent for more information on composition.
   * @param newValue - new input value
   * @param oldValue - old input value
   * @param isComposing - if true then the text is actively being composed and it has not completed.
   * @param isComposed - if the text is a composed text value.
   */
  private _tryEnableAutofill(newValue: string, oldValue: string, isComposing?: boolean, isComposed?: boolean): void {
    if (
      !isComposing &&
      newValue &&
      this._inputElement.current &&
      this._inputElement.current.selectionStart === newValue.length &&
      !this._autoFillEnabled &&
      (newValue.length > oldValue.length || isComposed)
    ) {
      this._autoFillEnabled = true;
    }
  }

  private _notifyInputChange(newValue: string, composing: boolean): void {
    if (this.props.onInputValueChange) {
      this.props.onInputValueChange(newValue, composing);
    }
  }

  /**
   * Updates the current input value as well as getting a new display value.
   * @param newValue - The new value from the input
   */
  private _updateValue = (newValue: string, composing: boolean) => {
    // Only proceed if the value is nonempty and is different from the old value
    // This is to work around the fact that, in IE 11, inputs with a placeholder fire an onInput event on focus
    if (!newValue && newValue === this._value) {
      return;
    }
    this._value = this.props.onInputChange ? this.props.onInputChange(newValue, composing) : newValue;
    this.setState(
      {
        displayValue: this._getDisplayValue(this._value, this.props.suggestedDisplayValue),
      },
      () => this._notifyInputChange(this._value, composing),
    );
  };

  /**
   * Returns a string that should be used as the display value.
   * It evaluates this based on whether or not the suggested value starts with the input value
   * and whether or not autofill is enabled.
   * @param inputValue - the value that the input currently has.
   * @param suggestedDisplayValue - the possible full value
   */
  private _getDisplayValue(inputValue: string, suggestedDisplayValue?: string): string {
    let displayValue = inputValue;
    if (
      suggestedDisplayValue &&
      inputValue &&
      this._doesTextStartWith(suggestedDisplayValue, displayValue) &&
      this._autoFillEnabled
    ) {
      displayValue = suggestedDisplayValue;
    }
    return displayValue;
  }

  private _doesTextStartWith(text: string, startWith: string): boolean {
    if (!text || !startWith) {
      return false;
    }
    return text.toLocaleLowerCase().indexOf(startWith.toLocaleLowerCase()) === 0;
  }
}
