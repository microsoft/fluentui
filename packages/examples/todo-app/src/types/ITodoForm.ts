/**
 * Props for TodoForm component.
 */
export interface ITodoFormProps {
  /**
   * onSubmit callback triggered when the is submitted.
   * Either triggered by clicking on add button or pressed Enter key in input field.
   *
   * @params {string} title represents the value in input box when submitting.
   */
  onSubmit: (title: string) => void;
}

/**
 * States for TodoForm component.
 */
export interface ITodoFormState {
  /**
   * inputValue is the react state of input box value.
   */
  inputValue: string;

  /**
   * The error message will show below the input box if the title filled in is invalid.
   */
  errorMessage: string;
}