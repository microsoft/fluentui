import { ITheme, IStyle } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IPersonaStyleProps, IPersonaCoinStyleProps } from '@fluentui/react/lib/Persona';
import { IButtonStyles } from '@fluentui/react/lib/Button';

export interface ISelectedPersonaStyleProps {
  theme: ITheme;
  isValid: boolean;
  isSelected: boolean;
  droppingClassName: string;
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
