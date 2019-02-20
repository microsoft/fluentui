import * as React from 'react';
import { BaseComponent, classNamesFunction, getId, inputProperties, getNativeProps } from '../../Utilities';
import { IToggleProps, IToggle, IToggleStyleProps, IToggleStyles } from './Toggle.types';
import { Label } from '../../Label';
import { KeytipData } from '../../KeytipData';

export interface IToggleState {
  checked: boolean;
}

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>();

export class ToggleBase extends BaseComponent<IToggleProps, IToggleState> implements IToggle {
  private _id: string;
  private _toggleButton = React.createRef<HTMLButtonElement>();

  constructor(props: IToggleProps) {
    super(props);

    this._warnMutuallyExclusive({
      checked: 'defaultChecked'
    });

    this._warnDeprecations({
      onAriaLabel: 'ariaLabel',
      offAriaLabel: undefined,
      onChanged: 'onChange'
    });

    this.state = {
      checked: !!(props.checked || props.defaultChecked)
    };
    this._id = props.id || getId('Toggle');
  }

  /**
   * Gets the current checked state of the toggle.
   */
  public get checked(): boolean {
    return this.state.checked;
  }

  public componentWillReceiveProps(newProps: IToggleProps): void {
    if (newProps.checked !== undefined) {
      this.setState({
        checked: !!newProps.checked // convert null to false
      });
    }
  }

  public render(): JSX.Element {
    const {
      as: RootType = 'div',
      className,
      theme,
      disabled,
      keytipProps,
      label,
      ariaLabel,
      onAriaLabel,
      offAriaLabel,
      offText,
      onText,
      styles,
      inlineLabel
    } = this.props;
    const { checked } = this.state;
    const stateText = checked ? onText : offText;
    const badAriaLabel = checked ? onAriaLabel : offAriaLabel;
    const toggleNativeProps = getNativeProps(this.props, inputProperties, ['defaultChecked']);
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      disabled,
      checked,
      inlineLabel,
      onOffMissing: !onText && !offText
    });

    return (
      <RootType className={classNames.root} hidden={(toggleNativeProps as any).hidden}>
        {label && (
          <Label htmlFor={this._id} className={classNames.label}>
            {label}
          </Label>
        )}

        <div className={classNames.container}>
          <KeytipData keytipProps={keytipProps} ariaDescribedBy={(toggleNativeProps as any)['aria-describedby']} disabled={disabled}>
            {(keytipAttributes: any): JSX.Element => (
              <button
                {...toggleNativeProps}
                {...keytipAttributes}
                className={classNames.pill}
                disabled={disabled}
                id={this._id}
                type="button"
                role="switch" // ARIA 1.1 definition; "checkbox" in ARIA 1.0
                ref={this._toggleButton}
                aria-disabled={disabled}
                aria-checked={checked}
                aria-label={ariaLabel ? ariaLabel : badAriaLabel}
                data-is-focusable={true}
                onChange={this._noop}
                onClick={this._onClick}
              >
                <div className={classNames.thumb} />
              </button>
            )}
          </KeytipData>
          {stateText && <Label className={classNames.text}>{stateText}</Label>}
        </div>
      </RootType>
    );
  }

  public focus() {
    if (this._toggleButton.current) {
      this._toggleButton.current.focus();
    }
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>) => {
    const { disabled, checked: checkedProp, onChange, onChanged, onClick } = this.props;
    const { checked } = this.state;

    if (!disabled) {
      // Only update the state if the user hasn't provided it.
      if (checkedProp === undefined) {
        this.setState({
          checked: !checked
        });
      }

      if (onChange) {
        onChange(ev, !checked);
      }

      if (onChanged) {
        onChanged(!checked);
      }

      if (onClick) {
        onClick(ev);
      }
    }
  };

  private _noop(): void {
    /* no-op */
  }
}
