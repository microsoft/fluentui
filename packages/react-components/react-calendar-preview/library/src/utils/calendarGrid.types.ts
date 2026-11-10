import type * as React from 'react';

/**
 * Presence attributes describing the state of a calendar row or cell, such as `data-selected`.
 */
export type CalendarDataAttributes = {
  [attribute: `data-${string}`]: string | undefined;
};

/**
 * Props rendered on a repeated calendar element, such as a grid row or cell. The styled layer adds its class names
 * to these props; they are not slots, so they cannot be replaced by consumers.
 */
export type CalendarElementProps<
  E extends HTMLElement,
  A extends React.HTMLAttributes<E> = React.HTMLAttributes<E>,
> = A &
  CalendarDataAttributes & {
    ref?: React.Ref<E>;
  };

/**
 * One row of the four-column month or year grid.
 */
export type CalendarGridRow<TCell> = {
  /**
   * Stable key of the row.
   */
  key: number;

  /**
   * Props of the `role="row"` element.
   */
  props: CalendarElementProps<HTMLDivElement>;

  /**
   * The cells in the row.
   */
  cells: TCell[];
};

/**
 * Wraps a rendered row, for example with a motion component. Provided by the styled layer.
 */
export type CalendarRowWrapper<TRow> = (row: React.ReactElement, data: TRow) => React.ReactElement | null;
