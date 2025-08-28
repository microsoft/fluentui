import { GriffelStyle, makeStyles, mergeClasses } from '@griffel/react';
import type { SankeyChartProps, SankeyChartStyles } from './SankeyChart.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { HighContrastSelector } from '../../utilities/index';
import { getTooltipStyle } from '../../utilities/index';

export const sankeyChartClassNames: SlotClassNames<SankeyChartStyles> = {
  root: 'fui-sc__root',
  nodes: 'fui-sc__nodes',
  links: 'fui-sc__links',
  nodeTextContainer: 'fui-sc__nodeTextContainer',
  toolTip: 'fui-sc__toolTip',
  chartWrapper: 'fui-sc__chartWrapper',
  chart: 'fui-sc__chart',
};
const useStyles = makeStyles({
  root: {
    ...typographyStyles.body1,
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  links: {
    fill: tokens.colorNeutralBackground1,
    strokeWidth: '3px',
    [HighContrastSelector]: {
      fill: 'Canvas',
    },
  },
  nodes: {
    fill: '#F5F5F5',
    [HighContrastSelector]: {
      fill: 'Canvas',
    },
  },
  toolTip: getTooltipStyle() as GriffelStyle,
  nodeTextContainer: {
    '& text': {
      [HighContrastSelector]: {
        fill: 'CanvasText',
      },
    },

    marginTop: '4px',
    marginLeft: '8px',
    marginBottom: '4px',
    marginRight: '8px',
  },
  chartWrapper: {
    overflow: 'auto',
  },
  chart: {
    display: 'block',
  },
});

export const useSankeyChartStyles = (props: SankeyChartProps): SankeyChartStyles => {
  const baseStyles = useStyles();

  return {
    root: mergeClasses(sankeyChartClassNames.root, baseStyles.root, props.styles?.root),
    nodes: mergeClasses(sankeyChartClassNames.nodes, baseStyles.nodes /*, props.styles?.nodes*/),
    links: mergeClasses(sankeyChartClassNames.links, baseStyles.links /*, props.styles?.links*/),
    nodeTextContainer: mergeClasses(
      sankeyChartClassNames.nodeTextContainer,
      baseStyles.nodeTextContainer /*, props.styles?.nodeTextContainer*/,
    ),
    toolTip: mergeClasses(sankeyChartClassNames.toolTip, baseStyles.toolTip /*, props.styles?.toolTip*/),
    chartWrapper: mergeClasses(
      sankeyChartClassNames.chartWrapper,
      props.reflowProps?.mode === 'min-width' ? baseStyles.chartWrapper : '',
      props.styles?.chartWrapper,
    ),
    chart: mergeClasses(sankeyChartClassNames.chart, baseStyles.chart, props.styles?.chart),
  };
};
