import { clsx } from 'clsx';
import type { DonutChartProps, DonutChartStyles } from './index';

import styles from './DonutChart.module.css';

/**
 * Public identity class for DonutChart.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 *
 * The only supported way to style a Fluent component's internals is
 * the per-slot `className` / `styles` props. `root` is retained as the component's public
 * identity class — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics (`fui-donut__chart`,
 * `fui-donut__legendContainer`, `fui-donut__chartWrapper`, `fui-donut__axisAnnotation`,
 * `fui-donut__chartTitle`, `fui-donut__svgTooltip`) were removed with the statics sweep
 * (DECISIONS.md D16.1 / D16.5): there is no public class-name handle on component internals.
 *
 * The marker is named for the COMPONENT (`DonutChart` → `donut-chart`), not for the old
 * static's `fui-donut` prefix — §3b requires `'group/fui-' + <component name, kebab>`.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + donutClassNames.root` is an invalid selector. Use `fuiSelector(donutClassNames.root)`
 * from `@fluentui/react-utilities` at every selector site (DECISIONS.md D16.5).
 *
 * @internal
 */
export const donutClassNames: { root: string } = {
  root: 'group/fui-donut-chart',
};

/**
 * Apply styling to the DonutChart component
 */
export const useDonutChartStyles = (props: DonutChartProps): DonutChartStyles => {
  const { className } = props;

  return {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    root: clsx(styles.root, donutClassNames.root, className, props.styles?.root),
    chart: clsx(styles.chart, props.styles?.chart),
    legendContainer: clsx(styles['legend-container'], props.styles?.legendContainer),
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    chartWrapper: props.styles?.chartWrapper,
    axisAnnotation: clsx(styles['axis-annotation'], props.styles?.axisAnnotation),
    chartTitle: clsx(styles['chart-title'], props.styles?.chartTitle),
    svgTooltip: clsx(styles['svg-tooltip'], props.styles?.svgTooltip),
  };
};
