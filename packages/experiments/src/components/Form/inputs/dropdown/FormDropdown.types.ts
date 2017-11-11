import { IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { IFormBaseInputProps } from '../../FormBaseInput';
export { IDropdownProps };

export interface IFormDropdownProps extends IFormBaseInputProps<number | string> {
  /** Props for the Dropdown component */
  dropdownProps?: IDropdownProps;
}