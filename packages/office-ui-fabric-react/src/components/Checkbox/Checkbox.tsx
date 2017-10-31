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
import {
  ICheckboxClassNames,
  getClassNames
} from './Checkbox.classNames';
import { getStyles } from './Checkbox.styles';

export interface ICheckboxState {
  /** Is true when Uncontrolled control is checked. */
  isChecked?: boolean;
}

@customizable('Checkbox', ['theme'])
export class Checkbox extends BaseComponent<ICheckboxProps, ICheckboxState> implements ICheckbox {
  public static defaultProps: ICheckboxProps = {
    boxSide: 'start'
  };

  private _checkBox: HTMLInputElement;
  private _id: string;
  private _classNames: ICheckboxClassNames;

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
      name,
      boxSide,
      theme,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      styles: customStyles,
      onRenderLabel = this._onRenderLabel
    } = this.props;

    const isChecked = checked === undefined ? this.state.isChecked : checked;
    const isReversed = boxSide !== 'start' ? true : false;

    this._classNames = getClassNames(
      getStyles(theme!, customStyles),
      className!,
      disabled!,
      isChecked!,
      isReversed!
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
        type='button'
        className={ this._classNames.root }
        onClick={ this._onClick }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
        aria-checked={ isChecked }
        aria-disabled={ disabled }
        aria-label={ ariaLabel }
        aria-labelledby={ ariaLabelledBy }
        aria-describedby={ ariaDescribedBy }
      >
        <label className={ this._classNames.label } htmlFor={ this._id } >
          <div className={ this._classNames.checkbox }>
            <Icon iconName='CheckMark' className={ this._classNames.checkmark } />
          </div>
          { onRenderLabel(this.props, this._onRenderLabel) }
        </label>
      </button>
    );
  }

  public get checked(): boolean {
    return this.state.isChecked!;
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
    const { disabled, onChange } = this.props;
    const { isChecked } = this.state;
    ev.preventDefault();
    ev.stopPropagation();

    if (!disabled) {
      if (onChange) {
        onChange(ev, !isChecked);
      }

      if (this.props.checked === undefined) {
        this.setState({ isChecked: !isChecked });
      }
    }
  }

  @autobind
  private _onRenderLabel(props: ICheckboxProps) {
    const { label } = props;

    return label ? (
      <span className={ this._classNames.text }>{ label }</span>
    ) : (
        null
      );
  }
}
