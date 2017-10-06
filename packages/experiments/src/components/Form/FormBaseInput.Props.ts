/**
 * The base props for any simple form input
 */
export interface IFormBaseInputProps<T> {
  componentRef?: (component: any) => void;

  /** The key of this input. This value will be used to key form results */
  inputKey: string;

  /** The initial value of this input */
  value?: T;

  /** Is this field required? */
  required?: boolean;

  /** Any validator functions to run when the input is updated */
  validators?: ((val: T) => string)[];

  /** The interval when validation and update callbacks should be fired */
  debounceInterval?: number;

  /** Optional error message input will use if required gets hit */
  requiredErrorMessage?: string;
}