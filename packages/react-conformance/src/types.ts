export interface IsConformantOptions {
  constructorName: string;
  tests: String[];
  requiredProps?: object;
  exportedAtTopLevel: boolean;
  // packageRoot: any;
}

export type ConformanceTest = () => void;
