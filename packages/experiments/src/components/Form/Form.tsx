import * as React from "react";

// Components
import { IFormProps } from "./Form.Props";
import { GenericFormInput } from "./FormBaseInput";

// Utilities
import {
  autobind,
  BaseComponent,
  getNativeProps,
  divProperties
} from "office-ui-fabric-react/lib/Utilities";

/**
 * Validation result for a simple form input. All calls to validate return this type
 */
export type IFormValidationResult = {
  /**
   * Is the field valid?
   */
  isValid: boolean;

  /**
   * Did the field fail validation because it was required?
   */
  wasRequired: boolean;

  /**
   * Optional error message
   */
  errorMessage?: string;

  /**
   * The validated input
   */
  component: GenericFormInput;
};


/**
 * The child context for form inputs to use
 */
export type IFormContext = {
  /**
   * Is the form valid currently?
   */
  isFormValid: () => boolean;

  /**
   * Register the input with SimpleForm. Should be called during componentWillMount
   */
  mountInput: (input: GenericFormInput) => void;

  /**
   * Unregister the input with SimpleForm. Should be called during componentWillUnmount
   */
  unmountInput: (input: GenericFormInput) => void;

  /**
   * Validate the passed in field, set its error state, and call the onUpdate handler if there is one
   */
  submitValue: (input: GenericFormInput) => void;
};

/**
 * The state for Form
 */
export interface IFormState {
  /** The current validation results for the inputs in the form */
  validationResults: { [key: string]: IFormValidationResult };
}

/**
 * Use this component to host forms
 */
export class Form extends BaseComponent<IFormProps, IFormState> {
  /**
   * This is needed because React 15's context does not work well with typescript
   */
  protected static childContextTypes: React.ValidationMap<any> = {
    isFormValid: React.PropTypes.func.isRequired,
    mountInput: React.PropTypes.func.isRequired,
    unmountInput: React.PropTypes.func.isRequired,
    submitValue: React.PropTypes.func.isRequired
  };

  /**
   * All registered inputs the form is aware of
   */
  private mountedInputs: GenericFormInput[];

  /** Flag which marks whether or not the form has attempted to have been submitted */
  private pristine: boolean;

  constructor(props: IFormProps, context: any) {
    super(props, context);
    this.mountedInputs = [];
    this.pristine = true;
    this.state = {
      validationResults: {}
    };
  }

  /**
   * Renders a form component and all child inputs
   */
  public renderComponent(): JSX.Element {
    let nativeProps = getNativeProps(this.props, divProperties);
    return (
      <form
        {...nativeProps}
        onSubmit={ this.onSubmit.bind(this) }
      >
        { this.props.children }
      </form>
    );
  }

  /**
   * Get the context for child components to use
   */
  public getChildContext(): IFormContext {
    return {
      isFormValid: this.isFormValid,
      mountInput: this.mountInput,
      unmountInput: this.unmountInput,
      submitValue: this.submitValue
    };
  }

  /**
   * Get all the values from the inputs that have registered with the form
   * Returns a dictionary keyed by the input names
   */
  private getFormValues(): { [key: string]: any } {
    let formValues: { [key: string]: any } = {};
    this.mountedInputs.forEach((input: GenericFormInput) => {
      formValues[input.props.inputKey] = input.state.currentValue;
    });

    return formValues;
  }

  /**
   * Validate an individual input and set its error state
   * Returns the validation result
   * @param input The input to validate
   */
  private validateComponent(input: GenericFormInput): IFormValidationResult {
    let validationResult = input.doValidate();
    if (!validationResult.isValid && (this.props.showErrorsWhenPristine || !this.pristine)) {
      if (validationResult.wasRequired) {
        input.setError(input.props.requiredErrorMessage || this.props.validatorRequiredMessage);
      } else {
        input.setError(validationResult.errorMessage);
      }
    } else {
      input.clearError();
    }

    return validationResult;
  }

  /**
   * Validate all the individual inputs and set their error state
   * Returns a list of the validation results
   */
  private validateForm(): { [key: string]: IFormValidationResult } {
    let validationResults: { [key: string]: IFormValidationResult } = {};
    this.mountedInputs.forEach((input: GenericFormInput) => {
      validationResults[input.props.inputKey] = this.validateComponent(input);
    });

    this.setState((prevState: IFormState) => {
      prevState.validationResults = validationResults;
      return prevState;
    });

    return validationResults;
  }

  /**
   * When the form is submitted. This will validate the form and call the appropriate submit callback
   * @param event The form event
   */
  private onSubmit(event: React.FormEvent<HTMLElement>): void {
    event.preventDefault();
    if (this.pristine) {
      this.pristine = false;
    }

    if (this.props.onSubmit) {
      let validationResults = this.validateForm();
      let formIsValid: boolean = this.isFormValid(validationResults);
      let formValues: { [key: string]: any } = this.getFormValues();

      if (formIsValid) {
        this.props.onSubmit(formValues);
      } else if (this.props.onInvalidSubmit) {
        this.props.onInvalidSubmit(formValues);
      }
    }
  }

  /**
   * Register an input with the form
   * @param input The input to register
   */
  @autobind
  private mountInput(input: GenericFormInput) {
    if (this.mountedInputs.indexOf(input) === -1) {
      this.mountedInputs.push(input);
      this.setState((prevState: IFormState) => {
        prevState.validationResults[input.props.inputKey] = this.validateComponent(input);
        return prevState;
      });
    }
  }

  @autobind
  private submitValue(input: GenericFormInput): void {
    let validationResult: IFormValidationResult = this.validateComponent(input);
    this.setState((prevState: IFormState) => {
      prevState.validationResults[input.props.inputKey] = validationResult;
      return prevState;
    });

    if (validationResult.isValid) {
      if (this.props.onUpdated) {
        this.props.onUpdated(input.props.inputKey, input.state.currentValue);
      }
    }
  }

  /**
   * Unregister an input with the form
   * @param input The input to unregister
   */
  @autobind
  private unmountInput(input: GenericFormInput) {
    let currentIndex: number = this.mountedInputs.indexOf(input);
    if (currentIndex > -1) {
      this.mountedInputs.splice(currentIndex, 1);
      this.setState((prevState: IFormState) => {
        delete prevState.validationResults[input.props.inputKey];
        return prevState;
      });
    }
  }

  @autobind
  private isFormValid(validationResults: { [key: string]: IFormValidationResult } = this.state.validationResults): boolean {
    for (let key in validationResults) {
      if (!validationResults[key].isValid) {
        return false;
      }
    }

    return true;
  }
}