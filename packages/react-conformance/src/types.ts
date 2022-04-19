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
    ignoreProps?: string[];
  };
  'has-static-classnames'?: {
    props: {
      [key: string]: string | {};
    };
    expectedClassNames?: {
      [key: string]: string;
    };
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
