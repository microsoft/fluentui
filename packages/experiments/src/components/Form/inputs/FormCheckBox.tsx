import * as React from "react";

// Components
import { Checkbox, ICheckboxProps } from "office-ui-fabric-react/lib/Checkbox";
import { FormBaseInput, IFormBaseInputProps, IFormBaseInputState } from "../FormBaseInput";

export { ICheckboxProps };

/**
 * Any additional props for the Checkbox input. Currently none
 */
export interface IFormCheckBoxProps extends IFormBaseInputProps<boolean> {
  checkboxProps?: ICheckboxProps;
}

/**
 * Any additional state for the Checkbox input. Currently none
 */
export interface IFormCheckBoxState extends IFormBaseInputState<boolean> {

}

/**
 * Checkbox input for the Form. Displays a boolean value as a checkbox
 */
export class FormCheckBox extends FormBaseInput<boolean, IFormCheckBoxProps, IFormCheckBoxState> {

  constructor(props: IFormCheckBoxProps, context: any) {
    super(props, context);
    this.state = {
      isValid: true,
      currentValue: this.props.value || false,
      currentError: undefined
    };

    this.validateCheckboxProps(props.checkboxProps);
  }

  /**
   * The name of this component
   */
  public name(): string {
    return "FormCheckbox";
  }

  /**
   * Render a checkbox
   */
  public renderComponent() {
    return (
      <Checkbox
        {...this.props.checkboxProps}
        key={ this.props.inputKey }
        onChange={ (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => this.setValue(isChecked) }
        checked={ this.state.currentValue }
      />
    );
  }

  private validateCheckboxProps(props?: ICheckboxProps): void {
    if (props) {
      if (props.checked != null) {
        console.warn("FormCheckBox: 'checked' prop was specified and will be ignored");
      }

      if (props.onChange != null) {
        console.warn("FormCheckBox: 'onChange' prop was specified and will be ignored");
      }
    }
  }
}
