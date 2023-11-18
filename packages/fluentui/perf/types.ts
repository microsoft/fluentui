export type MeasuredValues = 'actualTime' | 'renderComponentTime' | 'componentCount';

export type ProfilerMeasure = { [key in MeasuredValues]: number } & {
  exampleIndex: number;
  phase: string;
  startTime: number;
  commitTime: number;

  componentCount: number;
  renderComponentTime: number;
};

export type ProfilerMeasureCycle = Record<string, ProfilerMeasure>;

export type PerExamplePerfMeasures = Record<string, Record<MeasuredValues, ReducedMeasures>>;

export type ReducedMeasures = {
  avg: number;
  median: number;
  min: number;
  max: number;
  values: {
    exampleIndex: number;
    value: number;
  }[];
};
