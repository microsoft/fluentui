import * as React from 'react';
import { ComponentDoc } from 'react-docgen-typescript';
import { defaultTests } from './defaultTests';
import { mount, ComponentType } from 'enzyme';

export type Tests = keyof typeof defaultTests;

/**
 * Individual test options
 */
export interface TestOptions {
  'consistent-callback-names'?: {
    ignoreProps?: string[];
  };
}

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
  extraTests?: TestObject<TProps>;
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
  testOptions?: TestOptions;
  /**
   * This component uses wrapper slot to wrap the 'meaningful' element.
   */
  wrapperComponent?: React.ElementType;
  /**
   * Helpers such as FocusZone and Ref which should be ignored when finding nontrivial children.
   */
  helperComponents?: React.ElementType[];
  /**
   * Whether to skip all tests for the `as` prop.
   */
  skipAsPropTests?: boolean;
  /**
   * If the component's 'as' property requires a ref, this will attach a forwardRef to the test component passed to 'as'
   * and disable the as-renders-react-class test.
   */
  asPropHandlesRef?: boolean;
  /**
   * An alternative name for the ref prop which resolves to
   * the root element (e.g. `elementRef`).
   * @defaultvalue 'ref'
   */
  elementRefName?: string;
  /**
   * Child component that will receive unhandledProps.
   */
  targetComponent?: ComponentType<TProps>;
}

export type ConformanceTest<TProps = {}> = (componentInfo: ComponentDoc, testInfo: IsConformantOptions<TProps>) => void;

export interface TestObject<TProps = {}> {
  [key: string]: ConformanceTest<TProps>;
}
