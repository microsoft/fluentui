import { makeStyles, mergeClasses } from '@griffel/react';
import type { SankeyChartProps, SankeyChartStyles } from './SankeyChart.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
// import { HighContrastSelectorBlack } from '../../utilities/index';

export const sankeyChartClassNames: SlotClassNames<SankeyChartStyles> = {
  root: 'fui-sc__root',
  nodes: 'fui-sc__nodes',
  links: 'fui-sc__links',
  nodeTextContainer: 'fui-sc__nodeTextContainer',
  toolTip: 'fui-sc__toolTip',
  calloutContentRoot: 'fui-sc__calloutContentRoot',
  chartWrapper: 'fui-sc__chartWrapper',
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
    // stroke: pathColor ? pathColor : theme.palette.black,
    fill: tokens.colorNeutralBackground1,
    strokeWidth: '3px',
    // [HighContrastSelectorBlack]: {
    //   fill: '#000000',
    // },
  },
  nodes: {
    fill: '#F5F5F5',
    // [HighContrastSelectorBlack]: {
    //   fill: '#000000',
    // },
  },
  toolTip: {
    ...typographyStyles.body1,
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    position: 'absolute',
    textAlign: 'center',
    top: '0px',
    background: tokens.colorNeutralBackground1,
    borderRadius: '2px',
    pointerEvents: 'none',
  },
  nodeTextContainer: {
    '& text': {
      // [HighContrastSelectorBlack]: {
      //   fill: 'rgb(179, 179, 179)',
      // },
    },

    marginTop: '4px',
    marginLeft: '8px',
    marginBottom: '4px',
    marginRight: '8px',
  },
  calloutContentRoot: {
    boxShadow: tokens.shadow2,
  },
  chartWrapper: {
    overflow: 'auto',
  },
});

export const useSankeyChartStyles = (props: SankeyChartProps): SankeyChartStyles => {
  const baseStyles = useStyles();

  return {
    root: mergeClasses(sankeyChartClassNames.root, baseStyles.root /*, props.styles?.root*/),
    nodes: mergeClasses(sankeyChartClassNames.nodes, baseStyles.nodes /*, props.styles?.nodes*/),
    links: mergeClasses(sankeyChartClassNames.links, baseStyles.links /*, props.styles?.links*/),
    nodeTextContainer: mergeClasses(
      sankeyChartClassNames.nodeTextContainer,
      baseStyles.nodeTextContainer /*, props.styles?.nodeTextContainer*/,
    ),
    toolTip: mergeClasses(sankeyChartClassNames.toolTip, baseStyles.toolTip /*, props.styles?.toolTip*/),
    calloutContentRoot: mergeClasses(
      sankeyChartClassNames.calloutContentRoot,
      baseStyles.calloutContentRoot /*, props.styles?.calloutContentRoot*/,
    ),
    chartWrapper: mergeClasses(
      sankeyChartClassNames.chartWrapper,
      props.enableReflow ? baseStyles.chartWrapper : '' /*, props.styles?.chartWrapper*/,
    ),
  };
};
