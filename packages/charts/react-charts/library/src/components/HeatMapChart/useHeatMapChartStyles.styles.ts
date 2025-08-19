import { makeStyles, mergeClasses } from '@griffel/react';
import type { HeatMapChartProps, HeatMapChartStyles } from './HeatMapChart.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { typographyStyles } from '@fluentui/react-theme';

export const heatmapChartClassNames: SlotClassNames<HeatMapChartStyles> = {
  root: 'fui-hmc__root',
  text: 'fui-hmc__text',
  calloutContentRoot: 'fui-hmc__calloutContentRoot',
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
  axisAnnotation: '',
};
const useStyles = makeStyles({
  root: {},
  text: {
    ...typographyStyles.body1Strong,
    pointerEvents: 'none',
  },
  calloutContentRoot: {
    maxWidth: '238px',
  },
});

export const useHeatMapChartStyles = (props: HeatMapChartProps): HeatMapChartStyles => {
  const baseStyles = useStyles();

  return {
    root: mergeClasses(heatmapChartClassNames.root, baseStyles.root /*, props.styles?.root*/),
    text: mergeClasses(heatmapChartClassNames.text, baseStyles.text /*, props.styles?.text*/),
    calloutContentRoot: mergeClasses(
      heatmapChartClassNames.calloutContentRoot,
      baseStyles.calloutContentRoot /*, props.styles?.calloutContentRoot*/,
    ),
  };
};
