export type Breakpoints = Record<number, number> & { default?: number };

export type Column = {
  priority: number;
  minWidth: number;
  childIndex?: number;
};

export type Breakpoint = Record<string, Column[]>;

export default function calculateBreakpoints(config: Column[], breakpoints: number[]): Breakpoint {
  const minTableSize = config.reduce((acc, curr) => acc + curr.minWidth, 0);
  const breaks = {};

  const configsWithIndex: Column[] = config.map((column, i) => ({ ...column, childIndex: i + 1 }));
  const tempConfig = configsWithIndex.sort((a, b) => a.priority - b.priority);

  breakpoints.forEach(breakPoint => {
    let tempMinTableSize = minTableSize;
    for (let i = 0; tempMinTableSize > breakPoint; i++) {
      const currColumn = configsWithIndex.find(column => tempConfig[i].priority === column.priority);
      breaks[breakPoint] = breaks[breakPoint] ? [...breaks[breakPoint], currColumn] : [currColumn];
      tempMinTableSize -= tempConfig[i].minWidth;
    }
  });

  return breaks;
}
