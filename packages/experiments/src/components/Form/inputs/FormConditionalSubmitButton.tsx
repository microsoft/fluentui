import * as React from 'react';

// Components
import { IFormConditionalSubmitButtonProps } from "./FormConditionalSubmitButton.Props";
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IFormContext } from '../Form';

/**
 * Submit button for the form which is disabled when the form is invalid
 */
export class FormConditionalSubmitButton extends BaseComponent<IFormConditionalSubmitButtonProps> {

  protected static contextTypes: React.ValidationMap<IFormContext> = {
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
  public render(): JSX.Element {
    const {
        children
    } = this.props;

    return (
      <PrimaryButton
        type='submit'
        disabled={ !this.formContext.isFormValid() }
        {...this.props.buttonProps}
      >
        { children }
      </PrimaryButton>
    );
  }
}
