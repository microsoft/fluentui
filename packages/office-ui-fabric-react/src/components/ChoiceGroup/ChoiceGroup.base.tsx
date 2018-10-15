import * as React from 'react';
import { Label } from '../../Label';
import { ChoiceGroupOption, OnFocusCallback, OnChangeCallback } from './ChoiceGroupOption/index';
import { IChoiceGroupOption, IChoiceGroupProps, IChoiceGroupStyleProps, IChoiceGroupStyles } from './ChoiceGroup.types';
import { BaseComponent, classNamesFunction, createRef, getId, find } from '../../Utilities';

const getClassNames = classNamesFunction<IChoiceGroupStyleProps, IChoiceGroupStyles>();

export interface IChoiceGroupState {
  keyChecked: string | number;

  /** Is true when the control has focus. */
  keyFocused?: string | number;
}

export class ChoiceGroupBase extends BaseComponent<IChoiceGroupProps, IChoiceGroupState> {
  public static defaultProps: IChoiceGroupProps = {
    options: []
  };

  private _id: string;
  private _labelId: string;
  private _inputElement = createRef<HTMLInputElement>();
  private focusedVars: { [key: string]: OnFocusCallback } = {};
  private changedVars: { [key: string]: OnChangeCallback } = {};

  constructor(props: IChoiceGroupProps) {
    super(props);

    this._warnDeprecations({ onChanged: 'onChange' });
    this._warnMutuallyExclusive({
      selectedKey: 'defaultSelectedKey'
    });

    this.state = {
      keyChecked: props.defaultSelectedKey === undefined ? this._getKeyChecked(props)! : props.defaultSelectedKey,
      keyFocused: undefined
    };

    this._id = getId('ChoiceGroup');
    this._labelId = getId('ChoiceGroupLabel');
  }

  public componentWillReceiveProps(newProps: IChoiceGroupProps): void {
    const newKeyChecked = this._getKeyChecked(newProps);
    const oldKeyChecked = this._getKeyChecked(this.props);

    if (newKeyChecked !== oldKeyChecked) {
      this.setState({
        keyChecked: newKeyChecked!
      });
    }
  }

  public render(): JSX.Element {
    const { className, theme, styles, options, label, required, disabled, name, role = 'application' } = this.props;
    const { keyChecked, keyFocused } = this.state;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      optionsContainIconOrImage: options!.some(option => Boolean(option.iconProps || option.imageSrc))
    });

    const ariaLabelledBy = this.props.ariaLabelledBy
      ? this.props.ariaLabelledBy
      : label
        ? this._id + '-label'
        : (this.props as any)['aria-labelledby'];

    // In cases where no option is checked, set focusable to first enabled option so that ChoiceGroup remains focusable.
    // If no options are enabled, ChoiceGroup is not focusable. If any option is checked, do not set keyDefaultFocusable.
    const firstEnabledOption = disabled || options === undefined ? undefined : find(options, option => !option.disabled);
    const keyDefaultFocusable = keyChecked === undefined && firstEnabledOption ? firstEnabledOption.key : undefined;

    return (
      // By default, we need to assign the role 'application' on the containing div
      // because JAWS doesn't call OnKeyDown without this role
      <div role={role} className={classNames.applicationRole}>
        <div className={classNames.root} role="radiogroup" {...ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy }}>
          {label && (
            <Label className={classNames.label} required={required} id={this._id + '-label'}>
              {label}
            </Label>
          )}
          <div className={classNames.flexContainer}>
            {options!.map((option: IChoiceGroupOption) => {
              const innerOptionProps = {
                ...option,
                focused: option.key === keyFocused,
                checked: option.key === keyChecked,
                'data-is-focusable': option.key === keyChecked || option.key === keyDefaultFocusable ? true : false,
                disabled: option.disabled || disabled,
                id: `${this._id}-${option.key}`,
                labelId: `${this._labelId}-${option.key}`,
                name: name || this._id,
                required
              };

              return (
                <ChoiceGroupOption
                  key={option.key}
                  onBlur={this._onBlur}
                  onFocus={this._onFocus(option.key)}
                  onChange={this._onChange(option.key)}
                  {...innerOptionProps}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  public focus() {
    const { options } = this.props;
    if (options) {
      for (const option of options) {
        const elementToFocus = document.getElementById(`${this._id}-${option.key}`);
        if (elementToFocus && elementToFocus.getAttribute('data-is-focusable') === 'true') {
          elementToFocus.focus(); // focus on checked or default focusable key
          return;
        }
      }
    }
    if (this._inputElement.current) {
      this._inputElement.current.focus();
    }
  }

  private _onFocus = (key: string) =>
    this.focusedVars[key]
      ? this.focusedVars[key]
      : (this.focusedVars[key] = (ev: React.FocusEvent<HTMLElement>, option: IChoiceGroupOption) => {
          this.setState({
            keyFocused: key,
            keyChecked: this.state.keyChecked
          });
        });

  private _onBlur = (ev: React.FocusEvent<HTMLElement>, option: IChoiceGroupOption) => {
    this.setState({
      keyFocused: undefined,
      keyChecked: this.state.keyChecked
    });
  };

  private _onChange = (key: string) =>
    this.changedVars[key]
      ? this.changedVars[key]
      : (this.changedVars[key] = (evt, option: IChoiceGroupOption) => {
          const { onChanged, onChange, selectedKey, options = [] } = this.props;

          // Only manage state in uncontrolled scenarios.
          if (selectedKey === undefined) {
            this.setState({
              keyChecked: key
            });
          }

          const originalOption = find(options, (value: IChoiceGroupOption) => value.key === key);

          // TODO: onChanged deprecated, remove else if after 07/17/2017 when onChanged has been removed.
          if (onChange) {
            onChange(evt, originalOption);
          } else if (onChanged) {
            onChanged(originalOption!);
          }
        });

  private _getKeyChecked(props: IChoiceGroupProps): string | number | undefined {
    if (props.selectedKey !== undefined) {
      return props.selectedKey;
    }

    const { options = [] } = props;

    const optionsChecked = options.filter((option: IChoiceGroupOption) => {
      return option.checked;
    });

    if (optionsChecked.length === 0) {
      return undefined;
    } else {
      return optionsChecked[0].key;
    }
  }
}
