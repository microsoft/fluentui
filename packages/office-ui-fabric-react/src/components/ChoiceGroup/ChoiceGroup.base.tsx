import * as React from 'react';

import { Label } from '../../Label';
import {
  initializeComponentRef,
  warnDeprecations,
  warnMutuallyExclusive,
  classNamesFunction,
  find,
  getId,
  isControlled,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { IChoiceGroup, IChoiceGroupOption, IChoiceGroupProps, IChoiceGroupStyleProps, IChoiceGroupStyles } from './ChoiceGroup.types';
import { ChoiceGroupOption, IChoiceGroupOptionProps } from './ChoiceGroupOption/index';

const getClassNames = classNamesFunction<IChoiceGroupStyleProps, IChoiceGroupStyles>();

export interface IChoiceGroupState {
  /**
   * Current selected option, for **internal use only**.
   * External users should access `IChoiceGroup.checkedOption` instead.
   */
  // TODO (Fabric 8?) - once we removed the checked property from individual options,
  // we can probably store only the uncontrolled value in the state (right now it tracks
  // the value regardless of controlled/uncontrolled--though if controlled, it only updates
  // the value in state when the selectedKey prop updates)
  keyChecked?: string | number;

  /** Is set when the control has focus. */
  keyFocused?: string | number;
}

/**
 * {@docCategory ChoiceGroup}
 */
export class ChoiceGroupBase extends React.Component<IChoiceGroupProps, IChoiceGroupState> implements IChoiceGroup {
  private _id: string;
  private _labelId: string;
  private _focusCallbacks: { [key: string]: IChoiceGroupOptionProps['onFocus'] } = {};
  private _changeCallbacks: { [key: string]: IChoiceGroupOptionProps['onBlur'] } = {};

  constructor(props: IChoiceGroupProps) {
    super(props);

    initializeComponentRef(this);

    if (process.env.NODE_ENV !== 'production') {
      warnDeprecations('ChoiceGroup', props, { onChanged: 'onChange' });
      warnMutuallyExclusive('ChoiceGroup', props, {
        selectedKey: 'defaultSelectedKey'
      });
    }

    const { defaultSelectedKey, options = [] } = props;
    const validDefaultSelectedKey =
      !_isControlled(props) && defaultSelectedKey !== undefined && options.some(option => option.key === defaultSelectedKey);

    this.state = {
      keyChecked: validDefaultSelectedKey ? defaultSelectedKey : this._getKeyChecked(props)
    };

    this._id = getId('ChoiceGroup');
    this._labelId = getId('ChoiceGroupLabel');
  }

  /**
   * Gets the current checked option.
   */
  public get checkedOption(): IChoiceGroupOption | undefined {
    const { options = [] } = this.props;
    return find(options, (value: IChoiceGroupOption) => value.key === this.state.keyChecked);
  }

  public componentDidUpdate(prevProps: IChoiceGroupProps, prevState: IChoiceGroupState): void {
    // Only update if a new props object has been passed in (don't care about state updates)
    if (prevProps !== this.props) {
      const newKeyChecked = this._getKeyChecked(this.props);
      const oldKeyChecked = this._getKeyChecked(prevProps);

      if (newKeyChecked !== oldKeyChecked) {
        this.setState({
          keyChecked: newKeyChecked
        });
      }
    }
  }

  public render(): JSX.Element {
    const { className, theme, styles, options = [], label, required, disabled, name } = this.props;
    const { keyChecked, keyFocused } = this.state;

    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties, ['onChange', 'className', 'required']);

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      optionsContainIconOrImage: options.some(option => !!(option.iconProps || option.imageSrc))
    });

    const labelId = this._id + '-label';
    const ariaLabelledBy = this.props.ariaLabelledBy || (label ? labelId : this.props['aria-labelledby']);

    // TODO (Fabric 8?) - if possible, move `root` class to the actual root and eliminate
    // `applicationRole` class (but the div structure will stay the same by necessity)
    return (
      <div className={classNames.applicationRole} {...divProps}>
        <div className={classNames.root} role="radiogroup" {...ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy }}>
          {label && (
            <Label className={classNames.label} required={required} id={labelId} disabled={disabled}>
              {label}
            </Label>
          )}
          <div className={classNames.flexContainer}>
            {options.map((option: IChoiceGroupOption) => {
              const innerOptionProps = {
                ...option,
                focused: option.key === keyFocused,
                checked: option.key === keyChecked,
                disabled: option.disabled || disabled,
                id: this._getOptionId(option),
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
    const { options = [] } = this.props;
    const optionToFocus = this.checkedOption || options.filter(option => !option.disabled)[0];
    const elementToFocus = optionToFocus && document.getElementById(this._getOptionId(optionToFocus));
    if (elementToFocus) {
      elementToFocus.focus();
    }
  }

  private _onFocus(key: string) {
    // This extra mess is necessary because React won't pass the `key` prop through to ChoiceGroupOption
    if (!this._focusCallbacks[key]) {
      this._focusCallbacks[key] = (ev: React.FocusEvent<HTMLElement | HTMLInputElement>, option: IChoiceGroupOption) => {
        this.setState({
          keyFocused: key
        });
      };
    }
    return this._focusCallbacks[key];
  }

  private _onBlur = (ev: React.FocusEvent<HTMLElement>, option: IChoiceGroupOption) => {
    this.setState({
      keyFocused: undefined
    });
  };

  private _onChange(key: string) {
    // This extra mess is necessary because React won't pass the `key` prop through to ChoiceGroupOption
    if (!this._changeCallbacks[key]) {
      this._changeCallbacks[key] = (evt: React.FormEvent<HTMLElement | HTMLInputElement>, option: IChoiceGroupOption) => {
        const { onChanged, onChange } = this.props;

        // Only manage state in uncontrolled scenarios.
        if (!_isControlled(this.props)) {
          this.setState({
            keyChecked: key
          });
        }

        // Get the original option without the `key` prop removed
        const originalOption = find(this.props.options || [], (value: IChoiceGroupOption) => value.key === key);

        // TODO: onChanged deprecated, remove else if after 07/17/2017 when onChanged has been removed.
        if (onChange) {
          onChange(evt, originalOption);
        } else if (onChanged) {
          onChanged(originalOption!, evt);
        }
      };
    }
    return this._changeCallbacks[key];
  }

  /**
   * Returns `selectedKey` if provided, or the key of the first option with the `checked` prop set.
   */
  private _getKeyChecked(props: IChoiceGroupProps): string | number | undefined {
    if (props.selectedKey !== undefined) {
      return props.selectedKey;
    }

    const { options = [] } = props;
    const optionsChecked = options.filter((option: IChoiceGroupOption) => option.checked);
    return optionsChecked[0] && optionsChecked[0].key;
  }

  private _getOptionId(option: IChoiceGroupOption): string {
    return `${this._id}-${option.key}`;
  }
}

function _isControlled(props: IChoiceGroupProps): boolean {
  return isControlled(props, 'selectedKey');
}
