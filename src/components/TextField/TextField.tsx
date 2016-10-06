import * as React from 'react';
import { ITextFieldProps } from './TextField.Props';
import { Label } from '../../Label';
import {
  Async,
  getId,
  css,
  getNativeProps,
  inputProperties,
  textAreaProperties
} from '../../Utilities';
import './TextField.scss';

export interface ITextFieldState {
  value?: string;

  /** Is true when the control has focus. */
  isFocused?: boolean;

  /**
   * The validation error message.
   *
   * - If there is no validation error or we have not validated the input value, errorMessage is an empty string.
   * - If we have done the validation and there is validation error, errorMessage is the validation error message.
   */
  errorMessage?: string;
}

export class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
  public static defaultProps: ITextFieldProps = {
    multiline: false,
    resizable: true,
    underlined: false,
    onChanged: () => { /* noop */ },
    onBeforeChange: () => { /* noop */ },
    onNotifyValidationResult: () => { /* noop */ },
    onGetErrorMessage: () => undefined,
    deferredValidationTime: 200,
    errorMessage: ''
  };

  private _id: string;
  private _descriptionId: string;
  private _async: Async;
  private _delayedValidate: (value: string) => void;
  private _isMounted: boolean;
  private _lastValidation: number;
  private _latestValidateValue;
  private _willMountTriggerValidation;
  private _field;

  public constructor(props: ITextFieldProps) {
    super(props);

    this._id = getId('TextField');
    this._descriptionId = getId('TextFieldDescription');
    this._async = new Async(this);

    this.state = {
      value: props.value || props.defaultValue || '',
      isFocused: false,
      errorMessage: ''
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);

    this._delayedValidate = this._async.debounce(this._validate, this.props.deferredValidationTime);
    this._lastValidation = 0;
    this._willMountTriggerValidation = false;
  }

  /**
   * Gets the current value of the text field.
   */
  public get value(): string {
    return this.state.value;
  }

  public componentWillMount() {
    this._willMountTriggerValidation = true;
    this._validate(this.state.value);
  }

  public componentDidMount() {
    this._isMounted = true;
  }

  public componentWillReceiveProps(newProps: ITextFieldProps) {
    const { onBeforeChange } = this.props;

    if (newProps.value !== undefined && newProps.value !== this.state.value) {
      if (onBeforeChange) {
        onBeforeChange(newProps.value);
      }

      this.setState({
        value: newProps.value,
        errorMessage: ''
      } as ITextFieldState);

      this._delayedValidate(newProps.value);
    }
  }

  public componentWillUnmount() {
    this._async.dispose();
    this._isMounted = false;
  }

  public render() {
    let { disabled, required, multiline, underlined, label, description, iconClass, className } = this.props;
    let { isFocused } = this.state;
    const errorMessage: string = this._errorMessage;

    const textFieldClassName = css('ms-TextField', className, {
      'is-required': required,
      'is-disabled': disabled,
      'is-active': isFocused,
      'ms-TextField--multiline': multiline,
      'ms-TextField--underlined': underlined
    });

    return (
      <div className={ textFieldClassName }>
        { label && <Label htmlFor={ this._id }>{ label }</Label> }
        { iconClass && <i className={ iconClass }></i> }
        { multiline ? this._renderTextArea() : this._renderInput() }
        { errorMessage && <div aria-live='assertive' className='ms-u-screenReaderOnly' data-automation-id='error-message'>{ errorMessage }</div> }
        { (description || errorMessage) &&
          <span id={ this._descriptionId }>
            { description && <span className='ms-TextField-description'>{ description }</span> }
            { errorMessage && <p className='ms-TextField-errorMessage ms-u-slideDownIn20'>{ errorMessage }</p> }
          </span>
        }
      </div>
    );
  }

  /**
   * Sets focus on the text field
   */
  public focus() {
    if (this._field) {
      this._field.focus();
    }
  }

  /**
   * Selects the text field
   */
  public select() {
    if (this._field) {
      this._field.select();
    }
  }

  /**
   * Sets the selection start of the text field to a specified value
   */
  public setSelectionStart(value: number) {
    if (this._field) {
      this._field.selectionStart = value;
    }
  }

  /**
   * Sets the selection end of the text field to a specified value
   */
  public setSelectionEnd(value: number) {
    if (this._field) {
      this._field.selectionEnd = value;
    }
  }

  private _onFocus(ev: React.FocusEvent) {
    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }

    this.setState({ isFocused: true });
  }

  private _onBlur(ev: React.FocusEvent) {
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }

    this.setState({ isFocused: false });
  }

  private get _fieldClassName(): string {
    const errorMessage: string = this._errorMessage;
    let textFieldClassName: string;

    if (this.props.multiline && !this.props.resizable) {
      textFieldClassName = 'ms-TextField-field ms-TextField-field--unresizable';
    } else {
      textFieldClassName = 'ms-TextField-field';
    }

    return css(textFieldClassName, {
      'ms-TextField-invalid': !!errorMessage
    });
  }

  private get _errorMessage(): string {
    let { errorMessage } = this.state;
    if (!errorMessage) {
      errorMessage = this.props.errorMessage;
    }

    return errorMessage;
  }

  private _renderTextArea(): React.ReactElement<React.HTMLProps<HTMLAreaElement>> {
    let textAreaProps = getNativeProps(this.props, textAreaProperties);

    return (
      <textarea
        { ...textAreaProps }
        id={ this._id }
        ref={ (c): HTMLTextAreaElement => this._field = c }
        value={ this.state.value }
        onChange={ this._onInputChange }
        className={ this._fieldClassName }
        aria-label={ this.props.ariaLabel }
        aria-describedby={ this._descriptionId }
        aria-invalid={ !!this.state.errorMessage }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
        />
    );
  }

  private _renderInput(): React.ReactElement<React.HTMLProps<HTMLInputElement>> {
    let inputProps = getNativeProps(this.props, inputProperties);

    return (
      <input
        { ...inputProps }
        id={ this._id }
        type='text'
        ref={ (c): HTMLInputElement => this._field = c }
        value={ this.state.value }
        onChange={ this._onInputChange }
        className={ this._fieldClassName }
        aria-label={ this.props.ariaLabel }
        aria-describedby={ this._descriptionId }
        aria-invalid={ !!this.state.errorMessage }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
        />
    );
  }

  private _onInputChange(event: React.KeyboardEvent): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;

    this.setState({
      value: value,
      errorMessage: ''
    } as ITextFieldState);
    this._willMountTriggerValidation = false;
    this._delayedValidate(value);
    const { onBeforeChange } = this.props;
    onBeforeChange(value);
  }

  private _validate(value: string): void {
    // In case of _validate called multi-times during executing validate logic with promise return.
    if (this._latestValidateValue === value) {
      return;
    }

    this._latestValidateValue = value;
    let { onGetErrorMessage } = this.props;
    let result: string | PromiseLike<string> = onGetErrorMessage(value || '');

    if (result !== undefined) {
      if (typeof result === 'string') {
        this.setState({
          errorMessage: result
        } as ITextFieldState);
        this._notifyAfterValidate(value, result);
      } else {
        let currentValidation: number = ++this._lastValidation;

        result.then((errorMessage: string) => {
          if (this._isMounted && currentValidation === this._lastValidation) {
            this.setState({ errorMessage } as ITextFieldState);
          }
          this._notifyAfterValidate(value, errorMessage);
        });
      }
    } else {
      this._notifyAfterValidate(value, '');
    }
  }

  private _notifyAfterValidate(value: string, errorMessage: string): void {
    if (!this._willMountTriggerValidation && value === this.state.value) {
      const { onNotifyValidationResult } = this.props;
      onNotifyValidationResult(errorMessage, value);
      if (!errorMessage) {
        const { onChanged } = this.props;
        onChanged(value);
      }
    } else {
      this._willMountTriggerValidation = false;
    }
  }
}
