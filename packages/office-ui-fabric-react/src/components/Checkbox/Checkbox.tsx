import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css,
  getId
} from '../../Utilities';
import { Icon } from '../../Icon';
import {
  ICheckbox,
  ICheckboxProps
} from './Checkbox.Props';
import * as stylesImport from './Checkbox.scss';
const styles: any = stylesImport;

export interface ICheckboxState {
  /** Is true when the control has focus. */
  isFocused?: boolean;

  /** Is true when Uncontrolled control is checked. */
  isChecked?: boolean;
}

export class Checkbox extends BaseComponent<ICheckboxProps, ICheckboxState> implements ICheckbox {
  public static defaultProps: ICheckboxProps = {
    boxSide: 'start'
  };

  private _checkBox: HTMLInputElement;
  private _id: string;

  /**
   * Initialize a new instance of the TopHeaderV2
   * @param props Props for the component
   * @param context Context or initial state for the base component.
   */
  constructor(props: ICheckboxProps, context?: any) {
    super(props, context);

    this._warnMutuallyExclusive({
      'checked': 'defaultChecked'
    });

    this._id = getId('checkbox-');
    this.state = {
      isFocused: false,
      isChecked: !!(props.checked !== undefined ? props.checked : props.defaultChecked)
    };
  }

  /**
   * Render the Checkbox based on passed props
   */
  public render(): JSX.Element {
    const {
      checked,
      className,
      defaultChecked,
      disabled,
      inputProps,
      label,
      name,
      boxSide
        } = this.props;

    const { isFocused } = this.state;
    const isChecked = checked === undefined ? this.state.isChecked : checked;

    let rootClassName = css('ms-Checkbox', className, styles.root, {
      ['reversed ' + styles.reversed]: boxSide !== 'start',
      ['is-checked ' + styles.isChecked]: isChecked,
      ['is-disabled ' + styles.isDisabled]: disabled,
      ['is-inFocus ' + styles.isInFocus]: isFocused
    });

    return (
      <div className={ rootClassName } style={ this.props.style } >
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
        <label className={ css('ms-Checkbox-label', styles.label) } htmlFor={ this._id }>
          <span className={ css('ms-Checkbox-box', styles.box) }>
            <span className={ css('ms-Checkbox-checkbox', styles.checkbox) }>
              <Icon iconName='CheckMark' className={ styles.checkmark } />
            </span>
          </span>
          { label && <span className={ css('text', styles.text) }>{ label }</span> }
        </label>
      </div >
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
