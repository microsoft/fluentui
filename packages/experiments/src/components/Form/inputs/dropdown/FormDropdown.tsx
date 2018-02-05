import * as React from 'react';

// Components
import { IFormDropdownProps } from './FormDropdown.types';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { FormBaseInput, IFormBaseInputState } from '../../FormBaseInput';
import { IFormContext } from '../../Form';

// Utilities
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Dropdown input for Form
 */
export class FormDropdown extends FormBaseInput<number | string, IFormDropdownProps, IFormBaseInputState<number | string>> {

  constructor(props: IFormDropdownProps, context: IFormContext) {
    super(props, context);
    this.state = {
      isValid: true,
      currentValue: this.props.value !== null && this.props.value !== undefined ?
        this.props.value :
        (
          (this.props.dropdownProps && this.props.dropdownProps.options && this.props.dropdownProps.options.length > 0) ?
            this.props.dropdownProps.options[0].key : undefined
        ),
      currentError: undefined
    };
    this._validateDropdownProps(this.props.dropdownProps);
  }

  /**
   * Render a Fabric Dropdown
   */
  public render(): JSX.Element {
    return (
      <Dropdown
        {...this.props.dropdownProps}

        // These props cannot be overridden
        key={ this.props.inputKey }
        onChanged={ this._onChanged }
        selectedKey={ this.state.currentValue }
      />
    );
  }

  @autobind
  private _onChanged(option: IDropdownOption): void {
    this.setValue(option.key);
  }

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
