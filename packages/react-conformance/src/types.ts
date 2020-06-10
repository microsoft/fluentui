import { ComponentDoc } from 'react-docgen-typescript';

export interface TestingOptions {
  constructorName: string;
  requiredProps?: object;
  exportedAtTopLevel?: boolean;
}

export type ConformanceTest = (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => void;
