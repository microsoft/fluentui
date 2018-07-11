import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';

export { IButtonProps };

export interface IFormConditionalSubmitButtonProps extends IBaseProps {
  /** Props for the fabric button */
  buttonProps?: IButtonProps;
}
