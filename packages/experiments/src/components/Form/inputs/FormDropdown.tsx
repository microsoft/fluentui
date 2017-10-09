import * as React from "react";

// Components
import { Dropdown, IDropdownOption, IDropdownProps } from "office-ui-fabric-react/lib/Dropdown";
import { FormBaseInput, IFormBaseInputProps, IFormBaseInputState } from "../FormBaseInput";

export { IDropdownProps };

/**
 * The type that consumers should use to populate this input
 */
export type IFormDropdownOption = {
  state: number | string;
  description: string;
};

/**
 * Additional props for the Dropdown input
 */
export interface IFormDropdownProps extends IFormBaseInputProps<number | string> {
  dropdownProps?: IDropdownProps;
}

/**
 * Any additional state for the Dropdown input. Currently none
 */
export interface IFormDropdownState extends IFormBaseInputState<number | string> {

}

/**
 * Dropdown input for Form
 */
export class FormDropdown extends FormBaseInput<number | string, IFormDropdownProps, IFormDropdownState> {

  constructor(props: IFormDropdownProps, context: any) {
    super(props, context);
    this.state = {
      isValid: true,
      currentValue: this.props.value != null ? this.props.value : ((this.props.dropdownProps && this.props.dropdownProps.options && this.props.dropdownProps.options.length > 0) ? this.props.dropdownProps.options[0].key : undefined),
      currentError: undefined
    };
    this.validateDropdownProps(this.props.dropdownProps);
  }

  /**
   * Name of this component
   */
  public name(): string {
    return "FormDropdown";
  }

  /**
   * Render a Fabric Dropdown
   */
  public renderComponent() {
    return (
      <Dropdown
        {...this.props.dropdownProps}

        // These props cannot be overridden
        key={ this.props.inputKey }
        onChanged={ (option: IDropdownOption) => this.setValue(option.key) }
        selectedKey={ this.state.currentValue }
      />
    );
  }

  private validateDropdownProps(props?: IDropdownProps): void {
    if (props) {
      if (props.selectedKey != null) {
        console.warn("FormDropdown: 'selectedKey' prop was specified and will be ignored");
      }

      if (props.onChanged != null) {
        console.warn("FormDropdown: 'onChanged' prop was specified and will be ignored");
      }
    }
  }
}
