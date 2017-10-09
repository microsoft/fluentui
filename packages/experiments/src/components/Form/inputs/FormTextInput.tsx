import * as React from "react";

// Components
import { FormBaseInput, IFormBaseInputProps, IFormBaseInputState } from "../FormBaseInput";
import { TextField, ITextFieldProps } from "office-ui-fabric-react/lib/TextField";

// Utilities
import { autobind } from "office-ui-fabric-react/lib/Utilities";

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

    this._validateTextFieldProps(this.props.textFieldProps);
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
  public render(): JSX.Element {
    return (
      <TextField
        {...this.props.textFieldProps}
        key={ this.props.inputKey }
        value={ this.state.currentValue }
        onBeforeChange={ this._onChange }
        errorMessage={ this.state.currentError }
      />
    );
  }

  @autobind
  private _onChange(value: string) {
    this.setValue(value);
  }

  private _validateTextFieldProps(props?: ITextFieldProps): void {
    if (props) {
      if (props.errorMessage) {
        console.warn("FormTextBox: 'errorMessage' prop was specified and will be ignored");
      }

      if (props.value) {
        console.warn("FormTextBox: 'value' prop was specified and will be ignored");
      }

      if (props.onBeforeChange) {
        console.warn("FormTextBox: 'onBeforeChange' prop was specified and will be ignored");
      }
    }
  }
}
