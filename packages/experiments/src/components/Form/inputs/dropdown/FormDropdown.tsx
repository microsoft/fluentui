import * as React from 'react';

// Components
import { IFormDropdownProps } from './FormDropdown.types';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { FormBaseInput, IFormBaseInputState } from '../../FormBaseInput';
import { IFormContext } from '../../Form';

/**
 * Dropdown input for Form
 */
export class FormDropdown extends FormBaseInput<
  number | string | number[] | string[],
  IFormDropdownProps,
  IFormBaseInputState<number | string | number[] | string[]>
> {
  constructor(props: IFormDropdownProps, context: IFormContext) {
    super(props, context);

    const { dropdownProps } = props;

    const propsValue = this.props.value !== null && this.props.value !== undefined ? this.props.value : undefined;

    let currentValue: number | string | number[] | string[] | undefined = undefined;

    if (dropdownProps !== undefined && dropdownProps.multiSelect === true) {
      // If multiSelect is set to true the currentValue should be an array.
      if (Array.isArray(propsValue)) {
        currentValue = propsValue;
      } else if (propsValue !== undefined) {
        if (typeof propsValue === 'string') {
          currentValue = new Array<string>(propsValue);
        } else {
          currentValue = new Array<number>(propsValue);
        }
      } else {
        currentValue = [];
      }
    } else {
      const firstOption =
        this.props.dropdownProps && this.props.dropdownProps.options && this.props.dropdownProps.options.length > 0
          ? this.props.dropdownProps.options[0].key
          : undefined;

      if (propsValue !== undefined) {
        currentValue = propsValue;
      } else if (firstOption !== undefined) {
        currentValue = firstOption;
      }
    }

    this.state = {
      isValid: true,
      currentValue: currentValue,
      currentError: undefined
    };
    this._validateDropdownProps(this.props.dropdownProps);
  }

  /**
   * Render a Fabric Dropdown
   */
  public render(): JSX.Element {
    const { currentValue } = this.state;

    return (
      <Dropdown
        options={[]}
        {...this.props.dropdownProps}
        // These props cannot be overridden
        key={this.props.inputKey}
        onChanged={this._onChanged}
        {...(currentValue && Array.isArray(currentValue)
          ? { selectedKeys: currentValue }
          : { selectedKey: currentValue })}
      />
    );
  }

  private _onChanged = (option: IDropdownOption): void => {
    const { dropdownProps } = this.props;

    if (dropdownProps !== undefined && dropdownProps.multiSelect === true) {
      const selected = option.selected === true;

      this.setState((prevState: IFormBaseInputState<number | string | number[] | string[]>) => {
        let currentValue = prevState.currentValue;

        if (currentValue === undefined) {
          currentValue = [];
        }

        if (selected) {
          if (typeof option.key === 'string') {
            currentValue = (currentValue as string[]).concat([option.key]);
          } else {
            currentValue = (currentValue as number[]).concat([option.key]);
          }
        } else {
          if (typeof option.key === 'string') {
            currentValue = (currentValue as string[]).filter((x: string) => x !== option.key);
          } else {
            currentValue = (currentValue as number[]).filter((x: number) => x !== option.key);
          }
        }

        return {
          currentValue: currentValue
        };
      });
    } else {
      this.setValue(option.key);
    }
  };

  private _validateDropdownProps(props?: IDropdownProps): void {
    if (props) {
      if (props.selectedKey !== null && props.selectedKey !== undefined) {
        console.warn(`FormDropdown: 'selectedKey' prop was specified and will be ignored`);
      }

      if (props.onChanged) {
        console.warn(`FormDropdown: 'onChanged' prop was specified and will be ignored`);
      }
    }
  }
}
