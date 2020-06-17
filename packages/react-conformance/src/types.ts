import * as React from 'react';
import { ComponentDoc } from 'react-docgen-typescript';
import { defaultTests } from './defaultTests';
import { mount } from 'enzyme';

export type Tests = keyof typeof defaultTests;

export interface TestingOptions<TProps = {}> {
  componentPath: string;
  Component: React.ComponentType<TProps>;
  displayName: string;
  customMount?: typeof mount;
  disabledTests?: Tests[];
  exportedAtTopLevel?: boolean;
  extraTests?: TestObject;
  requiredProps?: Partial<TProps>;
  useDefaultExport?: boolean;
}

export type ConformanceTest = (componentInfo: ComponentDoc, testInfo: TestingOptions) => void;

export interface TestObject {
  [key: string]: ConformanceTest;
}
