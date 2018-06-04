import { IFormBaseInputProps } from '../../FormBaseInput';
import { ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
export { ICheckboxProps };

export interface IFormCheckBoxProps extends IFormBaseInputProps<boolean> {
  /** Extra props for the Fabric checkbox */
  checkboxProps?: ICheckboxProps;
}
