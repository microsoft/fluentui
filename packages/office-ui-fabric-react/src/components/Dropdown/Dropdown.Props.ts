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
   * Custom width for dropdown. Otherwise the width of the input field is used.
   */
  dropdownWidth?: number;

  /**
   * Callback issues when the selected option changes
   */
  onChanged?: (option: IDropdownOption, index?: number) => void;

  /**
   * Optional custom renderer for placeholder text
   */
  onRenderPlaceHolder?: IRenderFunction<IDropdownProps>;

  /**
   * Optional custom renderer for selected option displayed in input
   */
  onRenderTitle?: IRenderFunction<IDropdownOption>;

  responsiveMode?: ResponsiveMode;

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
