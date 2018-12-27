import { ITheme } from 'office-ui-fabric-react';
import { CommandBarStyles } from './styles/CommandBar.styles';
import { commandBarButtonStyles } from './styles/CommandBarButton.styles';
import { DropdownStyles } from './styles/DropDown.styles';
import { LabelStyles } from './styles/Label.styles';
import { TextFieldStyles } from './styles/TextField.styles';
import { ChoiceGroupOptionStyles } from './styles/ChoiceGroupOptions.styles';

// TODO: "any" is used here to get around "is using xxx but cannot be named" TS error. Should be able to remove
//        this 'any' once we upgrade to TS3.1+
// tslint:disable-next-line:no-any
export const AzureStyleSettings = (theme: ITheme): any => {
  return {
    // Breadcrumb: {
    //   styles: BreadcrumbStyles
    // },
    // CalloutContent: {
    //   styles: CalloutContentStyles
    // },
    // ColorPicker: {
    //   styles: ColorPickerStyles
    // },
    // ColorRectangle: {
    //   styles: ColorRectangleStyles
    // },
    // ColorSlider: {
    //   styles: ColorSliderStyles
    // },
    CommandBar: {
      styles: CommandBarStyles
    },
    CommandBarButton: {
      styles: commandBarButtonStyles(theme)
    },
    // CompoundButton: {
    //   styles: CompoundButtonStyles(extendedTheme)
    // },
    // Check: {
    //   styles: CheckStyles
    // },
    // Checkbox: {
    //   styles: CheckboxStyles
    // },
    ChoiceGroupOption: {
      styles: ChoiceGroupOptionStyles
    },
    // ColorPickerGridCell: {
    //   styles: ColorPickerGridCellStyles
    // },
    // ComboBox: {
    //   styles: ComboBoxStyles
    // },
    // ContextualMenu: {
    //   styles: ContextualMenuStyles
    // },
    // DatePicker: {
    //   styles: DatePickerStyles
    // },
    // DefaultButton: {
    //   styles: DefaultButtonStyles(extendedTheme)
    // },
    // DetailsRow: {
    //   styles: DetailsRowStyles
    // },
    // DialogContent: {
    //   styles: DialogContentStyles
    // },
    // DialogFooter: {
    //   styles: DialogFooterStyles
    // },
    Dropdown: {
      styles: DropdownStyles
    },
    // ExpandingCard: {
    //   styles: ExpandingCardStyles
    // },
    // IconButton: {
    //   styles: IconButtonStyles
    // },
    Label: {
      styles: LabelStyles
    },
    // Link: {
    //   styles: LinkStyles
    // },
    // Modal: {
    //   styles: ModalStyles
    // },
    // Pivot: {
    //   styles: PivotStyles
    // },
    // PlainCard: {
    //   styles: PlainCardStyles
    // },
    // PrimaryButton: {
    //   styles: PrimaryButtonStyles
    // },
    // Rating: {
    //   styles: RatingStyles
    // },
    // Slider: {
    //   styles: SliderStyles
    // },
    // SpinButton: {
    //   styles: SpinButtonStyles
    // },
    // TeachingBubble: {
    //   styles: TeachingBubbleStyles
    // },
    TextField: {
      styles: TextFieldStyles
    }
    // Toggle: {
    //   styles: ToggleStyles
    // }
  };
};
