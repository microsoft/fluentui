import { IArcProps, IArcStyles } from './Arc.types';
import { DefaultPalette, ITheme } from '@fluentui/react/lib/Styling';
export const getStyles = (props: IArcProps, theme: ITheme | undefined): IArcStyles => {
  const { color } = props;
  return {
    pieRoot: { fill: color },
    pieRootFocused: { fill: color, stroke: theme?.palette.black || DefaultPalette.black, strokeWidth: 2 },
    pie: { outline: 'none' },
    pieText: { fill: theme?.palette.black || DefaultPalette.black, outline: 'none' },
  };
};
