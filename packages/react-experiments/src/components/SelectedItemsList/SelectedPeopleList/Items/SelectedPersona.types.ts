import type { ITheme, IStyle } from '@fluentui/react/lib/Styling';
import type { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import type { IPersonaStyleProps, IPersonaCoinStyleProps } from '@fluentui/react/lib/Persona';
import type { IButtonStyles } from '@fluentui/react/lib/Button';

export interface ISelectedPersonaStyleProps {
  theme: ITheme;
  isValid: boolean;
  isSelected: boolean;
  droppingClassName: string;
  buttonSize: number;
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
