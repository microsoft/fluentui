import * as React from 'react';

export type PerfSample = {
  build: number;
  tag?: string;
  ts: string;
  performance: Record<
    string,
    {
      actualTime: {
        min: number;
        median: number;
        max: number;
      };
      flamegrill: {
        extended: {
          tpi: number;
        };
      };
    }
  >;
  bundleSize: Record<string, { size: number }>;
};

export type PerfData = PerfSample[];

export type PerfDataContextValue = {
  loading: boolean;
  error: Error;
  data: PerfData;
};

const PerfDataContext = React.createContext<PerfDataContextValue>({
  loading: true,
  error: undefined,
  data: undefined,
});

export default PerfDataContext;
