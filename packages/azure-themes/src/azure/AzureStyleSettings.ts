import { ITheme } from '@fluentui/react';
import { ActionButtonStyles } from './styles/ActionButton.styles';
import { BreadcrumbStyles } from './styles/Breadcrumb.styles';
import { CalloutContentStyles } from './styles/Callout.styles';
import { CheckboxStyles } from './styles/Checkbox.styles';
import { CheckStyles, DetailsRowStyles, DetailsListStyles } from './styles/DetailsList.styles';
import { ChoiceGroupOptionStyles } from './styles/ChoiceGroupOptions.styles';
import { ColorPickerGridCellStyles } from './styles/ColorPickerGridCell.styles';
import { ColorPickerStyles, ColorRectangleStyles, ColorSliderStyles } from './styles/ColorPicker.styles';
import { ComboBoxStyles } from './styles/ComboBox.styles';
import { CommandBarStyles } from './styles/CommandBar.styles';
import { CommandBarButtonStyles } from './styles/CommandBarButton.styles';
import { CompoundButtonStyles } from './styles/CompoundButton.styles';
import { ContextualMenuStyles } from './styles/ContextualMenu.styles';
import { DatePickerStyles } from './styles/DatePicker.styles';
import { DefaultButtonStyles } from './styles/DefaultButton.styles';
import { DialogContentStyles, DialogFooterStyles } from './styles/Dialog.styles';
import { DocumentCardStyles } from './styles/DocumentCard.styles';
import { DropdownStyles } from './styles/DropDown.styles';
import { IconButtonStyles } from './styles/IconButton.styles';
import { LabelStyles } from './styles/Label.styles';
import { LinkStyles } from './styles/Link.styles';
import { MessageBarStyles } from './styles/MessageBar.styles';
import { ModalStyles } from './styles/Modal.styles';
import { OverlayStyles } from './styles/Overlay.styles';
import { NavStyles } from './styles/Nav.styles';
import { PanelStyles } from './styles/Panel.styles';
import { PivotStyles } from './styles/Pivot.styles';
import { ExpandingCardStyles, PlainCardStyles } from './styles/HoverCard.styles';
import { PrimaryButtonStyles } from './styles/PrimaryButton.styles';
import { ProgressIndicatorStyles } from './styles/ProgressIndicator.styles';
import { RatingStyles } from './styles/Rating.styles';
import { SearchBoxStyles } from './styles/SearchBox.styles';
import { SliderStyles } from './styles/Slider.styles';
import { SpinButtonStyles } from './styles/SpinButton.styles';
import { SuggestionItemStyles } from './styles/SuggestionsItem.styles';
import { SuggestionsStyles } from './styles/Suggestions.styles';
import { TagItemStyles } from './styles/TagItem.styles';
import { TagPickerStyles } from './styles/TagPicker.styles';
import { TeachingBubbleStyles } from './styles/TeachingBubble.styles';
import { TextFieldStyles } from './styles/TextField.styles';
import { ToggleStyles } from './styles/Toggle.styles';
import { TooltipStyles } from './styles/Tooltip.styles';

// TODO: "any" is used here to get around "is using xxx but cannot be named" TS error. Should be able to remove
//        this 'any' once we upgrade to TS3.1+
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AzureStyleSettings = (theme: ITheme): any => {
  return {
    ActionButton: {
      styles: ActionButtonStyles(theme),
    },
    Breadcrumb: {
      styles: BreadcrumbStyles,
    },
    CalloutContent: {
      styles: CalloutContentStyles,
    },
    ColorPicker: {
      styles: ColorPickerStyles,
    },
    ColorRectangle: {
      styles: ColorRectangleStyles,
    },
    ColorSlider: {
      styles: ColorSliderStyles,
    },
    CommandBar: {
      styles: CommandBarStyles,
    },
    CommandBarButton: {
      styles: CommandBarButtonStyles(theme),
    },
    CompoundButton: {
      styles: CompoundButtonStyles(theme),
    },
    Check: {
      styles: CheckStyles,
    },
    Checkbox: {
      styles: CheckboxStyles,
    },
    ChoiceGroupOption: {
      styles: ChoiceGroupOptionStyles,
    },
    ColorPickerGridCell: {
      styles: ColorPickerGridCellStyles,
    },
    ComboBox: {
      styles: ComboBoxStyles(theme),
    },
    ContextualMenu: {
      styles: ContextualMenuStyles,
    },
    DatePicker: {
      styles: DatePickerStyles,
    },
    DefaultButton: {
      styles: DefaultButtonStyles(theme),
    },
    DetailsList: {
      styles: DetailsListStyles,
    },
    DetailsRow: {
      styles: DetailsRowStyles,
    },
    DialogContent: {
      styles: DialogContentStyles,
    },
    DialogFooter: {
      styles: DialogFooterStyles,
    },
    DocumentCard: {
      styles: DocumentCardStyles,
    },
    Dropdown: {
      styles: DropdownStyles,
    },
    ExpandingCard: {
      styles: ExpandingCardStyles,
    },
    IconButton: {
      styles: IconButtonStyles(theme),
    },
    Label: {
      styles: LabelStyles,
    },
    Link: {
      styles: LinkStyles,
    },
    MessageBar: {
      styles: MessageBarStyles,
    },
    Modal: {
      styles: ModalStyles,
    },
    Overlay: {
      styles: OverlayStyles,
    },
    Nav: {
      styles: NavStyles,
    },
    Pivot: {
      styles: PivotStyles,
    },
    PlainCard: {
      styles: PlainCardStyles,
    },
    Panel: {
      styles: PanelStyles,
    },
    PrimaryButton: {
      styles: PrimaryButtonStyles(theme),
    },
    ProgressIndicator: {
      styles: ProgressIndicatorStyles,
    },
    Rating: {
      styles: RatingStyles,
    },
    Slider: {
      styles: SliderStyles,
    },
    SearchBox: {
      styles: SearchBoxStyles,
    },
    SpinButton: {
      styles: SpinButtonStyles,
    },
    TagPicker: {
      styles: TagPickerStyles,
    },
    TagItem: {
      styles: TagItemStyles,
    },
    SuggestionItem: {
      styles: SuggestionItemStyles,
    },
    Suggestions: {
      styles: SuggestionsStyles,
    },
    TeachingBubble: {
      styles: TeachingBubbleStyles,
    },
    TextField: {
      styles: TextFieldStyles,
    },
    Toggle: {
      styles: ToggleStyles,
    },
    Tooltip: {
      styles: TooltipStyles,
    },
  };
};
