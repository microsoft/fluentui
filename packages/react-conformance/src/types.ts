export interface IsConformantOptions {
  constructorName: string;
  tests: string[];
  requiredProps?: object;
  exportedAtTopLevel: boolean;
  // packageRoot: any;
}

export type ConformanceTest = () => void;
