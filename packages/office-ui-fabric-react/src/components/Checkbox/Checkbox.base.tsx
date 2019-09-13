import * as React from 'react';
import {
  getId,
  classNamesFunction,
  mergeAriaAttributeValues,
  initializeComponentRef,
  warnMutuallyExclusive,
  initializeFocusRects
} from '../../Utilities';
import { Icon } from '../../Icon';
import { ICheckbox, ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';
import { KeytipData } from '../../KeytipData';

export interface ICheckboxState {
  /** Is true when Uncontrolled control is checked. */
  isChecked?: boolean | undefined;
  isIndeterminate?: boolean;
}

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>();

export class CheckboxBase extends React.Component<ICheckboxProps, ICheckboxState> implements ICheckbox {
  public static defaultProps: ICheckboxProps = {
    boxSide: 'start'
  };

  private _checkBox = React.createRef<HTMLInputElement>();
  private _id: string;
  private _classNames: { [key in keyof ICheckboxStyles]: string };

  public static getDerivedStateFromProps(props: ICheckboxProps, state: ICheckboxState): ICheckboxState | null {
    if (!props.defaultIndeterminate && state.isIndeterminate) {
      return {
        isIndeterminate: !!props.indeterminate
      };
    }
    if (props.checked !== undefined) {
      return {
        isChecked: !!props.checked
      };
    }
    return null;
  }

  /**
   * Initialize a new instance of the Checkbox
   * @param props - Props for the component
   * @param context - Context or initial state for the base component.
   */
  constructor(props: ICheckboxProps, context?: any) {
    super(props, context);

    initializeComponentRef(this);

    if (process.env.NODE_ENV !== 'production') {
      warnMutuallyExclusive('Checkbox', props, {
        checked: 'defaultChecked',
        indeterminate: 'defaultIndeterminate'
      });
    }

    this._id = this.props.id || getId('checkbox-');
    this.state = {
      isChecked: !!(props.checked !== undefined ? props.checked : props.defaultChecked),
      isIndeterminate: !!(props.indeterminate !== undefined ? props.indeterminate : props.defaultIndeterminate)
    };

    initializeFocusRects();
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
      styles,
      onRenderLabel = this._onRenderLabel,
      checkmarkIconProps,
      ariaPositionInSet,
      ariaSetSize,
      keytipProps,
      title,
      label,
      indeterminate
    } = this.props;

    const isChecked = checked === undefined ? this.state.isChecked : checked;
    const isIndeterminate = !!(indeterminate === undefined ? this.state.isIndeterminate : indeterminate);
    const isReversed = boxSide !== 'start' ? true : false;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      disabled,
      indeterminate: isIndeterminate,
      checked: isChecked,
      reversed: isReversed,
      isUsingCustomLabelRender: onRenderLabel !== this._onRenderLabel
    });

    return (
      <KeytipData keytipProps={keytipProps} disabled={disabled}>
        {(keytipAttributes: any): JSX.Element => (
          <div className={this._classNames.root}>
            <input
              type="checkbox"
              {...inputProps}
              data-ktp-execute-target={keytipAttributes['data-ktp-execute-target']}
              {...checked !== undefined && { checked }}
              {...defaultChecked !== undefined && { defaultChecked }}
              disabled={disabled}
              className={this._classNames.input}
              ref={this._checkBox}
              name={name}
              id={this._id}
              title={title}
              onChange={this._onChange}
              onFocus={this._onFocus}
              onBlur={this._onBlur}
              aria-disabled={disabled}
              aria-label={ariaLabel || label}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={mergeAriaAttributeValues(ariaDescribedBy, keytipAttributes['aria-describedby'])}
              aria-posinset={ariaPositionInSet}
              aria-setsize={ariaSetSize}
              aria-checked={isIndeterminate ? 'mixed' : isChecked ? 'true' : 'false'}
            />
            <label className={this._classNames.label} htmlFor={this._id}>
              <div className={this._classNames.checkbox} data-ktp-target={keytipAttributes['data-ktp-target']}>
                <Icon iconName="CheckMark" {...checkmarkIconProps} className={this._classNames.checkmark} />
              </div>
              {onRenderLabel(this.props, this._onRenderLabel)}
            </label>
          </div>
        )}
      </KeytipData>
    );
  }

  public get indeterminate(): boolean {
    return this.state.isIndeterminate!;
  }

  public get checked(): boolean {
    return this.state.isChecked!;
  }

  public focus(): void {
    if (this._checkBox.current) {
      this._checkBox.current.focus();
    }
  }

  private _onFocus = (ev: React.FocusEvent<HTMLElement>): void => {
    const { inputProps } = this.props;

    if (inputProps && inputProps.onFocus) {
      inputProps.onFocus(ev);
    }
  };

  private _onBlur = (ev: React.FocusEvent<HTMLElement>): void => {
    const { inputProps } = this.props;

    if (inputProps && inputProps.onBlur) {
      inputProps.onBlur(ev);
    }
  };

  private _onChange = (ev: React.FormEvent<HTMLElement>): void => {
    const { disabled, onChange } = this.props;
    const { isChecked, isIndeterminate } = this.state;

    if (!disabled) {
      if (!isIndeterminate) {
        if (onChange) {
          onChange(ev, !isChecked);
        }
        if (this.props.checked === undefined) {
          this.setState({ isChecked: !isChecked });
        }
      } else {
        if (onChange) {
          onChange(ev, isChecked);
        }
        if (this.props.indeterminate === undefined) {
          this.setState({ isIndeterminate: false });
        }
      }
    }
  };

  private _onRenderLabel = (props: ICheckboxProps): JSX.Element | null => {
    const { label } = props;

    return label ? (
      <span aria-hidden="true" className={this._classNames.text}>
        {label}
      </span>
    ) : null;
  };
}
