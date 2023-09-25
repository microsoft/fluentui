import * as React from 'react';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IFabricProps extends React.HTMLAttributes<HTMLDivElement>, React.RefAttributes<HTMLDivElement> {
  componentRef?: IRefObject<{}>;

  /**
   * Overrides the root element type, defaults to `div`.
   */
  as?: React.ElementType;

  /**
   * Injected by the `styled` HOC wrapper.
   */
  theme?: ITheme;

  /**
   * Overrides the styles for the component.
   */
  styles?: IStyleFunctionOrObject<IFabricStyleProps, IFabricStyles>;

  /**
   * Applies the current body background specified in the theme to the root element.
   */
  applyTheme?: boolean;

  /**
   * Applies the current body background specified in the theme to the body element.
   */
  applyThemeToBody?: boolean;

  /**
   * Specifies the direction of the content. Will inject a `dir` attribute, and also ensure that the `rtl` flag of the
   * contextual theme object is set correctly so that css registered with merge-styles can be auto flipped correctly.
   */
  dir?: 'rtl' | 'ltr' | 'auto';

  /**
   * By default, the Fabric component has children selectors for button, input and textarea elements that apply the
   * style `fontFamily: 'inherit'`. This is done so the font family is consistent across all of these elements under a
   * Fabric component. However, this is expensive in style recalculation scenarios and it is not the responsibility of
   * the Fabric component to ensure that non-Fluent elements within it have these styles.
   * Setting this prop to true prevents the Fabric component from applying these children selectors. As long as only
   * v8 Fluent components are being used within it, no changes should be apparent since all Fluent components already
   * set the font family in their styles.
   * @defaultvalue false
   */
  preventBlanketFontInheritance?: boolean;
}

export interface IFabricStyleProps extends IFabricProps {
  theme: ITheme;
}

export interface IFabricStyles {
  root: IStyle;
  bodyThemed: IStyle;
}
