import * as React from 'react';
import {
  BaseComponent,
  autobind,
  getId,
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
  /** Is true when Uncontrolled control is checked. */
  isChecked?: boolean;
}

interface ICheckboxClassNames {
  root: string;
  label: string;
  checkbox: string;
  checkmark: string;
  text: string;
}

@customizable(['theme'])
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
      isChecked: !!(props.checked !== undefined ? props.checked : props.defaultChecked)
    };
  }

  public componentWillReceiveProps(newProps: ICheckboxProps) {
    if (newProps.checked !== undefined) {
      this.setState({
        isChecked: !!newProps.checked // convert null to false
      });
    }
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

    const isChecked = checked === undefined ? this.state.isChecked : checked;
    const isReversed = boxSide !== 'start' ? true : false;

    const classNames = this._getClassNames(
      getStyles(theme, customStyles),
      className,
      disabled,
      isChecked,
      isReversed
    );

    return (
      <button
        { ...inputProps }
        { ...(checked !== undefined && { checked }) }
        { ...(defaultChecked !== undefined && { defaultChecked }) }
        disabled={ disabled }
        ref={ this._resolveRef('_checkBox') }
        name={ name }
        id={ this._id }
        role='checkbox'
        className={ classNames.root }
        onClick={ this._onClick }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
        aria-checked={ isChecked }
        aria-disabled={ disabled }
      >
        <label className={ classNames.label } htmlFor={ this._id } >
          <div className={ classNames.checkbox }>
            <Icon iconName='CheckMark' className={ classNames.checkmark } />
          </div>
          { label && <span className={ classNames.text }>{ label }</span> }
        </label>
      </button>
    );
  }

  public get checked(): boolean {
    return this.state.isChecked;
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
  }

  @autobind
  private _onBlur(ev: React.FocusEvent<HTMLInputElement>): void {
    const { inputProps } = this.props;

    if (inputProps && inputProps.onBlur) {
      inputProps.onBlur(ev);
    }
  }

  @autobind
  private _onClick(ev: React.FormEvent<HTMLButtonElement>) {
    const { onChange } = this.props;
    let { isChecked } = this.state;

    if (onChange) {
      onChange(ev, !isChecked);
    }

    if (this.props.checked === undefined) {
      this.setState({ isChecked: !isChecked });
    }
  }

  @memoize
  private _getClassNames(
    styles: ICheckboxStyles,
    className: string,
    disabled: boolean,
    isChecked: boolean,
    isReversed: boolean
    ): ICheckboxClassNames {
    return {
      root: mergeStyles(
        'ms-Checkbox',
        isReversed && 'reversed',
        isChecked && 'is-checked',
        !disabled && 'is-enabled',
        disabled && 'is-disabled',
        className,
        styles.root,
        !disabled && [
          !isChecked && {
            ':hover .ms-Checkbox-checkbox': styles.checkboxHovered
          },
          isChecked && {
            ':hover .ms-Checkbox-checkbox': styles.checkboxCheckedHovered
          },
          {
            ':hover .ms-Checkbox-text': styles.textHovered
          }
        ]
      ) as string,

      label: mergeStyles(
        'ms-Checkbox-label',
        styles.label,
        isReversed && styles.labelReversed,
        disabled && styles.labelDisabled
      ) as string,

      checkbox: mergeStyles(
        'ms-Checkbox-checkbox',
        styles.checkbox,
        !disabled && isChecked && styles.checkboxChecked,
        disabled && !isChecked && styles.checkboxDisabled,
        disabled && isChecked && styles.checkboxCheckedDisabled,
      ) as string,

      checkmark: mergeStyles(
        styles.checkmark,
        !disabled && isChecked && styles.checkmarkChecked,
        disabled && !isChecked && styles.checkmarkDisabled,
        disabled && isChecked && styles.checkmarkCheckedDisabled,
      ) as string,

      text: mergeStyles(
        'ms-Checkbox-text',
        styles.text,
        disabled && styles.textDisabled
      ) as string,
    };
  }
}
