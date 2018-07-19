import * as React from 'react';
import { IStyle, IFontStyles, IPalette, ISemanticColors } from '../../Styling';
import { IViewProps, createComponent, IStyledProps } from '../../Foundation';
import { IFontTypes, IFontFamilies, IFontSizes, IFontWeights } from './theming/ITypography';

// Styles for the component
export interface ITextStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
}

// Inputs to the component
export interface ITextProps {
  renderAs?: string | React.ReactType<ITextProps>;
  children?: React.ReactNode;
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

  paletteSet?: string;

  /**
   * Whether the text is displayed as a block element or an inline element.
   */
  block?: boolean;

  /**
   * Whether the text is wrapped.
   */
  wrap?: boolean;

  grow?: boolean;
  shrink?: boolean;
}

export type ITextViewProps = IViewProps<ITextProps, ITextStyles>;

const TextView = (props: ITextViewProps) => {
  const {
    block,
    className,
    color,
    family,
    grow,
    renderAs: RootType = 'span',
    shrink,
    size,
    type,
    weight,
    wrap,
    fontStyle,
    ...rest
  } = props;

  return <RootType {...rest} className={props.styles.root} />;
};

const styles = (props: IStyledProps<ITextProps>): ITextStyles => {
  const { block, theme, wrap, grow, shrink, type, family, weight, size, fontStyle, color } = props;

  const { palette, fonts, semanticColors, typography } = theme;

  let themeType;

  const paletteColor = color as keyof IPalette;
  const semanticColor = color as keyof ISemanticColors;

  if (fontStyle && fonts[fontStyle]) {
    // if a general style is specified, use that for the theme
    themeType = fonts[fontStyle];
  } else if (type && typography.types[type]) {
    // if a general type is specified, use that for the theme
    themeType = typography.types[type];
  } else {
    // otherwise look for individual properties
    const fontFamily =
      family && typography.families[family] // if family prop is passed in and exists in typography.families, we'll use it
        ? typography.families[family]
        : typography.families.default; // otherwise use default

    const fontWeight = weight && typography.weights[weight] ? typography.weights[weight] : typography.weights.default;

    const fontSize = size && typography.sizes[size] ? typography.sizes[size] : typography.sizes.medium;

    themeType = {
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      fontSize: fontSize
    };
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
        display: block ? 'block' : 'inline'
      },
      !wrap && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block' // when wrap is false, set display to block so that overflow shows ellipsis
      },
      grow && {
        flexGrow: 1
      },
      shrink && {
        flexShrink: 0
      },
      props.className
    ]
  } as ITextStyles;
};

export const Text: React.StatelessComponent<ITextProps> = createComponent<ITextProps, ITextStyles>({
  scope: 'Text',
  styles: styles,
  view: TextView
});

export default Text;
