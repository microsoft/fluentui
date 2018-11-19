import * as React from 'react';
import * as PropTypes from 'prop-types';

// Components
import { IFormConditionalSubmitButtonProps } from './FormConditionalSubmitButton.types';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IFormContext } from '../../Form';

/**
 * Submit button for the form which is disabled when the form is invalid
 */
export class FormConditionalSubmitButton extends BaseComponent<IFormConditionalSubmitButtonProps> {
  protected static contextTypes: React.ValidationMap<IFormContext> = {
    isFormValid: PropTypes.func.isRequired,
    mountInput: PropTypes.func.isRequired,
    unmountInput: PropTypes.func.isRequired,
    submitValue: PropTypes.func.isRequired
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
    const { children } = this.props;

    return (
      <PrimaryButton type="submit" disabled={!this.formContext.isFormValid()} {...this.props.buttonProps}>
        {children}
      </PrimaryButton>
    );
  }
}
