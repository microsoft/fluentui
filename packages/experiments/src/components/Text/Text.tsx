import * as React from 'react';
import { IStyle } from '../../Styling';
import { createComponent, IStyleProps, IViewProps } from './createComponent';
import { IFontTypes, IFontFamilies, IFontSizes, IFontWeights, IFontColors } from './theming/ITypography';

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
  weight?: keyof IFontWeights;
  color?: keyof IFontColors;

  paletteSet?: string;

  block?: boolean;
  wrap?: boolean;

  grow?: boolean;
  shrink?: boolean;
}

const view = (props: IViewProps<ITextProps, ITextStyles>) => {
  const {
    block,
    classNames,
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

  return <RootType {...rest} className={classNames.root} />;
};

const styles = (props: IStyleProps<ITextProps, ITextStyles>): ITextStyles => {
  const { block, theme, wrap, grow, shrink, type, family, weight, size } = props;
  const { typography } = theme;
  const themeType = typography.types[type!] || {
    fontFamily: typography.families[family!] || typography.families.default,
    fontWeight: typography.weights[weight!] || typography.weights.default,
    fontSize: typography.sizes[size!] || typography.sizes.medium
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
  displayName: 'Text',
  styles,
  view
});

export default Text;
