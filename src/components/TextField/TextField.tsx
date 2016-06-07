import * as React from 'react';
import { ITextFieldProps } from './TextField.Props';
import { Label } from '../../Label';
import { css } from '../../utilities/css';
import { Async } from '../../utilities/Async/Async';
import './TextField.scss';

export interface ITextFieldState {
  value: string;

  /**
   * The validation error message.
   *
   * - If there is no validation error or we have not validated the input value, errorMessage is an empty string.
   * - If we have done the validation and there is validation error, errorMessage is the validation error message.
   */
  errorMessage: string;
}

let _instance: number = 0;

export class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
  public static defaultProps: ITextFieldProps = {
    multiline: false,
    underlined: false,
    onChanged: () => { /* noop */ },
    onBeforeChange: () => { /* noop */ },
    onNotifyValidationResult: () => { /* noop */ },
    onGetErrorMessage: () => undefined,
    deferredValidationTime: 200,
    errorMessage: ''
  };

  public refs: {
    [key: string]: React.ReactInstance;
    field: HTMLInputElement;
  };

  private _id: string;
  private _descriptionId: string;
  private _async: Async;
  private _delayedValidate: (value: string) => void;
  private _isMounted: boolean;
  private _lastValidation: number;
  private _latestValidateValue;
  private _willMountTriggerValidation;

  public constructor(props: ITextFieldProps) {
    super(props);

    this._id = `TextField-${ _instance++ }`;
    this._descriptionId = `TextFieldDescription-${ _instance++ }`;
    this._async = new Async(this);

    this.state = {
      value: props.value,
      errorMessage: ''
    };

    this._onInputChange = this._onInputChange.bind(this);

    this._delayedValidate = this._async.debounce(this._validate, this.props.deferredValidationTime);
    this._lastValidation = 0;
    this._latestValidateValue = '';
    this._willMountTriggerValidation = false;
  }

  public componentWillMount() {
    this._willMountTriggerValidation = true;
    this._validate(this.state.value);
  }

  public componentDidMount() {
    this._isMounted = true;
  }

  public componentWillReceiveProps(newProps: ITextFieldProps) {
    if (newProps.value !== this.props.value
        && newProps.value !== this.state.value) {
      this.setState({
        value: newProps.value
      } as ITextFieldState);
      const { onBeforeChange } = this.props;
      onBeforeChange(newProps.value);
      this._delayedValidate(newProps.value);
    }
  }

  public componentWillUnmount() {
    this._async.dispose();
    this._isMounted = false;
  }

  public render() {
    let { disabled, required, multiline, underlined, label, description, iconClass, className } = this.props;
    const errorMessage: string = this._errorMessage;

    const textFieldClassName = css('ms-TextField', className, {
      'is-required': required,
      'is-disabled': disabled,
      'ms-TextField--multiline': multiline,
      'ms-TextField--underlined': underlined
    });

    return (
      <div className={ textFieldClassName }>
        { label && <Label htmlFor={ this._id }>{ label }</Label> }
        { iconClass && <i className={ iconClass }></i> }
        { multiline ? this._renderTextArea() : this._renderInput() }
        { errorMessage && <p className='ms-TextField-errorMessage ms-u-slideDownIn20'>{ errorMessage }</p> }
        { errorMessage && <div aria-live='assertive' className='ms-u-screenReaderOnly' data-automation-id='error-message'>{ errorMessage }</div> }
        { description && <span className='ms-TextField-description'>{ description }</span> }
        { this.props.ariaLabel && <span id={ this._descriptionId } className='ms-TextField-hidden'>{ this.props.ariaLabel }</span> }
      </div>
    );
  }

  public focus() {
    if (this.refs.field) {
      this.refs.field.focus();
    }
  }

  private get _fieldClassName(): string {
    const errorMessage: string = this._errorMessage;
    return css('ms-TextField-field', {
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
    return (
      <textarea
        { ...this.props }
        id={ this._id }
        ref='field'
        value={ this.state.value }
        onChange={ this._onInputChange }
        className={ this._fieldClassName }
        />
    );
  }

  private _renderInput(): React.ReactElement<React.HTMLProps<HTMLInputElement>> {
    return (
      <input
        { ...this.props }
        id={ this._id }
        type='text'
        ref='field'
        value={ this.state.value }
        onChange={ this._onInputChange }
        className={ this._fieldClassName }
        aria-describedby={ this._descriptionId }
        />
    );
  }

  private _onInputChange(event: React.KeyboardEvent): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;

    this.setState({
      value
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
    const { onNotifyValidationResult } = this.props;
    if (!this._willMountTriggerValidation) {
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
