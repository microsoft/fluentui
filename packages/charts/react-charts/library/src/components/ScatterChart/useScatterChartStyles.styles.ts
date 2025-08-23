import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { ScatterChartProps, ScatterChartStyles } from './ScatterChart.types';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { HighContrastSelector } from '../../utilities/index';

/**
 * @internal
 */
export const scatterChartClassNames: SlotClassNames<ScatterChartStyles> = {
  tooltip: 'fui-line__tooltip',
  markerLabel: 'fui-line__markerLabel',
  root: 'fui-line__root',
  xAxis: 'fui-line__xAxis',
  yAxis: 'fui-line__yAxis',
  legendContainer: 'fui-line__legendContainer',
  hover: 'fui-line__hover',
  descriptionMessage: 'fui-line__descriptionMessage',
  axisTitle: 'fui-line__axisTitle',
  chartTitle: 'fui-line__chartTitle',
  opacityChangeOnHover: 'fui-line__opacityChangeOnHover',
  shapeStyles: 'fui-line__shapeStyles',
  chartWrapper: 'fui-line__chartWrapper',
  svgTooltip: '',
  chart: '',
  axisAnnotation: '',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  tooltip: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingHorizontalS),
    position: 'absolute',
    textAlign: 'center',
    top: tokens.spacingVerticalNone,
    fill: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusSmall,
    pointerEvents: 'none',
  },
  markerLabel: {
    ...typographyStyles.body1,
    fill: tokens.colorNeutralForeground1,
    textAnchor: 'middle',
    [HighContrastSelector]: {
      fill: 'CanvasText',
    },
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useScatterChartStyles = (props: ScatterChartProps): ScatterChartStyles => {
  const baseStyles = useStyles();
  return {
    tooltip: mergeClasses(scatterChartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
    markerLabel: mergeClasses(scatterChartClassNames.markerLabel, baseStyles.markerLabel, props.styles?.markerLabel),
  };
};
