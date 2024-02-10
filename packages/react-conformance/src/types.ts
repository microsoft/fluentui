import * as React from 'react';
import { ComponentDoc } from 'react-docgen-typescript';
import * as ts from 'typescript';

import { render } from '@testing-library/react';

/**
 * Individual test options
 */
export interface TestOptions {
  'consistent-callback-names'?: {
    ignoreProps?: string[];
  };
  'consistent-callback-args'?: {
    legacyCallbacks?: string[];
  };
  'has-static-classnames'?: {
    props: {
      [key: string]: string | {};
    };
    expectedClassNames?: {
      [key: string]: string;
    };
    getPortalElement?: (renderResult: ReturnType<typeof render>) => HTMLElement;
  }[];
  'component-has-static-classname'?: {
    /** Prefix for the classname, if not `fui-` */
    prefix?: string;
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
   * Custom options passed to `@testing-library/react`'s `render` method.
   */
  renderOptions?: Parameters<typeof render>[1];
  /**
   * If there are tests that aren't supposed to run on a component, this allows to opt out of any test.
   */
  disabledTests?: string[];

  /**
   * Disable tests that verify the component's prop types.
   * These tests require TypeScript information.
   * It is recommended to keep these tests enabled, but they can be disabled in a large repo to improve test performance and memory consumption.
   */
  disableTypeTests?: boolean;

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
   * An alternative name for the ref prop which resolves to
   * the root element (e.g. `elementRef`).
   * @defaultvalue 'ref'
   */
  elementRefName?: string;
  /**
   * Get the element that will receive native props (or the specified native prop, if it matters)
   */
  getTargetElement?: (
    renderResult: ReturnType<typeof render>,
    attr: keyof React.AllHTMLAttributes<HTMLElement> | 'ref' | `data-${string}`,
  ) => HTMLElement;
  /**
   * The name of the slot designated as "primary", which receives native props passed to the component.
   * This is 'root' by default, and only needs to be specified if it's a slot other than 'root'.
   */
  primarySlot?: keyof TProps | 'root';

  /**
   * @deprecated - use `tsConfig` property
   *
   * Test will load the first tsconfig.json file working upwards from `tsconfigDir`.
   * @defaultvalue the directory of the component being tested
   */
  tsconfigDir?: string;
  /**
   * replaces tsconfigDir
   */
  tsConfig?: Partial<{ configName: string; configDir: string }>;
}

export type BaseConformanceTest<TProps = {}> = (testInfo: IsConformantOptions<TProps>) => void;
export type ConformanceTest<TProps = {}> = (
  testInfo: IsConformantOptions<TProps>,
  componentInfo: ComponentDoc,
  tsProgram: ts.Program,
) => void;

export interface TestObject<TProps = {}> {
  [key: string]: BaseConformanceTest<TProps> | ConformanceTest<TProps>;
}

export interface DefaultTestObject<TProps = {}> {
  'exports-component': BaseConformanceTest<TProps>;
  'component-renders': BaseConformanceTest<TProps>;
  'component-has-displayname': BaseConformanceTest<TProps>;
  'component-handles-ref': BaseConformanceTest<TProps>;
  'component-has-root-ref': BaseConformanceTest<TProps>;
  'omits-size-prop': ConformanceTest<TProps>;
  'component-handles-classname': BaseConformanceTest<TProps>;
  'component-has-static-classnames-object': ConformanceTest<TProps>;
  'name-matches-filename': BaseConformanceTest<TProps>;
  'exported-top-level': BaseConformanceTest<TProps>;
  'has-top-level-file': BaseConformanceTest<TProps>;
  'kebab-aria-attributes': ConformanceTest<TProps>;
  'consistent-callback-names': ConformanceTest<TProps>;
  /**
   * @deprecated this test is for existing callbacks. The newly added callbacks' type will be guarded by eslint rule consistent-callback-type
   */
  'consistent-callback-args': ConformanceTest<TProps>;
  'primary-slot-gets-native-props': BaseConformanceTest<TProps>;
}
