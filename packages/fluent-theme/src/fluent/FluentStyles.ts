import { BreadcrumbStyles } from './styles/Breadcrumb.styles';
import { CheckboxStyles } from './styles/Checkbox.styles';
import { ChoiceGroupOptionStyles } from './styles/ChoiceGroupOption.styles';
import { ComboBoxStyles } from './styles/ComboBox.styles';
import { CompoundButtonStyles } from './styles/CompoundButton.styles';
import { DefaultButtonStyles } from './styles/DefaultButton.styles';
import { DialogStyles, DialogContentStyles, DialogFooterStyles } from './styles/Dialog.styles';
import { DropdownStyles } from './styles/Dropdown.styles';
import { LabelStyles } from './styles/Label.styles';
import { LinkStyles } from './styles/Link.styles';
import { PrimaryButtonStyles } from './styles/PrimaryButton.styles';
import { RatingStyles } from './styles/Rating.styles';
import { SliderStyles } from './styles/Slider.styles';
import { TextFieldStyles } from './styles/TextField.styles';
import { ToggleStyles } from './styles/Toggle.styles';

// Roll up all style overrides in a single "Fluent theme" object

// TODO: "any" is used here to get around "is using xxx but cannot be named" TS error. Should be able to remove
//        this 'any' once we upgrade to TS3.1+
// tslint:disable-next-line:no-any
export const FluentStyles: any = {
  Breadcrumb: {
    styles: BreadcrumbStyles
  },
  CompoundButton: {
    styles: CompoundButtonStyles
  },
  Checkbox: {
    styles: CheckboxStyles
  },
  ChoiceGroupOption: {
    styles: ChoiceGroupOptionStyles
  },
  ComboBox: {
    styles: ComboBoxStyles
  },
  DefaultButton: {
    styles: DefaultButtonStyles
  },
  Dialog: {
    styles: DialogStyles
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
  Label: {
    styles: LabelStyles
  },
  Link: {
    styles: LinkStyles
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
  TextField: {
    styles: TextFieldStyles
  },
  Toggle: {
    styles: ToggleStyles
  }
};
