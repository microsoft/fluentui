import type { ISettings } from '@fluentui/react';

import { getBasePickerStyles } from './componentStyles/BasePicker.styles';
import { getBreadcrumbStyles } from './componentStyles/Breadcrumb.styles';
import { getDefaultButtonStyles, getIconButtonStyles } from './componentStyles/Button.styles';
import { getCalloutContentStyles } from './componentStyles/Callout.styles';
import { getCheckboxStyles } from './componentStyles/Checkbox.styles';
import { getChoiceGroupStyles } from './componentStyles/ChoiceGroup.styles';
import { getChoiceGroupOptionStyles } from './componentStyles/ChoiceGroupOption.styles';
import { getColorPickerGridCellStyles } from './componentStyles/ColorPickerGridStyles.styles';
import { getCommandBarStyles } from './componentStyles/CommandBar.styles';
import { getCommandBarButtonStyles } from './componentStyles/CommandBarButton.styles';
import { getContextualMenuStyles } from './componentStyles/ContextualMenu.styles';
import { getDialogContentStyles, getDialogStyles } from './componentStyles/Dialog.styles';
import { getDropdownStyles } from './componentStyles/Dropdown.styles';
import { getMessageBarStyles } from './componentStyles/MessageBar.styles';
import { getModalStyles } from './componentStyles/Modal.styles';
import { getPivotStyles } from './componentStyles/Pivot.styles';
import { getSearchBoxStyles } from './componentStyles/SearchBox.styles';
import { getSliderStyles } from './componentStyles/Slider.styles';
import { getSpinButtonStyles } from './componentStyles/SpinButton.styles';
import { getSpinnerStyles } from './componentStyles/Spinner.styles';
import { getTagItemStyles } from './componentStyles/TagItem.styles';
import { getTextFieldStyles } from './componentStyles/TextField.styles';
import { getToggleStyles } from './componentStyles/Toggle.styles';
import { getDetailsRowCheckStyles } from './componentStyles/DetailsRowCheck.styles';
import { getCheckStyles } from './componentStyles/Check.styles';
export const fluent2ComponentStyles: { [key: string]: ISettings } = {
  Breadcrumb: {
    styles: getBreadcrumbStyles,
  },
  CalloutContent: {
    styles: getCalloutContentStyles,
  },
  Check: {
    styles: getCheckStyles,
  },
  Checkbox: {
    styles: getCheckboxStyles,
  },
  ChoiceGroup: {
    styles: getChoiceGroupStyles,
  },
  ChoiceGroupOption: {
    styles: getChoiceGroupOptionStyles,
  },
  ColorPickerGridCell: {
    styles: getColorPickerGridCellStyles,
  },
  CommandBar: {
    styles: getCommandBarStyles,
  },
  CommandBarButton: {
    styles: getCommandBarButtonStyles,
  },
  CompoundButton: {
    styles: getDefaultButtonStyles,
  },
  ContextualMenu: {
    styles: getContextualMenuStyles,
  },
  DefaultButton: {
    styles: getDefaultButtonStyles,
  },
  DetailRowCheck: {
    styles: getDetailsRowCheckStyles,
  },
  Dialog: {
    styles: getDialogStyles,
  },
  DialogContent: {
    styles: getDialogContentStyles,
  },
  Dropdown: {
    styles: getDropdownStyles,
  },
  IconButton: {
    styles: getIconButtonStyles,
  },
  MessageBar: {
    styles: getMessageBarStyles,
  },
  Modal: {
    styles: getModalStyles,
  },
  Pivot: {
    styles: getPivotStyles,
  },
  // People Pickers
  NormalPeoplePicker: {
    styles: getBasePickerStyles,
  },
  CompactPeoplePicker: {
    styles: getBasePickerStyles,
  },
  ListPeoplePickerBase: {
    styles: getBasePickerStyles,
  },
  SearchBox: {
    styles: getSearchBoxStyles,
  },
  Slider: {
    styles: getSliderStyles,
  },
  SpinButton: {
    styles: getSpinButtonStyles,
  },
  Spinner: {
    styles: getSpinnerStyles,
  },
  TagItem: {
    styles: getTagItemStyles,
  },
  TagPicker: {
    styles: getBasePickerStyles,
  },
  Tag: {
    styles: getTagItemStyles,
  },
  TextField: {
    styles: getTextFieldStyles,
  },
  Toggle: {
    styles: getToggleStyles,
  },
};
