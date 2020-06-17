import * as React from 'react';
import { ComponentDoc } from 'react-docgen-typescript';

export interface TestingOptions<TProps = {}> {
  componentPath: string;
  Component: React.ComponentType<TProps>;
  displayName: string;
  requiredProps?: Partial<TProps>;
  exportedAtTopLevel?: boolean;
  useDefaultExport?: boolean;
}

export type ConformanceTest = (componentInfo: ComponentDoc, testInfo: TestingOptions) => void;

export interface TestObject {
  [key: string]: ConformanceTest;
}
