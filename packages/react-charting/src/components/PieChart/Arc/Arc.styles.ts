import { IArcProps, IArcStyles } from './Arc.types';
import { DefaultPalette, ITheme } from '@fluentui/react/lib/Styling';
export const getStyles = (props: IArcProps, theme: ITheme | undefined): IArcStyles => {
  const { color } = props;
  return {
    pieRoot: { fill: color, stroke: theme?.palette.white || DefaultPalette.white, strokeWidth: 2 },
    pieRootFocussed: { fill: color, stroke: theme?.palette.black || DefaultPalette.black, strokeWidth: 3 },
    pie: { outline: 'none' },
    pieText: { fill: theme?.palette.black || DefaultPalette.black },
  };
};
