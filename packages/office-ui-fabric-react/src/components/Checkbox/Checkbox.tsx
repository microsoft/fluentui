import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css,
  getId,
  inputProperties,
  getNativeProps,
  memoize
} from '../../Utilities';
import { Icon } from '../../Icon';
import {
  ICheckbox,
  ICheckboxProps,
  ICheckboxStyles
} from './Checkbox.Props';
import {
  customizable
} from '../../Utilities';
import {
  mergeStyles
} from '../../Styling';

import { getStyles } from './Checkbox.styles';

export interface ICheckboxState {
  /** Is true when the control has focus. */
  isFocused?: boolean;

  /** Is true when Uncontrolled control is checked. */
  isChecked?: boolean;
}

interface ICheckboxClassNames {
  root: string;
  label: string;
  input: string;
  box: string;
  checkbox: string;
  checkmark: string;
  text: string;
}

@customizable(['theme'])
export class Checkbox extends BaseComponent<ICheckboxProps, ICheckboxState> implements ICheckbox {
  [x: string]: any;
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
      boxSide,
      theme,
      styles: customStyles,
        } = this.props;

    const { isFocused } = this.state;
    const isChecked = checked === undefined ? this.state.isChecked : checked;
    const isReversed = boxSide !== 'start' ? true : false;

    const classNames = this._getClassNames(
      getStyles(theme, customStyles),
      className,
      disabled,
      isChecked,
      isFocused,
      isReversed
    );

    return (
      <div className={ classNames.root } >
        <input
          { ...inputProps }
          { ...(checked !== undefined && { checked }) }
          { ...(defaultChecked !== undefined && { defaultChecked }) }
          disabled={ disabled }
          ref={ this._resolveRef('_checkBox') }
          id={ this._id }
          name={ name || this._id }
          className={ classNames.input }
          type='checkbox'
          onChange={ this._onChange }
          onFocus={ this._onFocus }
          onBlur={ this._onBlur }
          aria-checked={ isChecked }
        />
        <label className={ classNames.label } htmlFor={ this._id }>
          <span className={ classNames.box }>
            <span className={ classNames.checkbox }>
              <Icon iconName='CheckMark' className={ classNames.checkmark } />
            </span>
          </span>
          { label && <span className={ classNames.text }>{ label }</span> }
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

  @memoize
  private _getClassNames(
    styles: ICheckboxStyles,
    className: string,
    disabled: boolean,
    isChecked: boolean,
    isFocused: boolean,
    isReversed: boolean
    ): ICheckboxClassNames {
    return {
      root: mergeStyles(
        'ms-Checkbox',
        isReversed && 'reversed',
        isChecked && 'is-checked',
        !disabled && 'is-enabled',
        disabled && 'is-disabled',
        isFocused && 'is-inFocus',
        className,
        styles.root,
        !disabled && [
          !isChecked && {
            ':hover .checkbox': styles.checkboxHovered
          },
          isChecked && {
            ':hover .checkbox': styles.checkboxCheckedHovered
          },
        ]
      ) as string,

      label: mergeStyles(
        'ms-Checkbox-label',
        styles.label,
        isReversed && styles.labelReversed,
        disabled && styles.labelDisabled
      ) as string,

      input: mergeStyles(
        'ms-Checkbox-input',
        styles.input
      ) as string,

      box: mergeStyles(
        'box',
        styles.box
      ) as string,

      checkbox: mergeStyles(
        'checkbox',
        styles.checkbox,
        !disabled && isChecked && styles.checkboxChecked,
        disabled && [
          !isChecked && styles.checkboxDisabled,
          isChecked && styles.checkboxCheckedDisabled
        ]
      ) as string,

      checkmark: mergeStyles(
        styles.checkmark,
        isChecked && styles.checkmarkChecked
      ) as string,

      text: mergeStyles(
        'text',
        styles.text,
        disabled && styles.textDisabled
      ) as string,
    };
  }
}
