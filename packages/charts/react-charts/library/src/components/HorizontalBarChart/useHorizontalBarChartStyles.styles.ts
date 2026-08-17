import { clsx } from 'clsx';
import type { HorizontalBarChartProps, HorizontalBarChartStyles } from './index';
import { HorizontalBarChartVariant } from './index';

import styles from './HorizontalBarChart.module.css';

/**
 * Public identity class for HorizontalBarChart.
 *
 * @internal
 *
 * @deprecated for styling. The only supported way to style this component's internals is the
 * per-slot `styles` prop. `root` is retained as the component's identity class — the Tailwind
 * named-group marker (DECISIONS.md D15.1) — usable as a selector and as a `group-*` variant
 * target. The twelve BEM slot keys were removed with the statics (DECISIONS.md D16.1 / D16.5):
 * there is no class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + hbcClassNames.root` is an invalid selector. Use `fuiSelector(hbcClassNames.root)` from
 * `@fluentui/react-utilities` at every selector site (DECISIONS.md D16.5).
 */
export const hbcClassNames: { root: string } = {
  root: 'group/fui-horizontal-bar-chart',
};

/**
 * Apply styling to the HorizontalBarChart slots based on the state
 */
export const useHorizontalBarChartStyles = (props: HorizontalBarChartProps): HorizontalBarChartStyles => {
  const { className, showTriangle, variant, hideLabels } = props; // ToDo - width, barHeight is non enumerable. Need to be used inline.
  const isAbsoluteScale = variant === HorizontalBarChartVariant.AbsoluteScale;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  return {
    root: clsx(styles.root, hbcClassNames.root, className, props.styles?.root),
    items: clsx(
      showTriangle || isAbsoluteScale ? styles['items-16p-margin'] : styles['items-10p-margin'],
      props.styles?.items,
    ),
    chart: clsx(styles.chart, props.styles?.chart),
    chartTitle: clsx(styles['chart-title'], props.styles?.chartTitle),
    barWrapper: clsx(styles['bar-wrapper'], props.styles?.barWrapper),
    chartTitleLeft: clsx(
      styles['chart-title-left'],
      isAbsoluteScale ? styles['chart-title-left-4p-margin'] : styles['chart-title-left-5p-margin'],
      props.styles?.chartTitleLeft,
    ),
    chartTitleRight: clsx(styles['chart-title-right'], props.styles?.chartTitleRight),
    chartDataTextDenominator: clsx(styles['chart-data-text-denominator'], props.styles?.chartDataTextDenominator),
    benchmarkContainer: clsx(styles['benchmark-container'], props.styles?.benchmarkContainer),
    triangle: clsx(styles.triangle, props.styles?.triangle),
    barLabel: clsx(styles['bar-label'], props.styles?.barLabel),
    chartWrapper: clsx(
      isAbsoluteScale && !hideLabels ? styles['chart-wrapper-40p-padding'] : styles['chart-wrapper-0p-padding'],
      props.styles?.chartWrapper,
    ),
    legendContainer: clsx(styles['legend-container'], props.styles?.legendContainer),
  };
};
