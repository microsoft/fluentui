import { TextFieldStyles } from './styles/TextField.styles';
import { IExtendedTheme } from './IExtendedTheme';
// Roll up all style overrides in a single "Ibiza theme" object

// TODO: "any" is used here to get around "is using xxx but cannot be named" TS error. Should be able to remove
//        this 'any' once we upgrade to TS3.1+
// tslint:disable-next-line:no-any
export const IbizaStyle = (extendedTheme: IExtendedTheme): any => {
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
    // CommandBar: {
    //   styles: CommandBarStyles
    // },
    // CommandBarButton: {
    //   styles: CommandBarButtonStyles(extendedTheme)
    // },
    // CompoundButton: {
    //   styles: CompoundButtonStyles(extendedTheme)
    // },
    // Check: {
    //   styles: CheckStyles
    // },
    // Checkbox: {
    //   styles: CheckboxStyles
    // },
    // ChoiceGroupOption: {
    //   styles: ChoiceGroupOptionStyles
    // },
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
    // Dropdown: {
    //   styles: DropdownStyles
    // },
    // ExpandingCard: {
    //   styles: ExpandingCardStyles
    // },
    // IconButton: {
    //   styles: IconButtonStyles
    // },
    // Label: {
    //   styles: LabelStyles
    // },
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
