import * as React from 'react';
import * as path from 'path';
import { render } from '@testing-library/react';

import type { IsConformantOptions } from './types';
import { defaultErrorMessages } from './defaultErrorMessages';
import { getPackagePath, getTargetElement } from './utils/index';

/**
 * TODO - TS 4.5 introduces strict catch `err` callback handling - opting out for sake of smoother ts 4.5 upgrade
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OptOutStrictCatchTypes = any;

/**
 * Name this test registers under.
 *
 * Deliberately unchanged from the id it carried while it was a default test, so that every
 * `disabledTests: ['component-has-static-classnames-object']` entry already in the repo keeps
 * opting the component out, and so the three `defaultErrorMessages` entries it throws through
 * stay addressable by the same keys.
 */
export const HAS_STATIC_CLASSNAMES_TEST_NAME = 'component-has-static-classnames-object';

/**
 * Asserts the BEM static-class contract: the component exports a `<name>ClassNames` object at
 * the package top level, whose values are exactly `fui-<Component>` for `root` and
 * `fui-<Component>__<slot>` for every other key, and which are all present in the rendered DOM.
 *
 * ## Why this is opt-in rather than a default test
 *
 * It was a default test until the statics-removal sweep (DECISIONS.md D16.6). All three of its
 * assertions hard-code the `fui-<Component>` / `fui-<Component>__<slot>` format, which is
 * exactly what D16.1 retired: converted packages no longer render those classes, and their
 * retained `*ClassNames` exports have narrowed to `{ root: string }` with `root` re-pointed at
 * the `group/fui-<kebab>` marker (D16.5). The test therefore cannot pass for them under any
 * export policy, and leaving it in the default set with 33 packages opting out is a worse
 * signal than retiring the rule the design has retired.
 *
 * It is kept and exported rather than deleted because the packages that still ship BEM statics
 * — the `needs-conversion` and `special` sets — are still under the contract it pins, and
 * dropping their coverage silently would be a regression in its own right. Those packages take
 * it explicitly, normally once per package in `src/testing/isConformant.ts` so that every
 * component in the package is covered by a single registration.
 *
 * `component-has-group-marker` is its counterpart for converted packages, and IS a default test.
 *
 * ## Usage
 *
 * ```ts
 * // src/testing/isConformant.ts, in a package that still publishes BEM statics
 * const defaultOptions: Partial<IsConformantOptions<TProps>> = {
 *   extraTests: {
 *     ...griffelTests,
 *     [HAS_STATIC_CLASSNAMES_TEST_NAME]: hasStaticClassNames,
 *   } as TestObject<TProps>,
 * };
 * ```
 *
 * Variant renders, `expectedClassNames` overrides and portalled slots are configured exactly as
 * before, through `testOptions['has-static-classnames']`.
 */
export function hasStaticClassNames<TProps = {}>(genericTestInfo: IsConformantOptions<TProps>): void {
  // Widened once, here, so the body below stays byte-for-byte the default test it was moved
  // from: every v9 component accepts the props this renders, and there is no good way to
  // derive the concrete props type from the generic.
  const testInfo = genericTestInfo as IsConformantOptions;
  const { componentPath, Component, testOptions = {}, requiredProps, renderOptions } = testInfo;

  const componentName = testInfo.displayName;
  const classNamePrefix = testOptions?.['component-has-static-classname']?.prefix ?? 'fui';
  const componentClassName = `${classNamePrefix}-${componentName}`;
  const exportName = `${componentName[0].toLowerCase()}${componentName.slice(1)}ClassNames`;
  const indexPath = path.join(getPackagePath(componentPath), 'src', 'index');
  let handledClassNamesObjectExport = false;

  it(`has static classnames exported at top-level (${HAS_STATIC_CLASSNAMES_TEST_NAME})`, () => {
    if (testInfo.isInternal) {
      return;
    }

    try {
      const indexFile = require(indexPath);
      const classNamesFromFile = indexFile[exportName];
      expect(classNamesFromFile).toBeTruthy();
      handledClassNamesObjectExport = true;
    } catch (e: OptOutStrictCatchTypes) {
      throw new Error(defaultErrorMessages['component-has-static-classnames-object-exported'](testInfo, e, exportName));
    }
  });

  it(`has static classnames in correct format (${HAS_STATIC_CLASSNAMES_TEST_NAME})`, () => {
    if (!handledClassNamesObjectExport) {
      return;
    }

    const indexFile = require(indexPath);
    const classNamesFromFile = indexFile[exportName];

    const expectedClassNames = Object.keys(classNamesFromFile).reduce((obj: { [key: string]: string }, key: string) => {
      obj[key] = key === 'root' ? componentClassName : `${componentClassName}__${key}`;
      return obj;
    }, {});

    try {
      expect(classNamesFromFile).toEqual(expectedClassNames);
    } catch (e: OptOutStrictCatchTypes) {
      throw new Error(
        defaultErrorMessages['component-has-static-classnames-in-correct-format'](testInfo, e, exportName),
      );
    }
  });

  it(`has static classnames in rendered component (${HAS_STATIC_CLASSNAMES_TEST_NAME})`, () => {
    if (!handledClassNamesObjectExport) {
      return;
    }

    const staticClassNameVariants = testOptions['has-static-classnames'] ?? [{ props: {} }];

    for (const staticClassNames of staticClassNameVariants) {
      const mergedProps = {
        ...requiredProps,
        ...staticClassNames.props,
      };
      const result = render(<Component {...mergedProps} />, renderOptions);
      const rootEl = getTargetElement(testInfo, result, 'className');
      const portalEl = staticClassNames.getPortalElement && staticClassNames.getPortalElement(result);

      const indexFile = require(indexPath);
      const classNamesFromFile = indexFile[exportName];

      const expectedClassNames: { [key: string]: string } = staticClassNames.expectedClassNames ?? classNamesFromFile;
      let missingClassNames = Object.values(expectedClassNames).filter(
        className => !rootEl.classList.contains(className) && !rootEl.querySelector(`.${className}`),
      );

      if (missingClassNames.length && portalEl) {
        missingClassNames = missingClassNames.filter(
          className => !portalEl.classList.contains(className) && !portalEl.querySelector(`.${className}`),
        );
      }

      try {
        expect(missingClassNames).toHaveLength(0);
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(
          defaultErrorMessages['component-has-static-classnames'](
            testInfo,
            e,
            componentName,
            missingClassNames.join(', '),
            rootEl,
          ),
        );
      }
    }
  });
}
