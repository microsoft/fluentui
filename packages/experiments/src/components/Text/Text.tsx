import * as React from 'react';
import { IStyle, IFontStyles, IPalette, ISemanticColors } from '../../Styling';
import { IStyleableComponent, IThemedProps, IViewComponentProps, createComponent } from '../../Foundation';
import { IFontTypes, IFontFamilies, IFontSizes, IFontWeights } from './theming/ITypography';

// Styles for the component
export interface ITextStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
}

// Inputs to the component
export interface ITextProps extends IStyleableComponent<ITextProps, ITextStyles> {
  renderAs?: string | React.ReactType<ITextProps>;
  /**
   * Optional class name for Text.
   */
  className?: string;

  /**
   * Optional font style for Text.
   */
  fontStyle?: keyof IFontStyles;

  /**
   * Optional font type for Text.
   */
  type?: keyof IFontTypes;

  /**
   * Optional font family for Text.
   */
  family?: keyof IFontFamilies;

  /**
   * Optional font size for Text.
   */
  size?: keyof IFontSizes;

  /**
   * Optional font weight for Text.
   */
  weight?: keyof IFontWeights;

  /**
   * Optional font color for Text.
   */
  color?: keyof IPalette | keyof ISemanticColors;

  /**
   * Whether the text is displayed as an inline element.
   * Note that inline does not support ellipsis truncation by default.
   */
  inline?: boolean;

  /**
   * Whether the text is wrapped.
   */
  wrap?: boolean;
}

const TextView = (props: IViewComponentProps<ITextProps, ITextStyles>) => {
  const {
    inline,
    className,
    color,
    family,
    renderAs: RootType = 'span',
    size,
    type,
    weight,
    wrap,
    fontStyle,
    classNames,
    ...rest
  } = props;

  return <RootType {...rest} className={classNames.root} />;
};

const styles = (props: IThemedProps<ITextProps>): ITextStyles => {
  const { inline, theme, wrap, type, family, weight, size, fontStyle, color } = props;

  const { palette, fonts, semanticColors, typography } = theme;

  let themeType;

  const paletteColor = color as keyof IPalette;
  const semanticColor = color as keyof ISemanticColors;

  if (fontStyle && fonts[fontStyle]) {
    // if a general style is specified, use that for the theme
    themeType = fonts[fontStyle];
  } else {
    if (type && typography.types[type]) {
      // if a general type is specified, use it to initialize the theme
      themeType = typography.types[type];
    }

    // next, look for individual properties and use them if they are present
    const fontFamily =
      family && typography.families[family] // if family prop is passed in and exists in typography.families, we'll use it
        ? typography.families[family]
        : typography.families.default; // otherwise use default

    const fontWeight = weight && typography.weights[weight] ? typography.weights[weight] : typography.weights.default;

    const fontSize = size && typography.sizes[size] ? typography.sizes[size] : typography.sizes.medium;

    if (themeType) {
      // if a type was specified and individual properties were also specified, use individual properties
      if (family && typography.families[family]) {
        themeType.fontFamily = fontFamily;
      }
      if (weight && typography.weights[weight]) {
        themeType.fontWeight = fontWeight;
      }
      if (size && typography.sizes[size]) {
        themeType.fontSize = fontSize;
      }
    } else {
      themeType = {
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        fontSize: fontSize
      };
    }
  }

  // use fonts to set these properties
  const mozOsxFontSmoothing =
    fontStyle && fonts[fontStyle] ? fonts[fontStyle].MozOsxFontSmoothing : fonts.medium.MozOsxFontSmoothing;

  const webkitFontSmoothing =
    fontStyle && fonts[fontStyle] ? fonts[fontStyle].WebkitFontSmoothing : fonts.medium.WebkitFontSmoothing;

  const themeProperties = {
    mozOsxFontSmoothing: mozOsxFontSmoothing,
    webkitFontSmoothing: webkitFontSmoothing,
    color:
      semanticColor && semanticColors[semanticColor] // use semanticColors to set color if it exists
        ? semanticColors[semanticColor]
        : paletteColor && palette[paletteColor]
          ? palette[paletteColor]
          : palette.neutralPrimary // otherwise, use palette
  };

  return {
    root: [
      themeType,
      themeProperties,
      {
        display: inline ? 'inline' : 'block'
      },
      !wrap && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      props.className
    ]
  } as ITextStyles;
};

export const Text: React.StatelessComponent<ITextProps> = createComponent<ITextProps, ITextStyles>({
  displayName: 'Text',
  styles: styles,
  view: TextView
});

export default Text;
