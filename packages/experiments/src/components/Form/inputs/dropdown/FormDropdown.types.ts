import { IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { IFormBaseInputProps } from '../../FormBaseInput';
export { IDropdownProps };

export type DropdownValue = number | string | number[] | string[];

export interface IFormDropdownProps extends IFormBaseInputProps<DropdownValue> {
  /** Props for the Dropdown component */
  dropdownProps?: IDropdownProps;
}
