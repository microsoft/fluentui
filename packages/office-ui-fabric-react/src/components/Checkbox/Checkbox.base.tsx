import * as React from 'react';
import {
  getId,
  classNamesFunction,
  mergeAriaAttributeValues,
  initializeComponentRef,
  warnMutuallyExclusive,
  FocusRects,
} from '../../Utilities';
import { Icon } from '../../Icon';
import { ICheckbox, ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';
import { KeytipData } from '../../KeytipData';

export interface ICheckboxState {
  /** Is true when Uncontrolled control is checked. */
  isChecked?: boolean;
  isIndeterminate?: boolean;
}

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>();

// dummy change

export class CheckboxBase extends React.Component<ICheckboxProps, ICheckboxState> implements ICheckbox {
  public static defaultProps: ICheckboxProps = {
    boxSide: 'start',
  };

  private _checkBox = React.createRef<HTMLInputElement>();
  private _id: string;
  private _classNames: { [key in keyof ICheckboxStyles]: string };

  public static getDerivedStateFromProps(
    nextProps: Readonly<ICheckboxProps>,
    prevState: Readonly<ICheckboxState>,
  ): ICheckboxState | null {
    const stateUpdate: Partial<ICheckboxState> = {};
    if (nextProps.indeterminate !== undefined) {
      stateUpdate.isIndeterminate = !!nextProps.indeterminate;
    }
    if (nextProps.checked !== undefined) {
      stateUpdate.isChecked = !!nextProps.checked;
    }
    return Object.keys(stateUpdate).length ? stateUpdate : null;
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
        indeterminate: 'defaultIndeterminate',
      });
    }

    this._id = this.props.id || getId('checkbox-');
    this.state = {
      isChecked: !!(props.checked !== undefined ? props.checked : props.defaultChecked),
      isIndeterminate: !!(props.indeterminate !== undefined ? props.indeterminate : props.defaultIndeterminate),
    };
  }

  /**
   * Render the Checkbox based on passed props
   */
  public render(): JSX.Element {
    const {
      className,
      disabled,
      boxSide,
      theme,
      styles,
      onRenderLabel = this._onRenderLabel,
      keytipProps,
    } = this.props;

    const { isChecked, isIndeterminate } = this.state;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      disabled,
      indeterminate: isIndeterminate,
      checked: isChecked,
      reversed: boxSide !== 'start',
      isUsingCustomLabelRender: onRenderLabel !== this._onRenderLabel,
    });

    if (keytipProps) {
      return (
        <KeytipData keytipProps={keytipProps} disabled={disabled}>
          {(keytipAttributes: any): JSX.Element => this._renderContent(isChecked, isIndeterminate, keytipAttributes)}
        </KeytipData>
      );
    }

    return this._renderContent(isChecked, isIndeterminate);
  }

  public get indeterminate(): boolean {
    return !!this.state.isIndeterminate;
  }

  public get checked(): boolean {
    return !!this.state.isChecked;
  }

  public focus(): void {
    if (this._checkBox.current) {
      this._checkBox.current.focus();
    }
  }

  private _renderContent = (
    checked: boolean | undefined,
    indeterminate: boolean | undefined,
    keytipAttributes: any = {},
  ): JSX.Element => {
    const {
      disabled,
      inputProps,
      name,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      onRenderLabel = this._onRenderLabel,
      checkmarkIconProps,
      ariaPositionInSet,
      ariaSetSize,
      title,
      label,
    } = this.props;

    return (
      <div className={this._classNames.root} title={title}>
        <FocusRects />
        <input
          type="checkbox"
          {...inputProps}
          data-ktp-execute-target={keytipAttributes['data-ktp-execute-target']}
          checked={checked}
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
          aria-checked={indeterminate ? 'mixed' : checked ? 'true' : 'false'}
        />
        <label className={this._classNames.label} htmlFor={this._id}>
          <div className={this._classNames.checkbox} data-ktp-target={keytipAttributes['data-ktp-target']}>
            <Icon iconName="CheckMark" {...checkmarkIconProps} className={this._classNames.checkmark} />
          </div>
          {onRenderLabel(this.props, this._onRenderLabel)}
        </label>
      </div>
    );
  };

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
    const { onChange } = this.props;
    const { isChecked, isIndeterminate } = this.state;

    if (!isIndeterminate) {
      if (onChange) {
        onChange(ev, !isChecked);
      }
      if (this.props.checked === undefined) {
        this.setState({ isChecked: !isChecked });
      }
    } else {
      // If indeterminate, clicking the checkbox *only* removes the indeterminate state (or if
      // controlled, lets the consumer know to change it by calling onChange). It doesn't
      // change the checked state.
      if (onChange) {
        onChange(ev, isChecked);
      }
      if (this.props.indeterminate === undefined) {
        this.setState({ isIndeterminate: false });
      }
    }
  };

  private _onRenderLabel = (props: ICheckboxProps): JSX.Element | null => {
    const { label, title } = props;

    return label ? (
      <span aria-hidden="true" className={this._classNames.text} title={title}>
        {label}
      </span>
    ) : null;
  };
}
