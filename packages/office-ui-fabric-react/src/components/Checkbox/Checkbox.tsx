import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css,
  getId
} from '../../Utilities';
import {
  ICheckbox,
  ICheckboxProps
} from './Checkbox.Props';
import styles from './Checkbox.scss';
// const styles: any = stylesImport;

export interface ICheckboxState {
  /** Is true when the control has focus. */
  isFocused?: boolean;

  /** Is true when Uncontrolled control is checked. */
  isChecked?: boolean;
}

export class Checkbox extends BaseComponent<ICheckboxProps, ICheckboxState> implements ICheckbox {
  public static defaultProps: ICheckboxProps = {
  };

  private _id: string;
  private _checkBox: HTMLInputElement;

  constructor(props: ICheckboxProps) {
    super(props);

    this._warnMutuallyExclusive({
      'checked': 'defaultChecked'
    });

    this._id = getId('checkbox-');
    this.state = {
      isFocused: false,
      isChecked: !!(props.checked !== undefined ? props.checked : props.defaultChecked)
    };
  }

  public render() {
    const {
      checked,
      className,
      defaultChecked,
      disabled,
      inputProps,
      label,
      name
    } = this.props;

    const { isFocused } = this.state;
    const isChecked = checked === undefined ? this.state.isChecked : checked;

    return (
      <div
        className={ css(
          'ms-Checkbox',
          styles.root,
          className,
          {
            'is-inFocus': isFocused,
            [styles.rootIsInFocus]: isFocused
          }) }
      >
        <input
          { ...inputProps }
          { ...(checked !== undefined && { checked }) }
          { ...(defaultChecked !== undefined && { defaultChecked }) }
          disabled={ disabled }
          ref={ this._resolveRef('_checkBox') }
          id={ this._id }
          name={ name || this._id }
          className={ css('ms-Checkbox-input', styles.input) }
          type='checkbox'
          onChange={ this._onChange }
          onFocus={ this._onFocus }
          onBlur={ this._onBlur }
          aria-checked={ isChecked }
        />
        { this.props.children }
        <label htmlFor={ this._id }
          className={ css('ms-Checkbox-label', styles.label, {
            ['is-checked ' + styles.labelIsChecked]: isChecked,
            ['is-disabled ' + styles.labelIsDisabled]: disabled,
            [styles.labelIsInFocus]: isFocused
          })
          }
        >
          { label && <span className={ styles.textLabel }>{ label }</span> }
        </label>
      </div>
    );
  }

  public get checked(): boolean {
    return this._checkBox ? this._checkBox.checked : false;
  }

  public focus(): void {
    if (this._checkBox) {
      this._checkBox.focus();
    }
  }

  @autobind
  private _onFocus(ev: React.FocusEvent<HTMLInputElement>): void {
    const { inputProps } = this.props;

    if (inputProps && inputProps.onFocus) {
      inputProps.onFocus(ev);
    }

    this.setState({ isFocused: true });
  }

  @autobind
  private _onBlur(ev: React.FocusEvent<HTMLInputElement>): void {
    const { inputProps } = this.props;

    if (inputProps && inputProps.onBlur) {
      inputProps.onBlur(ev);
    }

    this.setState({ isFocused: false });
  }

  @autobind
  private _onChange(ev: React.FormEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    const isChecked = (ev.target as HTMLInputElement).checked;

    if (onChange) {
      onChange(ev, isChecked);
    }

    if (this.props.checked === undefined) {
      this.setState({ isChecked: isChecked });
    }
  }
}
