import * as React from 'react';
import { ITextFieldProps } from './TextField.Props';
import { Label } from '../../Label';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';
import './TextField.scss';

export interface ITextFieldState {
  value?: string;

  /** Is true when the control has focus. */
  isFocused?: boolean;
}

export class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
  public static defaultProps: ITextFieldProps = {
    multiline: false,
    resizable: true,
    underlined: false,
    onChanged: () => { /* noop */ },
    errorMessage: ''
  };

  private _id: string;
  private _descriptionId: string;
  private _field;

  public constructor(props: ITextFieldProps) {
    super(props);

    this._id = getId('TextField');
    this._descriptionId = getId('TextFieldDescription');

    this.state = {
      value: props.value || props.defaultValue,
      isFocused: false
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  /**
   * Gets the current value of the text field.
   */
  public get value(): string {
    return this.state.value;
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
    }
  }

  public render() {
    let { disabled, required, multiline, underlined, label, description, iconClass, className, errorMessage } = this.props;
    let { isFocused } = this.state;

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
    let textFieldClassName: string;

    if (this.props.multiline && !this.props.resizable) {
      textFieldClassName = 'ms-TextField-field ms-TextField-field--unresizable';
    } else {
      textFieldClassName = 'ms-TextField-field';
    }

    return css(textFieldClassName, {
      'ms-TextField-invalid': !!this.props.errorMessage
    });
  }

  private _renderTextArea(): React.ReactElement<React.HTMLProps<HTMLAreaElement>> {
    return (
      <textarea
        id={ this._id }
        ref={ (c): HTMLTextAreaElement => this._field = c }
        value={ this.state.value }
        defaultValue={ this.props.defaultValue }
        onChange={ this._onInputChange }
        className={ this._fieldClassName }
        aria-label={ this.props.ariaLabel }
        aria-describedby={ this._descriptionId }
        aria-invalid={ !!this.props.errorMessage }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
        />
    );
  }

  private _renderInput(): React.ReactElement<React.HTMLProps<HTMLInputElement>> {
    return (
      <input
        id={ this._id }
        type='text'
        ref={ (c): HTMLInputElement => this._field = c }
        value={ this.state.value }
        defaultValue={ this.props.defaultValue }
        onChange={ this._onInputChange }
        className={ this._fieldClassName }
        aria-label={ this.props.ariaLabel }
        aria-describedby={ this._descriptionId }
        aria-invalid={ !!this.props.errorMessage }
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
  }
}
