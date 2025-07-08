import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { HeatMapChartProps, HeatMapChartStyles } from './HeatMapChart.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const heatmapChartClassNames: SlotClassNames<HeatMapChartStyles> = {
  root: 'fui-hmc__root',
  text: 'fui-hmc__text',
  calloutStyles: 'fui-hmc__calloutStyles',
  xAxis: '',
  yAxis: '',
  legendContainer: '',
  hover: '',
  descriptionMessage: '',
  tooltip: '',
  axisTitle: '',
  chartTitle: '',
  opacityChangeOnHover: '',
  shapeStyles: '',
  chartWrapper: '',
  svgTooltip: '',
  chart: '',
};
const useStyles = makeStyles({
  root: {},
  text: {
    ...typographyStyles.body1Strong,
    pointerEvents: 'none',
  },
  calloutStyles: {
    display: 'grid',
    overflow: 'hidden',
    ...shorthands.padding('11px 16px 10px 16px'),
    backgroundColor: tokens.colorNeutralBackground1,
    backgroundBlendMode: 'normal, luminosity',
    maxWidth: '238px',
  },
});

export const useHeatMapChartStyles = (props: HeatMapChartProps): HeatMapChartStyles => {
  const baseStyles = useStyles();

  return {
    root: mergeClasses(heatmapChartClassNames.root, baseStyles.root /*, props.styles?.root*/),
    text: mergeClasses(heatmapChartClassNames.text, baseStyles.text /*, props.styles?.text*/),
    calloutStyles: mergeClasses(
      heatmapChartClassNames.calloutStyles,
      baseStyles.calloutStyles /*, props.styles?.calloutStyles*/,
    ),
  };
};
