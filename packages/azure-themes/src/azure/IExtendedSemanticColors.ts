import { ISemanticColors } from 'office-ui-fabric-react';

export interface IExtendedSemanticColors extends ISemanticColors {
  inputBorderPressed: string;
  labelText: string;
  controlOutline: string;
  controlOutlineDisabled: string;
  controlOutlineHovered: string;
  controlAccent: string;
  statusErrorBackground: string;
  statusErrorText: string;
  statusErrorIcon: string;
  statusInformationBackground: string;
  statusInformationText: string;
  statusInformationIcon: string;
  statusSuccessBackground: string;
  statusSuccessText: string;
  statusSuccessIcon: string;
  statusWarningBackground: string;
  statusWarningText: string;
  statusWarningIcon: string;
  toggleDisabledBackground: string;

  checkBoxBorder: string;
  checkBoxBorderChecked: string;
  checkBoxDisabled: string;
  checkBoxCheckedFocus: string;
  checkBoxIndeterminateDefaultChecked: string;
  checkBoxIndeterminateBackground: string;
  checkBoxCheckHover: string;
  bodyTextHovered: string;
  listItemBackgroundCheckedHovered: string;
  listItemBackgroundSelectedHovered: string;
}
