/* tslint:disable:no-any */

import * as React from 'react';
import * as PropTypes from 'prop-types';

// Components
import { IFormProps } from './Form.types';
import { GenericFormInput } from './FormBaseInput';

// Utilities
import { BaseComponent, getNativeProps, divProperties } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Validation result for a simple form input. All calls to validate return this type
 */
export type IFormValidationResult = {
  /**
   * Is the field valid?
   */
  isValid: boolean;

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
  protected static childContextTypes: React.ValidationMap<IFormContext> = {
    isFormValid: PropTypes.func.isRequired,
    mountInput: PropTypes.func.isRequired,
    unmountInput: PropTypes.func.isRequired,
    submitValue: PropTypes.func.isRequired
  };

  /**
   * All registered inputs the form is aware of
   */
  private _mountedInputs: GenericFormInput[];

  /** Flag which marks whether or not the form has attempted to have been submitted */
  private _pristine: boolean;

  constructor(props: IFormProps) {
    super(props);
    this._mountedInputs = [];
    this._pristine = true;
    this.state = {
      validationResults: {}
    };
  }

  /**
   * Renders a form component and all child inputs
   */
  public render(): JSX.Element {
    const nativeProps = getNativeProps(this.props, divProperties);
    return (
      <form {...nativeProps} onSubmit={this._onSubmit}>
        {this.props.children}
      </form>
    );
  }

  /**
   * Get the context for child components to use
   */
  public getChildContext(): IFormContext {
    return {
      isFormValid: this._isFormValid,
      mountInput: this._mountInput,
      unmountInput: this._unmountInput,
      submitValue: this._submitValue
    };
  }

  /**
   * Get all the values from the inputs that have registered with the form
   * Returns a dictionary keyed by the input names
   */
  private _getFormValues(): { [key: string]: any } {
    const formValues: { [key: string]: any } = {};
    this._mountedInputs.forEach((input: GenericFormInput) => {
      formValues[input.props.inputKey] = input.state.currentValue;
    });

    return formValues;
  }

  /**
   * Validate an individual input and set its error state
   * Returns the validation result
   * @param input The input to validate
   */
  private _validateComponent(input: GenericFormInput): IFormValidationResult {
    const validationResult = input.doValidate();
    if (!validationResult.isValid && (this.props.showErrorsWhenPristine || !this._pristine)) {
      input.setError(validationResult.errorMessage);
    } else {
      input.clearError();
    }

    return validationResult;
  }

  /**
   * Validate all the individual inputs and set their error state
   * Returns a list of the validation results
   */
  private _validateForm(): { [key: string]: IFormValidationResult } {
    const validationResults: { [key: string]: IFormValidationResult } = {};
    this._mountedInputs.forEach((input: GenericFormInput) => {
      validationResults[input.props.inputKey] = this._validateComponent(input);
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
  private _onSubmit = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    if (this._pristine) {
      this._pristine = false;
    }

    if (this.props.onSubmit) {
      const validationResults = this._validateForm();
      const formIsValid: boolean = this._isFormValid(validationResults);
      const formValues: { [key: string]: any } = this._getFormValues();

      if (formIsValid) {
        this.props.onSubmit(formValues);
      } else if (this.props.onInvalidSubmit) {
        this.props.onInvalidSubmit(formValues);
      }
    }
  };

  /**
   * Register an input with the form
   * @param input The input to register
   */
  private _mountInput = (input: GenericFormInput): void => {
    if (this._mountedInputs.indexOf(input) === -1) {
      this._mountedInputs.push(input);
      this.setState((prevState: IFormState) => {
        prevState.validationResults[input.props.inputKey] = this._validateComponent(input);
        return prevState;
      });
    }
  };

  private _submitValue = (input: GenericFormInput): void => {
    const validationResult: IFormValidationResult = this._validateComponent(input);
    this.setState((prevState: IFormState) => {
      prevState.validationResults[input.props.inputKey] = validationResult;
      return prevState;
    });

    if (validationResult.isValid) {
      if (this.props.onUpdated) {
        this.props.onUpdated(input.props.inputKey, input.state.currentValue);
      }
    }
  };

  /**
   * Unregister an input with the form
   * @param input The input to unregister
   */
  private _unmountInput = (input: GenericFormInput): void => {
    const currentIndex: number = this._mountedInputs.indexOf(input);
    if (currentIndex > -1) {
      this._mountedInputs.splice(currentIndex, 1);
      this.setState((prevState: IFormState) => {
        delete prevState.validationResults[input.props.inputKey];
        return prevState;
      });
    }
  };

  private _isFormValid = (validationResults: { [key: string]: IFormValidationResult } = this.state.validationResults): boolean => {
    for (const key in validationResults) {
      if (!validationResults[key].isValid) {
        return false;
      }
    }

    return true;
  };
}
