import type { ISettings } from '@fluentui/react';

import { getBasePickerStyles } from './fluent2ComponentStylesForV8/BasePicker.styles';
import { getBreadcrumbStyles } from './fluent2ComponentStylesForV8/Breadcrumb.styles';
import { getDefaultButtonStyles, getIconButtonStyles } from './fluent2ComponentStylesForV8/Button.styles';
import { getCalloutContentStyles } from './fluent2ComponentStylesForV8/Callout.styles';
import { getCheckboxStyles } from './fluent2ComponentStylesForV8/Checkbox.styles';
import { getChoiceGroupStyles } from './fluent2ComponentStylesForV8/ChoiceGroup.styles';
import { getChoiceGroupOptionStyles } from './fluent2ComponentStylesForV8/ChoiceGroupOption.styles';
import { getColorPickerGridCellStyles } from './fluent2ComponentStylesForV8/ColorPickerGridStyles.styles';
import { getCommandBarStyles } from './fluent2ComponentStylesForV8/CommandBar.styles';
import { getCommandBarButtonStyles } from './fluent2ComponentStylesForV8/CommandBarButton.styles';
import { getContextualMenuStyles } from './fluent2ComponentStylesForV8/ContextualMenu.styles';
import { getDialogContentStyles, getDialogStyles } from './fluent2ComponentStylesForV8/Dialog.styles';
import { getDropdownStyles } from './fluent2ComponentStylesForV8/Dropdown.styles';
import { getMessageBarStyles } from './fluent2ComponentStylesForV8/MessageBar.styles';
import { getModalStyles } from './fluent2ComponentStylesForV8/Modal.styles';
import { getPivotStyles } from './fluent2ComponentStylesForV8/Pivot.styles';
import { getSearchBoxStyles } from './fluent2ComponentStylesForV8/SearchBox.styles';
import { getSliderStyles } from './fluent2ComponentStylesForV8/Slider.styles';
import { getSpinButtonStyles } from './fluent2ComponentStylesForV8/SpinButton.styles';
import { getSpinnerStyles } from './fluent2ComponentStylesForV8/Spinner.styles';
import { getTagItemStyles } from './fluent2ComponentStylesForV8/TagItem.styles';
import { getTextFieldStyles } from './fluent2ComponentStylesForV8/TextField.styles';
import { getToggleStyles } from './fluent2ComponentStylesForV8/Toggle.styles';

export const getFluent2ForV8ComponentStyles: { [key: string]: ISettings } = {
  Breadcrumb: {
    styles: getBreadcrumbStyles,
  },
  CalloutContent: {
    styles: getCalloutContentStyles,
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
