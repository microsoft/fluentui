import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardStylesProps } from '../../../../components/Card/Card';
import { pxToRem } from '../../../../utils';
import getBorderFocusStyles from '../../getBorderFocusStyles';

const cardStyles: ComponentSlotStylesPrepared<CardStylesProps, CardVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;

    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderPadding: v.borderWidth,
    });

    return {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      padding: v.padding,
      ...(p.horizontal && { flexDirection: 'row' }),
      ...(p.compact && { padding: v.compactPadding }),
      ...(p.centered && { alignItems: 'center' }),

      // TODO: update with latest design spec
      width: pxToRem(300),
      borderWidth: v.borderWidth,
      borderStyle: v.borderStyle,
      borderColor: v.borderColor,
      ...borderFocusStyles,
    };
  },
};

export default cardStyles;
