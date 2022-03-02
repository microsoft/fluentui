import * as React from 'react';
import { ComponentDoc } from 'react-docgen-typescript';
import * as ts from 'typescript';

import { mount, ComponentType } from 'enzyme';

/**
 * Individual test options
 */
export interface TestOptions {
  'consistent-callback-names'?: {
    ignoreProps?: string[];
  };
  'consistent-callback-args'?: {
    ignoreProps?: string[];
  };
  'has-static-classnames'?: {
    [key: string]: string;
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
  disabledTests?: string[];
  /**
   * Optional flag that means the component is not exported at top level.
   * @defaultvalue false
   */
  isInternal?: boolean;
  /**
   * Additional tests to run.
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
   * An alternative name for the ref prop which resolves to
   * the root element (e.g. `elementRef`).
   * @defaultvalue 'ref'
   */
  elementRefName?: string;
  /**
   * Child component that will receive unhandledProps.
   */
  targetComponent?: ComponentType<TProps>;
  /**
   * The name of the slot designated as "primary", which receives native props passed to the component.
   * This is 'root' by default, and only needs to be specified if it's a slot other than 'root'.
   */
  primarySlot?: keyof TProps | 'root';

  /**
   * Test will load the first tsconfig.json file working upwards from `tsconfigDir`.
   * @defaultvalue the directory of the component being tested
   */
  tsconfigDir?: string;
}

export type ConformanceTest<TProps = {}> = (
  componentInfo: ComponentDoc,
  testInfo: IsConformantOptions<TProps>,
  tsProgram: ts.Program,
) => void;

export interface TestObject<TProps = {}> {
  [key: string]: ConformanceTest<TProps>;
}
