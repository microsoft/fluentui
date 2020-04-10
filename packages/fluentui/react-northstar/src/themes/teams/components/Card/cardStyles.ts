import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardStylesProps } from '../../../../components/Card/Card';
import getBorderFocusStyles from '../../getBorderFocusStyles';

const cardStyles: ComponentSlotStylesPrepared<CardStylesProps, CardVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;

    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderWidth: v.borderWidth,
      borderRadius: v.borderRadius,
    });

    return {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      padding: v.padding,
      width: v.width,
      height: v.height,
      ...(p.size === 'small' && { width: v.sizeSmallWidth, height: v.sizeSmallHeight, padding: v.sizeSmallPadding }),
      ...(p.size === 'large' && { width: v.sizeLargeWidth, height: v.sizeLargeHeight, padding: v.sizeLargePadding }),
      ...(p.fluid && { width: v.fluidWidth, height: v.fluidHeight }),
      ...(p.horizontal && { flexDirection: 'row' }),
      ...(p.compact && { padding: v.compactPadding }),
      ...(p.centered && { alignItems: 'center' }),

      borderWidth: v.borderWidth,
      borderStyle: v.borderStyle,
      borderColor: v.borderColor,
      borderRadius: v.borderRadius,
      ...borderFocusStyles,
    };
  },
};

export default cardStyles;
