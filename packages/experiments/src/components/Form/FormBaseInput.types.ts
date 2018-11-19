import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IValidator } from './validators/Validators';

/**
 * The base props for any simple form input
 */
export interface IFormBaseInputProps<T> extends IBaseProps {
  /** The key of this input. This value will be used to key form results */
  inputKey: string;

  /** The initial value of this input */
  value?: T;

  /** Any validator functions to run when the input is updated */
  validators?: IValidator[];

  /** The interval when validation and update callbacks should be fired */
  debounceInterval?: number;
}
