
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonBaseProps } from 'office-ui-fabric-react/lib/Button';

export { IButtonBaseProps };

export interface IFormConditionalSubmitButtonProps extends IBaseProps {
  /** Props for the fabric button */
  buttonProps?: IButtonBaseProps;
}
