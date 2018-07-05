import * as React from 'react';
import { IStyle, IFontStyles, IPalette } from '../../Styling';
import { TViewProps, createComponent, IStyleProps } from '../../utilities/createComponent';
import { IFontTypes, IFontFamilies, IFontSizes, IFontWeights } from './theming/ITypography';

// Styles for the component
export interface ITextStyles {
  root: IStyle;
}

// Inputs to the component
export interface ITextProps {
  renderAs?: string | React.ReactType<ITextProps>;
  children?: React.ReactNode;
  className?: string;

  type?: keyof IFontTypes;
  family?: keyof IFontFamilies;
  size?: keyof IFontSizes;
  style?: keyof IFontStyles;
  weight?: keyof IFontWeights;
  color?: keyof IPalette;

  paletteSet?: string;

  block?: boolean;
  wrap?: boolean;

  grow?: boolean;
  shrink?: boolean;
}

export type ITextViewProps = TViewProps<ITextProps, ITextStyles>;

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
    ...rest
  } = props;
  return <RootType {...rest} className={props.styles.root} />;
};

const styles = (props: IStyleProps<ITextProps, ITextStyles>): ITextStyles => {
  const { block, theme, wrap, grow, shrink, /* type, */ family, weight, size, style, color } = props;

  const { palette, fonts, /* semanticColors, isInverted, */ typography } = theme;

  const fontFamily = typography // if typography is defined, we'll use it to set the property
    ? family && typography.families[family] // if family prop is passed in and exists in typography.families, we'll use it
      ? typography.families[family]
      : typography.families.default // otherwise use default
    : style && fonts[style] // if style prop is passed in and exists in fonts, we'll use that for fontFamily
      ? fonts[style].fontFamily
      : fonts.medium.fontFamily;

  const fontWeight = typography
    ? weight && typography.weights[weight]
      ? typography.weights[weight]
      : typography.weights.default
    : style && fonts[style]
      ? fonts[style].fontWeight
      : fonts.medium.fontWeight;

  const fontSize = typography
    ? size && typography.sizes[size]
      ? typography.sizes[size]
      : typography.sizes.medium
    : style && fonts[style]
      ? fonts[style].fontSize
      : fonts.medium.fontSize;

  // just use fonts to set these properties
  const mozOsxFontSmoothing =
    style && fonts[style] ? fonts[style].MozOsxFontSmoothing : fonts.medium.MozOsxFontSmoothing;

  const webkitFontSmoothing =
    style && fonts[style] ? fonts[style].WebkitFontSmoothing : fonts.medium.WebkitFontSmoothing;

  const themeType = {
    fontFamily: fontFamily,
    fontWeight: fontWeight,
    fontSize: fontSize,
    mozOsxFontSmoothing: mozOsxFontSmoothing,
    webkitFontSmoothing: webkitFontSmoothing,
    color:
      color && palette[color] // use palette to set the color
        ? palette[color]
        : palette.neutralPrimary
  };

  return {
    root: [
      themeType,
      {
        display: block ? 'block' : 'inline'
      },
      !wrap && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
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
