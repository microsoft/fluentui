import { ITheme } from 'office-ui-fabric-react';
import { CheckboxStyles } from './styles/Checkbox.styles';
import { CheckStyles, DetailsRowStyles, DetailsListStyles } from './styles/DetailsList.styles';
import { ChoiceGroupOptionStyles } from './styles/ChoiceGroupOptions.styles';
import { ComboBoxStyles } from './styles/ComboBox.styles';
import { CommandBarStyles } from './styles/CommandBar.styles';
import { CommandBarButtonStyles } from './styles/CommandBarButton.styles';
import { CompoundButtonStyles } from './styles/CompoundButton.styles';
import { ContextualMenuStyles } from './styles/ContextualMenu.styles';
import { DefaultButtonStyles } from './styles/DefaultButton.styles';
import { DropdownStyles } from './styles/DropDown.styles';
import { LabelStyles } from './styles/Label.styles';
import { LinkStyles } from './styles/Link.styles';
import { PanelStyles } from './styles/Panel.styles';
import { PrimaryButtonStyles } from './styles/PrimaryButton.styles';
import { TextFieldStyles } from './styles/TextField.styles';
import { SliderStyles } from './styles/Slider.styles';
import { IconButtonStyles } from './styles/IconButton.styles';
import { ActionButtonStyles } from './styles/ActionButton.styles';

// TODO: "any" is used here to get around "is using xxx but cannot be named" TS error. Should be able to remove
//        this 'any' once we upgrade to TS3.1+
// tslint:disable-next-line:no-any
export const AzureStyleSettings = (theme: ITheme): any => {
  return {
    ActionButton: {
      styles: ActionButtonStyles(theme)
    },
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
      styles: CommandBarButtonStyles(theme)
    },
    CompoundButton: {
      styles: CompoundButtonStyles(theme)
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
    // ColorPickerGridCell: {
    //   styles: ColorPickerGridCellStyles
    // },
    ComboBox: {
      styles: ComboBoxStyles(theme)
    },
    ContextualMenu: {
      styles: ContextualMenuStyles
    },
    // DatePicker: {
    //   styles: DatePickerStyles
    // },
    DefaultButton: {
      styles: DefaultButtonStyles(theme)
    },
    DetailsList: {
      styles: DetailsListStyles
    },
    DetailsRow: {
      styles: DetailsRowStyles
    },
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
    IconButton: {
      styles: IconButtonStyles(theme)
    },
    Label: {
      styles: LabelStyles
    },
    Link: {
      styles: LinkStyles
    },
    // Modal: {
    //   styles: ModalStyles
    // },
    // Pivot: {
    //   styles: PivotStyles
    // },
    // PlainCard: {
    //   styles: PlainCardStyles
    // },
    Panel: {
      styles: PanelStyles
    },
    PrimaryButton: {
      styles: PrimaryButtonStyles(theme)
    },
    // Rating: {
    //   styles: RatingStyles
    // },
    Slider: {
      styles: SliderStyles
    },
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
