import * as React from 'react';
import { IStyle, ITheme, IFontStyles, IPalette } from '../../Styling';
import { TViewProps, createComponent } from '../../utilities/createComponent';
import { IFontTypes, IFontFamilies, IFontSizes, IFontWeights } from './theming/ITypography';

export type IStyleProps<TProps, TStyles> = TProps & {
  theme: ITheme;
};

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
  size?: keyof IFontSizes | keyof IFontStyles;
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
  const { block, theme, wrap, grow, shrink, /* type, */ family, weight, size, color } = props;

  const { palette, fonts, /* semanticColors, isInverted, */ typography } = theme;

  const themeType = {
    fontFamily: typography
      ? family && typography.families[family]
        ? typography.families[family]
        : typography.families.default
      : size && fonts[size]
        ? fonts[size].fontFamily
        : fonts.medium.fontFamily,
    fontWeight: typography
      ? weight && typography.weights[weight]
        ? typography.weights[weight]
        : typography.weights.default
      : size && fonts[size]
        ? fonts[size].fontWeight
        : fonts.medium.fontWeight,
    fontSize: typography
      ? size && typography.sizes[size]
        ? typography.sizes[size]
        : typography.sizes.medium
      : size && fonts[size]
        ? fonts[size].fontSize
        : fonts.medium.fontSize,
    mozOsxFontSmoothing: size && fonts[size] ? fonts[size].MozOsxFontSmoothing : fonts.medium.MozOsxFontSmoothing,
    webkitFontSmoothing: size && fonts[size] ? fonts[size].WebkitFontSmoothing : fonts.medium.WebkitFontSmoothing,
    color: color && palette[color] ? palette[color] : palette.neutralPrimaryAlt
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
