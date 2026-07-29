'use client';

import { clsx } from 'clsx';
import * as React from 'react';
import { useGridStyles } from './Grid.styles';

export interface GridShimProps {
  /**
   * The columns of the grid with a space-separated list of values.
   * The values represent the track size, and the space between them represents the grid line.
   */
  columns?: 1 | 2 | 3;

  /**
   * The rows of the grid with a space-separated list of values.
   * The values represent the track size, and the space between them represents the grid line.
   */
  rows?: 1 | 2 | 3;
}

/**
 * Public identity class for GridShim (re-exported from the package root as `gridClassName`).
 *
 * @deprecated for styling — see `attachmentClassName` in ../Attachment/Attachment.tsx for the
 * full rationale. Retained as the component's public identity class, the Tailwind named-group
 * marker (DECISIONS.md D15.1); the BEM static it used to hold was removed with every other
 * static (D16.1).
 *
 * NAME CHANGE, deliberate. The static was `fui-Grid` while the component's `displayName` is
 * `GridShim` — a mismatch that is exactly why `component-has-static-classnames-object` was
 * disabled for this component. D15.1 defines the marker as the `group/fui-` prefix plus the
 * component's own name in lowercase-kebab, so it is `group/fui-grid-shim` and the conformance
 * test derives it from `displayName` with no override. No consumer loses anything it
 * had: reading `gridClassName` picks up the new value automatically, and a hardcoded
 * `.fui-Grid` selector breaks under any statics-removal option.
 *
 * Use `fuiSelector(gridClassName)` from `@fluentui/react-utilities` at selector sites (D16.5).
 */
export const gridShimClassName = 'group/fui-grid-shim';

export const GridShim = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement> & GridShimProps>(
  (props, ref) => {
    const { rows, columns, className, ...rest } = props;
    const classes = useGridStyles();

    const classMaps = React.useMemo(
      () => ({
        rowsClasses: {
          1: classes.rows1,
          2: classes.rows2,
          3: classes.rows3,
        },
        columnsClasses: {
          1: classes.columns1,
          2: classes.columns2,
          3: classes.columns3,
        },
      }),
      [classes],
    );

    // Unconditional module class FIRST (`classes.grid`), then the named group marker, then
    // the conditional module classes, with the consumer className last (DECISIONS.md D16.2).
    // The marker must never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under
    // jsdom (D15.1). Cascade priority is decided by the `@layer fui.*` order in
    // Grid.module.css, not by the order of these arguments.
    const gridClasses = clsx(
      classes.grid,
      'group/fui-grid-shim',
      !rows && !columns && classes.columnsDefault,
      rows && !columns && classes.onlyRows,
      rows && classMaps.rowsClasses[rows],
      columns && classMaps.columnsClasses[columns],
      className,
    );
    return <div ref={ref} className={gridClasses} {...rest} />;
  },
);

GridShim.displayName = 'GridShim';
