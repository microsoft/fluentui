export type Breakpoints = {
  [breakpoint: number]: number;
  default: number;
};

export type Column = {
  title: string;
  priority: number;
  ratio: number;
  minWidth: number;
};

export type Breakpoint = {
  viewport: number;
  table: number;
  columns: (Column & {
    state: 'visible' | 'hidden';
    size: number | undefined;
  })[];
};

const getBreaks = breakpoints =>
  Object.keys(breakpoints)
    .filter(k => k !== 'default')
    .map(Number)
    .sort((a, b) => a - b);

function deriveViewportFromTable(table: number, breakpoints: Breakpoints) {
  let viewport: number | undefined;
  const breaks = getBreaks(breakpoints);

  // Walk the breakpoints as long as the table fits it
  for (const breakpoint of breaks) {
    // Check if the table and the deadspace still meet the breakpoint
    if (table + breakpoints[breakpoint] <= breakpoint) {
      // Remember the latest breakpoint which fit the table
      viewport = breakpoint;

      // Stop as soon as we find a breakpoint which fits the table
      break;
    }
  }

  // Return the breakpoint or the default one if the table didn't fit any
  return viewport || table + breakpoints.default;
}

function deriveTableFromViewport(viewport: number, breakpoints: Breakpoints) {
  let deadspace: number | undefined;
  const breaks = getBreaks(breakpoints);

  // Walk the breakpoints long as the viewport fits
  for (const breakpoint of breaks) {
    if (viewport <= breakpoint) {
      // Remember the deadspace of the breakpoint which fits the viewport
      deadspace = breakpoints[breakpoint];
    }
  }

  // Fallback onto the default breakpoint if no specific one was met
  return viewport - (deadspace || breakpoints.default);
}

export default function* calculateBreakpoints(columns: Column[], breakpoints: Breakpoints) {
  // Remember the last column configuration to only report when changes in it
  let breakpoint: string | undefined;

  // Sum up the ratios of the columns to calculate fit table size for each
  const ratio = columns.reduce((a, c) => a + c.ratio, 0);

  // Find the table size needed to accomodate all columns at their ratios/limits
  let table = Math.max(...columns.map(c => (ratio / c.ratio) * c.minWidth));

  // Sort the columns priority-wise to slice candidate sets priority-wise
  // Clone to not mutate caller and preserve caller column order in yield
  const sortedColumns = [...columns].sort((a, b) => b.priority - a.priority);

  // Descend from a viewport size where the table size fits columns perfectly
  for (let viewport = deriveViewportFromTable(table, breakpoints); viewport > 0; viewport--) {
    // Derive table size from the viewport size accounting for breakpoints
    table = deriveTableFromViewport(viewport, breakpoints);

    // Capture the subset of columns which fits the current table size
    let fittedColumns: Column[] = [];

    // Sweep the subsets of columns priority-wise to find the best fit
    let count = 1;
    do {
      const loopTable = table;

      // Slice the subset of columns being measured for fit right now
      const slicedColumns = sortedColumns.slice(0, count);

      // Sum up the sliced columns ratios to later normalize the ratios to one
      const ratio = slicedColumns.reduce((a, c) => a + c.ratio, 0);

      // See if all columns fit at their limits and ratios and stop if not
      if (!slicedColumns.every(c => c.minWidth <= loopTable * (c.ratio / ratio))) {
        break;
      }

      // Remember the current subset as the latest fitting subset
      fittedColumns = slicedColumns;

      // Retry with an extended subset in case it fits as well
      count++;

      // Keep extending the subset until we reach the full set
    } while (count <= sortedColumns.length);

    const loopTable = table;
    if (breakpoint !== fittedColumns.map((_, i) => i).join()) {
      // Recalculate the ratio again for the final subset to report sizes for debugging
      const ratio = fittedColumns.reduce((a, c) => a + c.ratio, 0);

      // Report the best subset of columns for this breakpoint
      yield {
        viewport,
        table,
        columns: columns.map(c => {
          const visible = fittedColumns.includes(c);
          return {
            ...c,
            state: visible ? 'visible' : 'hidden',
            size: visible ? ~~(loopTable * (c.ratio / ratio)) : undefined
          };
        })
      } as Breakpoint;

      breakpoint = fittedColumns.map((_, i) => i).join();
    }
  }
}
