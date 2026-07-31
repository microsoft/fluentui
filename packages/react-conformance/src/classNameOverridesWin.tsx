import * as React from 'react';
import { EOL } from 'os';
import { prettyDOM, render } from '@testing-library/react';

import type { IsConformantOptions } from './types';
import { errorMessageColors, getErrorMessage, getTargetElement } from './utils/index';

/**
 * Name this test registers under. Pass it in `disabledTests` to opt a component back out.
 */
export const CLASSNAME_OVERRIDES_WIN_TEST_NAME = 'classname-overrides-win';

/** Stands in for a class a consumer of the component would write. */
const CONSUMER_CLASSNAME = 'conformance-consumer-classname';

/**
 * The pure part of {@link classNameOverridesWin}: throws a formatted error if `classNames`
 * violates the contract. Split out from the `it()` body so the failure paths are unit
 * testable. Not exported from the package index — internal to this module and its test.
 *
 * @internal
 */
export function assertConsumerClassNameWins(params: {
  displayName: string;
  /** Class names rendered on the root slot, in attribute order. */
  classNames: string[];
  /** Consumer class name that was passed in. */
  consumerClassName: string;
  /** Optional rendered DOM, appended to error output. */
  domSnapshot?: string;
}): void {
  const { classNames, consumerClassName, displayName, domSnapshot } = params;
  const { resolveInfo, testErrorInfo } = errorMessageColors;

  const consumerIndex = classNames.indexOf(consumerClassName);
  const ownClassNames = classNames.filter(className => className !== consumerClassName);

  const renderedClassList = [
    `The rendered class list is:`,
    testErrorInfo(classNames.length ? classNames.join(' ') : '(empty)'),
    ...(domSnapshot ? ['', domSnapshot] : []),
  ];

  if (consumerIndex === -1) {
    throw new Error(
      getErrorMessage({
        displayName,
        overview: `does not apply the consumer's "className" to its root slot.`,
        details: [`Expected to find ${testErrorInfo(consumerClassName)}.`, '', ...renderedClassList],
        suggestions: [
          `Compose the root slot's class names with ${resolveInfo('clsx(...)')} and include ${resolveInfo(
            'state.root.className',
          )}.`,
          `If the class list lives on an element other than the container's first child, provide ${resolveInfo(
            'getTargetElement',
          )} in your isConformant options.`,
        ],
      }),
    );
  }

  if (ownClassNames.length === 0) {
    throw new Error(
      getErrorMessage({
        displayName,
        overview: `rendered no class names of its own, so there is nothing for the consumer's "className" to override.`,
        details: [
          `This test would pass vacuously, which would hide exactly the regression it exists to catch.`,
          '',
          ...renderedClassList,
        ],
        suggestions: [
          `Check that the component's styles hook runs and applies its static ${resolveInfo(
            'fui-*',
          )} class to the root slot.`,
          `If this component legitimately renders no class names of its own, disable ${resolveInfo(
            CLASSNAME_OVERRIDES_WIN_TEST_NAME,
          )} for it.`,
        ],
      }),
    );
  }

  const trailingClassNames = classNames.slice(consumerIndex + 1);

  if (trailingClassNames.length > 0) {
    throw new Error(
      getErrorMessage({
        displayName,
        overview:
          `renders class names AFTER the consumer's "className", ` +
          `so its own styles can win ties against the consumer's.`,
        details: [
          `These class names come after ${testErrorInfo(consumerClassName)}:`,
          trailingClassNames.map(className => `    ${className}`).join(EOL),
          '',
          ...renderedClassList,
        ],
        suggestions: [
          `Pass ${resolveInfo('state.root.className')} as the LAST argument to ${resolveInfo('clsx(...)')}.`,
          `A component composing with Griffel's ${resolveInfo(
            'mergeClasses()',
          )} cannot pass this test — mergeClasses appends its atomic classes after the consumer's className by design. Convert the component to clsx + CSS Modules first.`,
        ],
      }),
    );
  }
}

/**
 * A conformance test asserting the *cascade-native* "consumer overrides win" contract: a
 * `className` passed by a consumer reaches the root slot and is the LAST class in the
 * rendered `class` attribute, i.e. every class the component contributed itself comes
 * before it.
 *
 * ## Why this is opt-in rather than a default test
 *
 * This is the replacement for `make-styles-overrides-win` (in the retired
 * `@fluentui/react-conformance-griffel`, which gets no further releases) for components that have moved off Griffel to
 * plain `clsx` composition. It is deliberately NOT registered in `defaultTests`, because
 * components still composing with Griffel's `mergeClasses()` do NOT satisfy it — and that
 * is by design, not a bug in them.
 *
 * `mergeClasses()` accumulates non-atomic strings (static `fui-*` classes AND the
 * consumer's `className`) in argument order, then appends the merged ATOMIC classes after
 * all of them (`@griffel/core`'s `mergeClasses` returns `resultClassName + newClassName`).
 * So a Griffel component renders the consumer's class in the MIDDLE. This is the shape
 * `<Badge className="…" />` rendered before Badge was converted:
 *
 * ```txt
 * class="fui-Badge r1iycov <consumer-classname> ___g1d9dq0_1moluvk ffp7eso f1phragk"
 * ```
 *
 * and this is the shape it renders now — the BEM static gone (DECISIONS.md D16.1), the hashed
 * module class leading, the group marker second so it is never `classList[0]` (D16.2), and the
 * consumer's class last, which is the contract this test pins:
 *
 * ```txt
 * class="fuicm-badge-root-<hash> group/fui-badge <conditional module classes> <consumer-classname>"
 * ```
 *
 * Griffel does not need it to be last, because it resolves conflicts by deleting losing
 * atomic classes at merge time rather than by relying on the cascade — which is what
 * `make-styles-overrides-win` observes, by mocking `mergeClasses` and asserting call order.
 *
 * A converted component has no such runtime machinery: class names are inert identifiers
 * and every property conflict is settled by the `@layer fui.*` cascade
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D7 revision). The observable
 * contract left in the DOM is composition order — the component's own classes first and
 * `state.root.className` last — which is what this test pins.
 *
 * Note this also rules out enabling the test package-wide in a `src/testing/isConformant.ts`
 * wrapper while a package is only PARTLY converted: a component whose hook still calls
 * `mergeClasses` before delegating to a converted one renders atomics past the consumer's
 * class, and fails. Enable it per component until the whole package is off Griffel.
 *
 * ## What it deliberately does not assert
 *
 * Not computed styles. jsdom loads no stylesheet for `*.module.css` (jest maps it to a
 * class-name proxy), so `getComputedStyle` has nothing to resolve. That the consumer's
 * unlayered CSS beats the library's layered CSS is a cascade property, covered by the
 * visual-regression suite rather than here.
 *
 * ## Usage
 *
 * ```ts
 * isConformant({
 *   Component: Divider,
 *   displayName: 'Divider',
 *   extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
 * });
 * ```
 */
export function classNameOverridesWin<TProps = {}>(testInfo: IsConformantOptions<TProps>): void {
  it(`renders the consumer "className" last on the root slot (${CLASSNAME_OVERRIDES_WIN_TEST_NAME})`, () => {
    const { Component, displayName, renderOptions, requiredProps } = testInfo;
    const { resolveInfo } = errorMessageColors;

    // Matches the `component-handles-classname` default test: there is no good way to
    // derive the concrete props type here, and every v9 component accepts `className`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mergedProps: any = { ...requiredProps, className: CONSUMER_CLASSNAME };

    const result = render(<Component {...mergedProps} />, renderOptions);
    const rootEl = getTargetElement(testInfo, result, 'className');

    if (!rootEl) {
      throw new Error(
        getErrorMessage({
          displayName,
          overview: `did not render an element to check the consumer "className" against.`,
          suggestions: [
            `Make sure the component renders a root element.`,
            `If the class list lives on an element other than the container's first child, provide ${resolveInfo(
              'getTargetElement',
            )} in your isConformant options.`,
          ],
        }),
      );
    }

    assertConsumerClassNameWins({
      displayName,
      classNames: (rootEl.getAttribute('class') ?? '').split(/\s+/).filter(Boolean),
      consumerClassName: CONSUMER_CLASSNAME,
      domSnapshot: String(prettyDOM(rootEl) || ''),
    });
  });
}
