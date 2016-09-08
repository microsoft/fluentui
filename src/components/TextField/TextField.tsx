import * as React from 'react';
import { ITextField } from './ITextField';
import { ITextFieldProps } from './TextField.Props';
import { BaseComponent } from '../../common/BaseComponent';
import { Label } from '../../Label';
import { css } from '../../utilities/css';
import { getId, assign } from '../../utilities/object';
import { autobind } from '../../utilities/autobind';
import './TextField.scss';

export interface ITextFieldState {
  /** value of the uncontrolled TextField */
  value?: string;

  /** Is true when the control has focus. */
  isFocused?: boolean;
}

export class TextField extends BaseComponent<ITextFieldProps, ITextFieldState> implements ITextField {
  public static defaultProps: ITextFieldProps = {
    multiline: false,
    resizable: true,
    underlined: false,
    onChanged: () => { /* noop */ },
    errorMessage: ''
  };

  private _id: string;
  private _descriptionId: string;
  private _input: HTMLInputElement;

  public constructor(props: ITextFieldProps) {
    super(props);

    this._id = getId('TextField');
    this._descriptionId = getId('TextField-Description');

    this.state = {
      value: props.defaultValue || '',
      isFocused: false
    };
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
    const {
      disabled,
      required,
      multiline,
      underlined,
      label,
      description,
      iconClass,
      className,
      errorMessage,
      inputProps,
      placeholder
    } = this.props;
    const { isFocused } = this.state;

    const textFieldClassName = css('ms-TextField', className, {
      'is-required': required,
      'is-disabled': disabled,
      'is-active': isFocused,
      'ms-TextField--multiline': multiline,
      'ms-TextField--underlined': underlined
    });

    const inputElement = React.createElement(multiline ? 'textarea' : 'input', assign(
      {},
      inputProps,
      {
        id: this._id,
        ref: this._resolveRef('_input'),
        value: this.props.value || this.state.value,
        onChange: this._onInputChange,
        className: this._inputClassName,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        'aria-label': this.props.ariaLabel,
        'aria-describedby': this._descriptionId,
        'aria-invalid': !!this.props.errorMessage,
      },
      multiline ? null : { type: 'text', placeholder }
    ));

    return (
      <div className={ textFieldClassName }>
        { label && <Label htmlFor={ this._id }>{ label }</Label> }
        { iconClass && <i className={ iconClass }></i> }
        { inputElement }
        { errorMessage && <div aria-live='assertive' className='ms-u-screenReaderOnly' data-automation-id='error-message'>
          { errorMessage }
        </div> }
        { (description || errorMessage) &&
          <span id={ this._descriptionId }>
            { description && <span className='ms-TextField-description'>{ description }</span> }
            { errorMessage && <p className='ms-TextField-errorMessage ms-u-slideDownIn20'>{ errorMessage }</p> }
          </span>
        }
      </div>
    );
  }

  public get value(): string {
    return this._input ? this._input.value : '';
  }

  /**
   * Sets focus on the text field
   */
  public focus() {
    if (this._input) {
      this._input.focus();
    }
  }

  /**
   * Selects the text field
   */
  public select() {
    if (this._input) {
      this._input.select();
    }
  }

  /**
   * Sets the selection start of the text field to a specified value
   */
  public setSelectionStart(value: number) {
    if (this._input) {
      this._input.selectionStart = value;
    }
  }

  /**
   * Sets the selection end of the text field to a specified value
   */
  public setSelectionEnd(value: number) {
    if (this._input) {
      this._input.selectionEnd = value;
    }
  }

  @autobind
  private _onFocus(ev: React.FocusEvent) {
    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }

    this.setState({ isFocused: true });
  }

  @autobind
  private _onBlur(ev: React.FocusEvent) {
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }

    this.setState({ isFocused: false });
  }

  private get _inputClassName(): string {
    return css('ms-TextField-field', {
      'ms-TextField-field--unresizable': this.props.multiline && !this.props.resizable,
      'ms-TextField-invalid': !!this.props.errorMessage
    });
  }

  @autobind
  private _onInputChange(event: React.KeyboardEvent): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;

    if (this.props.value === undefined) {
      this.setState({ value });
    }

    if (this.props.onChanged) {
      this.props.onChanged(value);
    }
  }
}
