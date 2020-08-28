import { SegmentStylesProps } from '../../../../components/Segment/Segment';
import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SegmentVariables } from './segmentVariables';
import { getColorScheme } from '../../colors';

export const segmentStyles: ComponentSlotStylesPrepared<SegmentStylesProps, SegmentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme, p.color);

    return {
      borderColor: 'transparent',
      borderRadius: v.borderRadius,
      borderStyle: v.borderStyle,
      borderWidth: v.borderWidth,
      boxShadow: v.boxShadow,
      padding: v.padding,
      color: v.color,
      backgroundColor: v.backgroundColor,
      ...(p.color && { borderColor: colors.foreground }),
      ...(p.inverted && {
        color: v.backgroundColor,
        backgroundColor: p.color ? colors.foreground : v.color,
      }),
      ...(p.disabled && {
        boxShadow: 'none',
        borderColor: v.disabledBorderColor,
        color: v.disabledColor,
        backgroundColor: v.disabledBackgroundColor,
        ...(p.inverted && {
          color: v.disabledBackgroundColor,
          backgroundColor: v.disabledColor,
        }),
      }),
    };
  },
};
