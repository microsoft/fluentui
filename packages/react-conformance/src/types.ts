import * as React from 'react';
import { ComponentDoc } from 'react-docgen-typescript';
import { defaultTests } from './defaultTests';
import { mount } from 'enzyme';

export type Tests = keyof typeof defaultTests;

export interface TestingOptions {
  'consistent-callback-names'?: {
    ignoreProps?: string[];
  };
}

/**
 * {@docCategory isConformant}
 */
export interface IsConformantOptions<TProps = {}> {
  /**
   * Path to component file.
   */
  componentPath: string;
  /**
   * Component object to test.
   */
  Component: React.ComponentType<TProps>;
  /**
   * Display name that will be considered as the correct displayName.
   */
  displayName: string;
  /**
   * In case that the mount from enzyme does not work for the component, a custom mount function can be provided.
   */
  customMount?: typeof mount;
  /**
   * If there are tests that aren't supposed to run on a component, this allows to opt out of any test.
   */
  disabledTests?: Tests[];
  /**
   * Optional flag that means the component is not exported at top level.
   * @defaultvalue false
   */
  isInternal?: boolean;
  /**
   * Object that contains extra tests to run in case the component needs extra tests.
   */
  extraTests?: TestObject;
  /**
   * If the component has required props, they can be added in this object and will be applied when mounting/rendering.
   */
  requiredProps?: Partial<TProps>;
  /**
   * Optional flag to use the default export.
   * @defaultvalue false
   */
  useDefaultExport?: boolean;
  /**
   * Allows specific test options.
   */
  testingOptions?: TestingOptions;
}

export type ConformanceTest = (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => void;

export interface TestObject {
  [key: string]: ConformanceTest;
}
