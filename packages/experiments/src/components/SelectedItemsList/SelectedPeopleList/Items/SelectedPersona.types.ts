import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IPersonaStyleProps, IPersonaCoinStyleProps } from 'office-ui-fabric-react/lib/Persona';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

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
  itemContentWrapper: IStyle;
  subComponentStyles: ISelectedPersonaSubcomponentStyles;
}

export interface ISelectedPersonaSubcomponentStyles {
  personaStyles: IStyleFunctionOrObject<IPersonaStyleProps, any>; // IPersonaProps['styles'];
  personaCoinStyles: IStyleFunctionOrObject<IPersonaCoinStyleProps, any>; // IPersonaCoinProps['styles'];
  actionButtonStyles: Partial<IButtonStyles>; // IButtonProps['styles'];
}
