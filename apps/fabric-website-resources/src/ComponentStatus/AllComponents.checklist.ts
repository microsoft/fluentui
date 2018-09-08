import { IComponentStatusProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
export interface IComponentStatusState {
  [key: string]: IComponentStatusProps;
}
export const AllComponentsStatus: IComponentStatusState = {
  ActivityItem: require<any>('office-ui-fabric-react/lib/components/ActivityItem/ActivityItem.checklist')
    .ActivityItemStatus,
  Breadcrumb: require<any>('office-ui-fabric-react/lib/components/Breadcrumb/Breadcrumb.checklist').BreadcrumbStatus,
  Button: require<any>('office-ui-fabric-react/lib/components/Button/Button.checklist').ButtonStatus,
  Calendar: require<any>('office-ui-fabric-react/lib/components/Calendar/Calendar.checklist').CalendarStatus,
  Callout: require<any>('office-ui-fabric-react/lib/components/Callout/Callout.checklist').CalloutStatus,
  Checkbox: require<any>('office-ui-fabric-react/lib/components/Checkbox/Checkbox.checklist').CheckboxStatus,
  ChoiceGroup: require<any>('office-ui-fabric-react/lib/components/ChoiceGroup/ChoiceGroup.checklist')
    .ChoiceGroupStatus,
  ColorPicker: require<any>('office-ui-fabric-react/lib/components/ColorPicker/ColorPicker.checklist')
    .ColorPickerStatus,
  ComboBox: require<any>('office-ui-fabric-react/lib/components/ComboBox/ComboBox.checklist').ComboBoxStatus,
  CommandBar: require<any>('office-ui-fabric-react/lib/components/CommandBar/CommandBar.checklist').CommandBarStatus,
  ContextualMenu: require<any>('office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.checklist')
    .ContextualMenuStatus,
  DatePicker: require<any>('office-ui-fabric-react/lib/components/DatePicker/DatePicker.checklist').DatePickerStatus,
  DetailsList: require<any>('office-ui-fabric-react/lib/components/DetailsList/DetailsList.checklist')
    .DetailsListStatus,
  Dialog: require<any>('office-ui-fabric-react/lib/components/Dialog/Dialog.checklist').DialogStatus,
  DocumentCard: require<any>('office-ui-fabric-react/lib/components/Calendar/Calendar.checklist').CalendarStatus,
  Dropdown: require<any>('office-ui-fabric-react/lib/components/Dropdown/Dropdown.checklist').DropdownStatus,
  Facepile: require<any>('office-ui-fabric-react/lib/components/Facepile/Facepile.checklist').FacepileStatus,
  GroupedList: require<any>('office-ui-fabric-react/lib/components/GroupedList/GroupedList.checklist')
    .GroupedListStatus,
  HoverCard: require<any>('office-ui-fabric-react/lib/components/HoverCard/HoverCard.checklist').HoverCardStatus,
  Icon: require<any>('office-ui-fabric-react/lib/components/Icon/Icon.checklist').IconStatus,
  Image: require<any>('office-ui-fabric-react/lib/components/Image/Image.checklist').ImageStatus,
  Label: require<any>('office-ui-fabric-react/lib/components/Label/Label.checklist').LabelStatus,
  Layer: require<any>('office-ui-fabric-react/lib/components/Layer/Layer.checklist').LayerStatus,
  Link: require<any>('office-ui-fabric-react/lib/components/Link/Link.checklist').LinkStatus,
  List: require<any>('office-ui-fabric-react/lib/components/List/List.checklist').ListStatus,
  MessageBar: require<any>('office-ui-fabric-react/lib/components/MessageBar/MessageBar.checklist').MessageBarStatus,
  Modal: require<any>('office-ui-fabric-react/lib/components/Modal/Modal.checklist').ModalStatus,
  Nav: require<any>('office-ui-fabric-react/lib/components/Nav/Nav.checklist').NavStatus,
  Overlay: require<any>('office-ui-fabric-react/lib/components/Overlay/Overlay.checklist').OverlayStatus,
  OverflowSet: require<any>('office-ui-fabric-react/lib/components/OverflowSet/OverflowSet.checklist')
    .OverflowSetStatus,
  Panel: require<any>('office-ui-fabric-react/lib/components/Panel/Panel.checklist').PanelStatus,
  Persona: require<any>('office-ui-fabric-react/lib/components/Persona/Persona.checklist').PersonaStatus,
  Pickers: require<any>('office-ui-fabric-react/lib/components/pickers/Pickers.checklist').PickersStatus,
  PeoplePicker: require<any>('office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePicker.checklist')
    .PeoplePickerStatus,
  Pivot: require<any>('office-ui-fabric-react/lib/components/Pivot/Pivot.checklist').PivotStatus,
  ProgressIndicator: require<any>('office-ui-fabric-react/lib/components/ProgressIndicator/ProgressIndicator.checklist')
    .ProgressIndicatorStatus,
  Rating: require<any>('office-ui-fabric-react/lib/components/Rating/Rating.checklist').RatingStatus,
  ResizeGroup: require<any>('office-ui-fabric-react/lib/components/ResizeGroup/ResizeGroup.checklist')
    .ResizeGroupStatus,
  ScrollablePane: require<any>('office-ui-fabric-react/lib/components/ScrollablePane/ScrollablePane.checklist')
    .ScrollablePaneStatus,
  SearchBox: require<any>('office-ui-fabric-react/lib/components/SearchBox/SearchBox.checklist').SearchBoxStatus,
  Shimmer: require<any>('office-ui-fabric-react/lib/components/Shimmer/Shimmer.checklist').ShimmerStatus,
  Slider: require<any>('office-ui-fabric-react/lib/components/Slider/Slider.checklist').SliderStatus,
  Spinner: require<any>('office-ui-fabric-react/lib/components/Spinner/Spinner.checklist').SpinnerStatus,
  SpinButton: require<any>('office-ui-fabric-react/lib/components/SpinButton/SpinButton.checklist').SpinButtonStatus,
  SwatchColorPicker: require<any>('office-ui-fabric-react/lib/components/SwatchColorPicker/SwatchColorPicker.checklist')
    .SwatchColorPickerStatus,
  TeachingBubble: require<any>('office-ui-fabric-react/lib/components/TeachingBubble/TeachingBubble.checklist')
    .TeachingBubbleStatus,
  TextField: require<any>('office-ui-fabric-react/lib/components/TextField/TextField.checklist').TextFieldStatus,
  Toggle: require<any>('office-ui-fabric-react/lib/components/Toggle/Toggle.checklist').ToggleStatus,
  Tooltip: require<any>('office-ui-fabric-react/lib/components/Tooltip/Tooltip.checklist').TooltipStatus
};
