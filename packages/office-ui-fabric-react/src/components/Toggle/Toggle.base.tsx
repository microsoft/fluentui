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

  public static getDerivedStateFromProps(
    nextProps: Readonly<IToggleProps>,
    prevState: Readonly<IToggleState>
  ): Partial<IToggleState> | null {
    if (nextProps.checked === undefined) {
      return null;
    }

    return {
      checked: !!nextProps.checked
    };
  }

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

    const labelId = `${this._id}-label`;
    const stateTextId = `${this._id}-stateText`;

    // The following properties take priority for what Narrator should read:
    // 1. ariaLabel
    // 2. onAriaLabel (if checked) or offAriaLabel (if not checked)
    // 3. label
    // 4. onText (if checked) or offText (if not checked)
    let labelledById: string | undefined = undefined;
    if (!ariaLabel && !badAriaLabel) {
      if (label) {
        labelledById = labelId;
      } else if (stateText) {
        labelledById = stateTextId;
      }
    }

    const ariaRole = this.props.role ? this.props.role : 'switch';

    return (
      <RootType className={classNames.root} hidden={(toggleNativeProps as any).hidden}>
        {label && (
          <Label htmlFor={this._id} className={classNames.label} id={labelId}>
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
                role={ariaRole}
                ref={this._toggleButton}
                aria-disabled={disabled}
                aria-checked={checked}
                aria-label={ariaLabel ? ariaLabel : badAriaLabel}
                data-is-focusable={true}
                onChange={this._noop}
                onClick={this._onClick}
                aria-labelledby={labelledById}
              >
                <div className={classNames.thumb} />
              </button>
            )}
          </KeytipData>
          {stateText && (
            <Label htmlFor={this._id} className={classNames.text} id={stateTextId}>
              {stateText}
            </Label>
          )}
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
