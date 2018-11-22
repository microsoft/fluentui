import { BreadcrumbStyles } from './styles/Breadcrumb.styles';
import { CheckStyles, DetailsRowStyles } from './styles/DetailsList.styles';
import { CalloutContentStyles } from './styles/Callout.styles';
import { CheckboxStyles } from './styles/Checkbox.styles';
import { ChoiceGroupOptionStyles } from './styles/ChoiceGroupOption.styles';
import { ColorPickerStyles, ColorRectangleStyles, ColorSliderStyles } from './styles/ColorPicker.styles';
import { ComboBoxStyles } from './styles/ComboBox.styles';
import { CommandBarStyles } from './styles/CommandBar.styles';
import { CommandBarButtonStyles } from './styles/CommandBarButton.styles';
import { CompoundButtonStyles } from './styles/CompoundButton.styles';
import { ContextualMenuStyles } from './styles/ContextualMenu.styles';
import { DatePickerStyles } from './styles/DatePicker.styles';
import { DefaultButtonStyles } from './styles/DefaultButton.styles';
import { DialogContentStyles, DialogFooterStyles } from './styles/Dialog.styles';
import { DropdownStyles } from './styles/Dropdown.styles';
import { ExpandingCardStyles, PlainCardStyles } from './styles/HoverCard.styles';
import { IconButtonStyles } from './styles/IconButton.styles';
import { LabelStyles } from './styles/Label.styles';
import { LinkStyles } from './styles/Link.styles';
import { ModalStyles } from './styles/Modal.styles';
import { PivotStyles } from './styles/Pivot.styles';
import { PrimaryButtonStyles } from './styles/PrimaryButton.styles';
import { RatingStyles } from './styles/Rating.styles';
import { SliderStyles } from './styles/Slider.styles';
import { SpinButtonStyles } from './styles/SpinButton.styles';
import { TextFieldStyles } from './styles/TextField.styles';
import { ToggleStyles } from './styles/Toggle.styles';
import { ColorPickerGridCellStyles } from './styles/ColorPickerGridCell.styles';

// Roll up all style overrides in a single "Fluent theme" object

// TODO: "any" is used here to get around "is using xxx but cannot be named" TS error. Should be able to remove
//        this 'any' once we upgrade to TS3.1+
// tslint:disable-next-line:no-any
export const FluentStyles: any = {
  Breadcrumb: {
    styles: BreadcrumbStyles
  },
  CalloutContent: {
    styles: CalloutContentStyles
  },
  ColorPicker: {
    styles: ColorPickerStyles
  },
  ColorRectangle: {
    styles: ColorRectangleStyles
  },
  ColorSlider: {
    styles: ColorSliderStyles
  },
  CommandBar: {
    styles: CommandBarStyles
  },
  CommandBarButton: {
    styles: CommandBarButtonStyles
  },
  CompoundButton: {
    styles: CompoundButtonStyles
  },
  Check: {
    styles: CheckStyles
  },
  Checkbox: {
    styles: CheckboxStyles
  },
  ChoiceGroupOption: {
    styles: ChoiceGroupOptionStyles
  },
  ColorPickerGridCell: {
    styles: ColorPickerGridCellStyles
  },
  ComboBox: {
    styles: ComboBoxStyles
  },
  ContextualMenu: {
    styles: ContextualMenuStyles
  },
  DatePicker: {
    styles: DatePickerStyles
  },
  DefaultButton: {
    styles: DefaultButtonStyles
  },
  DetailsRow: {
    styles: DetailsRowStyles
  },
  DialogContent: {
    styles: DialogContentStyles
  },
  DialogFooter: {
    styles: DialogFooterStyles
  },
  Dropdown: {
    styles: DropdownStyles
  },
  ExpandingCard: {
    styles: ExpandingCardStyles
  },
  IconButton: {
    styles: IconButtonStyles
  },
  Label: {
    styles: LabelStyles
  },
  Link: {
    styles: LinkStyles
  },
  Modal: {
    styles: ModalStyles
  },
  Pivot: {
    styles: PivotStyles
  },
  PlainCard: {
    styles: PlainCardStyles
  },
  PrimaryButton: {
    styles: PrimaryButtonStyles
  },
  Rating: {
    styles: RatingStyles
  },
  Slider: {
    styles: SliderStyles
  },
  SpinButton: {
    styles: SpinButtonStyles
  },
  TextField: {
    styles: TextFieldStyles
  },
  Toggle: {
    styles: ToggleStyles
  }
};
