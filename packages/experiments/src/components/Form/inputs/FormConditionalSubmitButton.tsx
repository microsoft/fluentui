import * as React from "react";

// Components
import { BaseComponent, IBaseProps } from "office-ui-fabric-react/lib/Utilities";
import { PrimaryButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { IFormContext } from "../Form";

export { IButtonProps };

/**
 * Additional props for the Dropdown input
 */
export interface IFormConditionalSubmitButtonProps extends IBaseProps {
  buttonProps?: IButtonProps;
}

/**
 * Any additional state for the Dropdown input. Currently none
 */
export interface IFormConditionalSubmitButtonState {

}

/**
 * Submit button for the form which is disabled when the form is invalid
 */
export class FormConditionalSubmitButton extends BaseComponent<IFormConditionalSubmitButtonProps, IFormConditionalSubmitButtonState> {

  protected static contextTypes: React.ValidationMap<any> = {
    isFormValid: React.PropTypes.func.isRequired,
    mountInput: React.PropTypes.func.isRequired,
    unmountInput: React.PropTypes.func.isRequired,
    submitValue: React.PropTypes.func.isRequired
  };

  /**
   * Form context passed by the parent form
   */
  private formContext: IFormContext;

  constructor(props: IFormConditionalSubmitButtonProps, formContext: IFormContext) {
    super(props, formContext);
    this.formContext = formContext;
  }

  /**
   * Render a Fabric Dropdown
   */
  public render() {
    const {
        children
    } = this.props;

    return (
      <PrimaryButton
        type="submit"
        disabled={ !this.formContext.isFormValid() }
        {...this.props.buttonProps}
      >
        { children }
      </PrimaryButton>
    );
  }
}
