import * as React from "react";

// Components
import { IFormValidationResult } from "../Form";
import { FormBaseInput, IFormBaseInputProps, IFormBaseInputState } from "../FormBaseInput";
import { TextField, ITextFieldProps } from "office-ui-fabric-react/lib/TextField";

export { ITextFieldProps };

/**
 * Additional props for the TextBox input
 */
export interface IFormTextInputProps extends IFormBaseInputProps<string> {
  textFieldProps?: ITextFieldProps;
}

/**
 * Any additional state for the TextBox input. Currently none.
 */
export interface IFormTextInputState extends IFormBaseInputState<string> {

}

/**
 * TextBox input for the Form.
 */
export class FormTextInput extends FormBaseInput<string, IFormTextInputProps, IFormTextInputState> {

  constructor(props: IFormTextInputProps, context: any) {
    super(props, context, false /* Leading edge debounce */);
    this.state = {
      isValid: true,
      currentValue: this.props.value || "",
      currentError: undefined
    };

    this.validateTextFieldProps(this.props.textFieldProps);
  }

  /**
   * Name of this component
   */
  public name(): string {
    return "FormTextBox";
  }

  /**
   * Render a Fabric TextBox
   */
  public render() {
    return (
      <TextField
        {...this.props.textFieldProps}
        key={ this.props.inputKey }
        value={ this.state.currentValue }
        onBeforeChange={ (value: string) => { this.setValue(value); } }
        errorMessage={ this.state.currentError }
      />
    );
  }

  /**
   * Additionally, validate whitespace
   */
  public doValidate(): IFormValidationResult {
    let validationResult: IFormValidationResult = {
      isValid: true,
      wasRequired: false,
      errorMessage: "",
      component: this
    };

    if (this.props.required && this.state.currentValue && !(this.state.currentValue.trim())) {
      validationResult.isValid = false;
      validationResult.wasRequired = true;
      return validationResult;
    }

    return super.doValidate();
  }

  private validateTextFieldProps(props?: ITextFieldProps): void {
    if (props) {
      if (props.errorMessage != null) {
        console.warn("FormTextBox: 'errorMessage' prop was specified and will be ignored");
      }

      if (props.value != null) {
        console.warn("FormTextBox: 'value' prop was specified and will be ignored");
      }

      if (props.onBeforeChange != null) {
        console.warn("FormTextBox: 'onBeforeChange' prop was specified and will be ignored");
      }
    }
  }
}
