import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ISelectedPersonaStyleProps {
  theme?: ITheme;
  personaContainerIsSelected: boolean;
  isValid: boolean;
}

export interface ISelectedPersonaStyles {
  personaContainer: IStyle;
  expandButton: IStyle;
  personaWrapper: IStyle;
  removeButton: IStyle;
}
