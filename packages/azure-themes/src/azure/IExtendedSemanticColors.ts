import { ISemanticColors } from 'office-ui-fabric-react';

export interface IExtendedSemanticColors extends ISemanticColors {
  labelText: string;
  controlOutline: string;
  controlOutlineDisabled: string;
  controlOutlineHovered: string;
  controlAccent: string;
}
