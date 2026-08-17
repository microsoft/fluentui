import { clsx } from 'clsx';
import type { DonutChartProps, DonutChartStyles } from './index';

import styles from './DonutChart.module.css';

/**
 * Public identity class for DonutChart.
 *
 * DEPRECATED FOR STYLING INTERNALS — deliberately NOT tagged `@deprecated`, matching
 * react-popover: the tag propagates to every re-export specifier and
 * `@typescript-eslint/no-deprecated` then errors on each. The narrowed `{ root: string }`
 * type is what enforces D16.5; the tag would only buy lint noise.
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
    // Unconditional module class FIRST, then the named group marker, then the consumer's
    // own strings last (DECISIONS.md D16.2). The marker must never be `classList[0]` —
    // nwsapi's `:scope` polyfill throws on the `/` under jsdom (DECISIONS.md D15.1) — and
    // `styles.root` is the token that guarantees it, since clsx never drops an
    // unconditional argument.
    //
    // Cascade priority is decided by the `@layer fui.*` order in DonutChart.module.css, not
    // by the order of these arguments — see that file's header for the mapping back to the
    // mergeClasses() argument order this replaces. `className` before `props.styles?.root`
    // preserves the previous argument order; both are unlayered consumer strings, so the
    // relative order carries no cascade meaning either way.
    root: clsx(styles.root, donutClassNames.root, className, props.styles?.root),
    chart: clsx(styles.chart, props.styles?.chart),
    legendContainer: clsx(styles['legend-container'], props.styles?.legendContainer),
    // `chartWrapper` carries NO class of its own. Its only library token was the
    // `fui-donut__chartWrapper` static and DonutChart.module.css declares no `.chart-wrapper`
    // local — the wrapper is a bare positioning div. With the static removed the assignment
    // would be `clsx(props.styles?.chartWrapper)`, an identity on the consumer's own string,
    // so it is passed straight through rather than left as dead code implying this hook
    // styles a slot it does not (statics-removal design §4d / DECISIONS.md D16.1).
    chartWrapper: props.styles?.chartWrapper,
    axisAnnotation: clsx(styles['axis-annotation'], props.styles?.axisAnnotation),
    chartTitle: clsx(styles['chart-title'], props.styles?.chartTitle),
    svgTooltip: clsx(styles['svg-tooltip'], props.styles?.svgTooltip),
  };
};
