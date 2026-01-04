'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { FunnelChartProps, FunnelChartStyles } from './index';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @internal
 */
export const funnelClassNames: SlotClassNames<FunnelChartStyles> = {
  root: 'fui-funnel__root',
  chart: 'fui-funnel__chart',
  text: 'fui-funnel__text',
  calloutContentRoot: 'fui-funnel__callout-content-root',
  chartTitle: 'fui-funnel__chartTitle',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    position: 'relative',
    textAlign: 'left',
  },
  chart: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  text: {
    pointerEvents: 'none',
    fontWeight: tokens.fontWeightSemibold,
    fill: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
  },
  calloutContentRoot: {
    maxWidth: '238px',
  },
  chartTitle: {
    fill: tokens.colorNeutralForeground1,
    forcedColorAdjust: 'auto',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalS,
  },
});

/**
 * Apply styling to the FunnelChart component
 */
export const useFunnelChartStyles = (props: FunnelChartProps): FunnelChartStyles => {
  const { className } = props;
  const baseStyles = useStyles();

  return {
    root: mergeClasses(funnelClassNames.root, baseStyles.root, className, props.styles?.root),
    chart: mergeClasses(funnelClassNames.chart, baseStyles.chart, props.styles?.chart),
    text: mergeClasses(funnelClassNames.text, baseStyles.text, props.styles?.text),
    calloutContentRoot: mergeClasses(baseStyles.calloutContentRoot, props.styles?.calloutContentRoot),
    chartTitle: mergeClasses(funnelClassNames.chartTitle, baseStyles.chartTitle, props.styles?.chartTitle),
  };
};
