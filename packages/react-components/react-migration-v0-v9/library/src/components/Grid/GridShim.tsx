import { mergeClasses } from '@fluentui/react-components';
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

export const gridShimClassName = 'fui-Grid';

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

    const gridClasses = mergeClasses(
      gridShimClassName,
      classes.grid,
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
