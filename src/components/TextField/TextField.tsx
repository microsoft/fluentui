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
  id?: string;
  descriptionId?: string;
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

  private _async: Async;
  private _delayedValidate: (value: string) => void;
  private _isMounted: boolean;
  private _lastValidation: number;

  public constructor(props: ITextFieldProps) {
    super(props);

    this._async = new Async(this);

    this.state = {
      value: props.value || '',
      id: `TextField-${ _instance++ }`,
      errorMessage: '',
      descriptionId : `TextFieldDescription-${ _instance++ }`
    };

    this._onMultilineTextChanged = this._onMultilineTextChanged.bind(this);
    this._onSinglelineTextChanged = this._onSinglelineTextChanged.bind(this);

    this._delayedValidate = this._async.debounce(this._validate, 200);
    this._lastValidation = 0;
  }

  public componentDidMount() {
    this._isMounted = true;
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
    this._isMounted = false;
  }

  public render() {
    let { disabled, required, multiline, placeholder, underlined, label, description, iconClass, className, readOnly } = this.props;
    let { value, id, errorMessage, descriptionId } = this.state;

    return (
      <div
        { ...this.props }
        className={
          css('ms-TextField', className, {
            'is-required': required,
            'is-disabled': disabled,
            'ms-TextField--multiline': multiline,
            'ms-TextField--underlined': underlined
          })
        }
      >
        { label ? <Label htmlFor={ id }>{ label }</Label> : null }
        { iconClass ? <i className={ iconClass }></i> : null }
        {
          multiline
            ? <textarea
                id={ id }
                ref='multilineText'
                value={ value }
                onChange={ this._onMultilineTextChanged }
                className={
                  css('ms-TextField-field', {
                    'ms-TextField-invalid': !!errorMessage
                  })
                }
                readOnly={ readOnly }
              />
            : <input
                id={ id }
                placeholder={ placeholder }
                ref='singlelineText'
                value={ value }
                onChange={ this._onSinglelineTextChanged }
                className={
                  css('ms-TextField-field', {
                    'ms-TextField-invalid': !!errorMessage
                  })
                }
                aria-describedby={ descriptionId }
                readOnly={ readOnly }
              />
        }
        { errorMessage ? <p className='ms-TextField-errorMessage ms-u-slideDownIn20'>{ errorMessage }</p> : null }
        { errorMessage ? <div aria-live='assertive' className='ms-u-screenReaderOnly'>{ errorMessage }</div> : null }
        { description ? <span className='ms-TextField-description'>{ description }</span> : null }
        { this.props.children }
        { this.props.ariaLabel ? <span id={ descriptionId } className='ms-TextField-hidden'>{ this.props.ariaLabel }</span> : null}
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

  private _onMultilineTextChanged(ev: React.KeyboardEvent): void {
    let { onGetErrorMessage } = this.props;

    if (onGetErrorMessage) {
      this._delayedValidate(this.refs.multilineText.value);
    }

    this.setState({
      value: this.refs.multilineText.value
    } as ITextFieldState);

    this._onChanged(this.refs.multilineText.value);
  }

  private _onSinglelineTextChanged(ev: React.KeyboardEvent): void {
    let { onGetErrorMessage } = this.props;

    if (onGetErrorMessage) {
      this._delayedValidate(this.refs.singlelineText.value);
    }

    this.setState({
      value: this.refs.singlelineText.value
    } as ITextFieldState);

    this._onChanged(this.refs.singlelineText.value);
  }

  private _validate(value: string): void {
    let { onGetErrorMessage } = this.props;

    if (onGetErrorMessage) {
      let result: string | Promise<any> = onGetErrorMessage(value);

      if (typeof result === 'string') {
        this.setState({
          errorMessage: result
        } as ITextFieldState);
      } else {
        let currentValidation: number = ++this._lastValidation;

        result.then(
          () => {
            if (this._isMounted && currentValidation === this._lastValidation) {
              this.setState({
                errorMessage: ''
              } as ITextFieldState);
            }
          },
          (error: any) => {
            if (this._isMounted && currentValidation === this._lastValidation) {
              this.setState({
                errorMessage: error.message
              } as ITextFieldState);
            }
          }
        );
      }
    }
  }

  private _onChanged(newValue: string): void {
    let { onChanged } = this.props;

    if (onChanged) {
      onChanged(newValue);
    }
  }
}
