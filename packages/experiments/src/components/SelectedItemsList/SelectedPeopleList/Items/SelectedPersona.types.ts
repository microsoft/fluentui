import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ISelectedPersonaStyleProps {
  theme: ITheme;
  isValid: boolean;
  isSelected: boolean;
}

export interface ISelectedPersonaStyles {
  personaContainer: IStyle;
  expandButton: IStyle;
  personaWrapper: IStyle;
  removeButton: IStyle;
  actionButton: IStyle;
  itemContentWrapper: IStyle;
}
