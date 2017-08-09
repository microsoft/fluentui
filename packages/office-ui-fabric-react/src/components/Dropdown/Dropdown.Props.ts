import { IRenderFunction } from '../../Utilities';
import { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.Props';
import { ISelectableDroppableTextProps } from '../../utilities/selectableOption/SelectableDroppableText.Props';
import { ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

export { SelectableOptionMenuItemType as DropdownMenuItemType } from '../../utilities/selectableOption/SelectableOption.Props';

export interface IDropdown {
  focus: () => void;
}

export interface IDropdownProps extends ISelectableDroppableTextProps<HTMLDivElement> {
  /**
   * Input placeholder text. Displayed until option is selected.
   */
  placeHolder?: string;

  /**
   * Callback issues when the selected option changes
   */
  onChanged?: (option: IDropdownOption) => void;

  /**
   * Optional custom renderer for placeholder text
   */
  onRenderPlaceHolder?: IRenderFunction<IDropdownProps>;

  /**
   * Optional custom renderer for selected option displayed in input
   */
  onRenderTitle?: IRenderFunction<IDropdownOption | IDropdownOption[]>;

  /**
   * Custom width for dropdown. If value is 0, width of the input field is used.
   * @default 0
   */
  dropdownWidth?: number;

  responsiveMode?: ResponsiveMode;

  /**
   * Optional mode indicates if multi-choice selections is allowed.  Default to false
   */
  multiSelect?: boolean;

  /**
   * Keys that will be initially used to set selected items.
   */
  defaultSelectedKeys?: string[] | number[];

  /**
  * Keys of the selected items. If you provide this, you must maintain selection
  * state by observing onChange events and passing a new value in when changed.
  */
  selectedKeys?: string[] | number[];

  /**
   * Deprecated at v0.52.0, use 'disabled' instead.
   * @deprecated
   */
  isDisabled?: boolean;
}

export interface IDropdownOption extends ISelectableOption {
  /**
   * Data available to custom onRender functions.
   */
  data?: any;

  /**
   * Deprecated at v.65.1, use 'selected' instead.
   * @deprecated
   */
  isSelected?: boolean;
}
