import * as React from 'react';

// Components
import { IFormDropdownProps, DropdownValue } from './FormDropdown.types';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { FormBaseInput, IFormBaseInputState } from '../../FormBaseInput';
import { IFormContext } from '../../Form';

/**
 * Dropdown input for Form
 */
export class FormDropdown extends FormBaseInput<DropdownValue, IFormDropdownProps, IFormBaseInputState<DropdownValue>> {
  constructor(props: IFormDropdownProps, context: IFormContext) {
    super(props, context);

    const { dropdownProps } = props;

    const propsValue = this.props.value;

    let currentValue: DropdownValue | undefined = undefined;

    if (dropdownProps && dropdownProps.multiSelect) {
      // If multiSelect is set to true the currentValue should be an array.
      if (Array.isArray(propsValue)) {
        currentValue = propsValue;
      } else if (propsValue) {
        // tslint:disable-next-line:no-any
        currentValue = [propsValue] as any[];
      } else {
        currentValue = [];
      }
    } else {
      const firstOption =
        this.props.dropdownProps && this.props.dropdownProps.options && this.props.dropdownProps.options.length > 0
          ? this.props.dropdownProps.options[0].key
          : undefined;

      currentValue = propsValue !== undefined ? propsValue : firstOption;
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
        onChange={this._onChange}
        {...(currentValue && Array.isArray(currentValue) ? { selectedKeys: currentValue } : { selectedKey: currentValue })}
      />
    );
  }

  private _onChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    const { dropdownProps } = this.props;

    if (dropdownProps && dropdownProps.multiSelect) {
      // tslint:disable-next-line:no-any
      let value = this.state.currentValue as any[];
      const selected = !!option.selected;

      if (!value) {
        value = [];
      }

      if (selected) {
        value.push(option.key);
      } else {
        const index = value.indexOf(option.key);
        if (index >= 0) {
          value.splice(index, 1);
        }
      }

      this.setValue(value);
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
