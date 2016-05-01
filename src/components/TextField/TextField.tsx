import * as React from 'react';
import Label from '../Label/index';
import './TextField.scss';
import { css } from '../../utilities/css';
import Async from '../../utilities/Async/Async';
import { ITextFieldProps } from './TextField.Props';

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

export default class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
  public static initialProps: ITextFieldProps = {
    disabled: false,
    required: false,
    multiline: false,
    underlined: false
  };

  public refs: {
    [key: string]: React.ReactInstance;
    multilineText: HTMLInputElement;
    singlelineText: HTMLInputElement;
  };

  private _id: string;
  private _descriptionId: string;
  private _async: Async;
  private _delayedValidate: (value: string) => void;

  public constructor(props: ITextFieldProps) {
    super(props);

    this._id = `TextField-${ _instance++ }`;
    this._descriptionId = `TextFieldDescription-${ _instance++ }`;
    this._async = new Async(this);

    this.state = {
      value: props.value || '',
      errorMessage: ''
    };

    this._handleFieldChanged = this._handleFieldChanged.bind(this);

    this._delayedValidate = this._async.debounce(this._validate, 200);
  }

  public componentWillReceiveProps(newProps: ITextFieldProps) {
    if (newProps.value !== undefined) {
      this.setState({
        value: newProps.value
      } as ITextFieldState);
    }
  }

  public componentWillUnmount() {
    this._async.dispose();
  }

  public render() {
    let { disabled, required, multiline, underlined, label, description, iconClass, className } = this.props;
    let { errorMessage } = this.state;

    const textFieldClassName = css('ms-TextField', className, {
      'is-required': required,
      'is-disabled': disabled,
      'ms-TextField--multiline': multiline,
      'ms-TextField--underlined': underlined
    });

    return (
      <div
        { ...this.props }
        className={ textFieldClassName }
      >
        { label ? <Label htmlFor={ this._id }>{ label }</Label> : null }
        { iconClass ? <i className={ iconClass }></i> : null }
        { multiline ? this._textAreaElement : this._inputElement }
        { errorMessage ? <p className='ms-TextField-errorMessage ms-u-slideDownIn20'>{ errorMessage }</p> : null }
        { errorMessage ? <div aria-live='assertive' className='ms-u-screenReaderOnly'>{ errorMessage }</div> : null }
        { description ? <span className='ms-TextField-description'>{ description }</span> : null }
        { this.props.children }
        { this.props.ariaLabel ? <span id={ this._descriptionId } className='ms-TextField-hidden'>{ this.props.ariaLabel }</span> : null}
      </div>
    );
  }

  public focus() {
    let { multiline } = this.props;

    if (multiline && this.refs.multilineText) {
      this.refs.multilineText.focus();
    } else if (!multiline && this.refs.singlelineText) {
      this.refs.singlelineText.focus();
    }
  }

  private get _fieldClassName(): string {
    return css('ms-TextField-field', {
      'ms-TextField-invalid': !!this.state.errorMessage
    });
  }

  private get _textAreaElement(): React.ReactElement<React.HTMLProps<HTMLAreaElement>> {
    return (
      <textarea
        id={ this._id }
        ref='multilineText'
        value={ this.state.value }
        onChange={ this._handleFieldChanged }
        className={ this._fieldClassName }
        readOnly={ this.props.readOnly }
      />
    );
  }

  private get _inputElement(): React.ReactElement<React.HTMLProps<HTMLInputElement>> {
    return (
      <input
        id={ this._id }
        type='text'
        placeholder={ this.props.placeholder }
        ref='singlelineText'
        value={ this.state.value }
        onChange={ this._handleFieldChanged }
        className={ this._fieldClassName }
        aria-describedby={ this._descriptionId }
        readOnly={ this.props.readOnly }
      />
    );
  }

  private _handleFieldChanged(event: React.KeyboardEvent): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;
    const { onChanged, onGetErrorMessage } = this.props;

    this.setState({
      value
    } as ITextFieldState);

    // If there is no `onGetErrorMessage` prop, no need to setTimeout to validate.
    if (onGetErrorMessage) {
      this._delayedValidate(value);
    }

    if (onChanged) {
      onChanged(value);
    }
  }

  private _validate(value: string): void {
    let { onGetErrorMessage } = this.props;

    this.setState({
      errorMessage: onGetErrorMessage && onGetErrorMessage(value)
    } as ITextFieldState);
  }
}
