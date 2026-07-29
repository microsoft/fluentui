import * as React from 'react';
import { EOL } from 'os';
import { prettyDOM, render } from '@testing-library/react';

import type { IsConformantOptions } from './types';
import { errorMessageColors, getErrorMessage, getTargetElement } from './utils/index';

/**
 * Name this test registers under. Pass it in `disabledTests` to opt a component back out.
 */
export const COMPONENT_HAS_GROUP_MARKER_TEST_NAME = 'component-has-group-marker';

/**
 * A Tailwind named-group / named-peer marker token: `group/<name>` or `peer/<name>`.
 *
 * The `/` is what makes these tokens special, and it is the whole reason for the
 * `classList[0]` half of this test — see {@link assertMarkerIsNotLeadingToken}.
 */
const MARKER_TOKEN_REGEX = /^(group|peer)\//;

/**
 * Lowercase-kebab, the alphabet DECISIONS.md D15.1/D15.2/D15.3 put the entire generated and
 * generated-adjacent class surface into.
 *
 * Deliberately duplicated rather than imported: the single source of truth for idents is
 * `scripts/css-modules/ident.js` (`toKebabCase`, L86-95), which is required BY RELATIVE PATH
 * from the three build pipelines and must stay free of workspace requires. `react-conformance`
 * is a published package and cannot reach it. The two `replace` steps below are the same two
 * that helper leads with; the remainder of its chain scrubs ident-unsafe characters that a
 * component `displayName` cannot contain.
 *
 * @internal
 */
export function toKebabCase(displayName: string): string {
  return displayName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * The complete set of markers a component is expected to stamp on its outermost slot.
 *
 * Defaults to the single `group/fui-<displayName in lowercase-kebab>`. Two overrides, both on
 * `testOptions['has-group-marker']`:
 *
 * - `marker` — one marker under a different name. The typography presets use this: they share
 *   `group/fui-text`, because a `<Body1>` IS a `<Text>` (DECISIONS.md D16.7).
 * - `markers` — the whole set, for a component that renders ANOTHER component's root and so
 *   legitimately carries that component's marker alongside its own. `<ToolbarToggleButton>` is
 *   a `<ToggleButton>` is a `<Button>`, and each hook stamps its own marker on the one element,
 *   so a descendant can address whichever identity it means (D16.3).
 *
 * @internal
 */
export function getExpectedGroupMarkers<TProps = {}>(testInfo: IsConformantOptions<TProps>): string[] {
  const options = testInfo.testOptions?.['has-group-marker'];

  if (options?.markers) {
    return options.markers;
  }

  return [options?.marker ?? `group/fui-${toKebabCase(testInfo.displayName)}`];
}

function renderedClassListDetails(classNames: string[], domSnapshot?: string): string[] {
  const { testErrorInfo } = errorMessageColors;

  return [
    `The rendered class list is:`,
    testErrorInfo(classNames.length ? classNames.join(' ') : '(empty)'),
    ...(domSnapshot ? ['', domSnapshot] : []),
  ];
}

/**
 * The first pure half of {@link componentHasGroupMarker}: the outermost slot carries exactly
 * the named-group markers this component is expected to stamp — no more, no fewer.
 *
 * For the overwhelming majority that is the single marker named for the component. A component
 * that renders another component's root carries that component's marker too, and declares the
 * whole set via `testOptions['has-group-marker'].markers` (DECISIONS.md D16.3). Either way the
 * assertion is an exact set comparison, so an unexpected EXTRA marker still fails — which is
 * the half that catches an accidental second `group/` literal.
 *
 * Split out of the `it()` body so the failure paths are unit testable. Not exported from the
 * package index — internal to this module and its test.
 *
 * @internal
 */
export function assertGroupMarkerIsStamped(params: {
  displayName: string;
  /** Class names rendered on the outermost slot, in `classList` order. */
  classNames: string[];
  /** Every marker this component is expected to stamp, in any order. */
  expectedMarkers: string[];
  /** Optional rendered DOM, appended to error output. */
  domSnapshot?: string;
}): void {
  const { classNames, displayName, domSnapshot, expectedMarkers } = params;
  const { resolveInfo, testErrorInfo } = errorMessageColors;

  const groupMarkers = classNames.filter(className => className.startsWith('group/'));

  const missing = expectedMarkers.filter(marker => !groupMarkers.includes(marker));
  const unexpected = groupMarkers.filter(marker => !expectedMarkers.includes(marker));

  if (missing.length) {
    throw new Error(
      getErrorMessage({
        displayName,
        overview: `does not stamp its named group marker${
          expectedMarkers.length > 1 ? 's' : ''
        } on its outermost slot.`,
        details: [
          `Expected to find ${testErrorInfo(missing.join(', '))}.`,
          ...(groupMarkers.length
            ? ['', `It stamped these instead:`, groupMarkers.map(m => `    ${m}`).join(EOL)]
            : []),
          '',
          ...renderedClassListDetails(classNames, domSnapshot),
        ],
        suggestions: [
          `Add the literal ${resolveInfo(`'${missing[0]}'`)} to the outermost slot's ${resolveInfo(
            'clsx(...)',
          )} — written as a literal, never a template (DECISIONS.md D15.1).`,
          `If this component's marker is legitimately named something else, set ${resolveInfo(
            "testOptions['has-group-marker'].marker",
          )}.`,
          `If this component renders another component's root and so carries its marker too, declare the whole set with ${resolveInfo(
            "testOptions['has-group-marker'].markers",
          )}.`,
          `If the class list lives on an element other than the container's first child, provide ${resolveInfo(
            'getTargetElement',
          )} in your isConformant options.`,
        ],
      }),
    );
  }

  if (unexpected.length) {
    throw new Error(
      getErrorMessage({
        displayName,
        overview: `stamps a named group marker it did not declare on its outermost slot.`,
        details: [
          `Undeclared:`,
          unexpected.map(marker => `    ${marker}`).join(EOL),
          '',
          `Declared: ${expectedMarkers.join(', ')}`,
          '',
          ...renderedClassListDetails(classNames, domSnapshot),
        ],
        suggestions: [
          `Keep ONE marker per component (DECISIONS.md D15.1). Sub-components have their own roots, so the hierarchy nests for free.`,
          `A group cannot style itself — the compiled selector is ${resolveInfo(
            '.child:is(:where(.group…) *)',
          )} and the descendant combinator excludes the group element — so a second marker buys nothing.`,
          `If the extra marker is legitimate because this component renders another component's root, declare the whole set with ${resolveInfo(
            "testOptions['has-group-marker'].markers",
          )} (D16.3).`,
        ],
      }),
    );
  }
}

/**
 * The second pure half of {@link componentHasGroupMarker}, and the machine-checkable form of
 * the DECISIONS.md D15.1 invariant:
 *
 * > The marker must NEVER be the first class token of the emitted class string.
 *
 * jsdom has no native `:scope` and polyfills it through nwsapi, whose `makeref()` synthesises
 * a selector anchor from `escape(element.classList[0])`. The `/` in `group/fui-<kebab>` passes
 * through that escaping intact, so the anchor lands in the selector as an invalid production
 * (observed: `div#a.group,,fui-list-item…`) and the query throws. Every render that evaluates
 * a `:scope` selector under jsdom then fails with a render-time `AggregateError` — which is
 * exactly how react-list's four composite-navigation tests failed.
 *
 * Real browsers implement `:scope` natively, so this is a test-tier-only defect — with a
 * production-shaped blast radius, because consumer apps test under jsdom too. It is also
 * invisible to visual regression, which is why it has to be asserted here.
 *
 * An empty class list passes vacuously: "the component rendered no marker at all" is
 * {@link assertGroupMarkerIsStamped}'s concern, not this one.
 *
 * @internal
 */
export function assertMarkerIsNotLeadingToken(params: {
  displayName: string;
  /** Class names rendered on the outermost slot, in `classList` order. */
  classNames: string[];
  /** Optional rendered DOM, appended to error output. */
  domSnapshot?: string;
}): void {
  const { classNames, displayName, domSnapshot } = params;
  const { resolveInfo, testErrorInfo } = errorMessageColors;

  const leadingToken = classNames[0];

  if (leadingToken === undefined || !MARKER_TOKEN_REGEX.test(leadingToken)) {
    return;
  }

  throw new Error(
    getErrorMessage({
      displayName,
      overview: `renders its group marker as the FIRST class token, which breaks ":scope" selectors under jsdom.`,
      details: [
        `classList[0] is ${testErrorInfo(leadingToken)}.`,
        '',
        `nwsapi (jsdom's ":scope" polyfill) builds its selector anchor from escape(element.classList[0]).`,
        `The "/" survives that escaping, so the anchor is spliced into the selector as an invalid`,
        `production and the query throws an AggregateError at render time.`,
        '',
        ...renderedClassListDetails(classNames, domSnapshot),
      ],
      suggestions: [
        `Move the marker off index 0: pass an unconditional ${resolveInfo(
          'styles.<slot>',
        )} as the FIRST argument to ${resolveInfo('clsx(...)')} and the marker as the second.`,
        `If this slot has no unconditional module class, mint an identity-only ${resolveInfo(
          '.root {}',
        )} local in its module and lead with that (DECISIONS.md D16.2) — do NOT reorder around a conditional class.`,
        `Do not "fix" this by escaping or renaming the marker: its literal form is the public contract (DECISIONS.md D15.8).`,
      ],
    }),
  );
}

/**
 * A conformance test asserting the named-group contract from DECISIONS.md D15.1 / D16.2:
 *
 * 1. The component's outermost slot carries exactly one unhashed `group/fui-<kebab>` marker,
 *    named for the component.
 * 2. That marker is never `classList[0]`.
 *
 * ## Why assertion 2 belongs in the shared suite
 *
 * It fires on every `isConformant()` call site for free, and catches any future reordering
 * regression — including in packages converted after the statics-removal phase, where the
 * hashed `fuicm-*` module class becomes the token that keeps the marker off index 0. The
 * failure it guards is a jsdom-only render-time throw: visual regression cannot see it, and
 * the build cannot see it either.
 *
 * ## Where it runs
 *
 * Registered in `defaultTests` under {@link COMPONENT_HAS_GROUP_MARKER_TEST_NAME}, so it runs
 * on every `isConformant()` call site without opt-in. It moved there with the statics-removal
 * sweep (DECISIONS.md D16.6), at which point the marker became the sole public identity class
 * and every converted component had to carry one.
 *
 * Packages that still publish BEM statics stamp no marker and opt out, normally once per
 * package in `src/testing/isConformant.ts`:
 *
 * ```ts
 * disabledTests: [COMPONENT_HAS_GROUP_MARKER_TEST_NAME],
 * ```
 *
 * Components whose marker is not derivable from `displayName` override it:
 *
 * ```ts
 * testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
 * ```
 *
 * Components that render another package's root carry that component's marker alongside their
 * own and cannot satisfy the "exactly one" half — `testOptions['has-group-marker'].marker`
 * changes the EXPECTED marker, not the permitted count. Those opt out per component and assert
 * the `classList[0]` half locally.
 */
export function componentHasGroupMarker<TProps = {}>(testInfo: IsConformantOptions<TProps>): void {
  const { Component, displayName, renderOptions, requiredProps } = testInfo;
  const expectedMarkers = getExpectedGroupMarkers(testInfo);

  const renderClassNames = (): { classNames: string[]; domSnapshot: string } => {
    const { resolveInfo } = errorMessageColors;

    // Matches `classNameOverridesWin` and the `component-handles-classname` default test:
    // there is no good way to derive the concrete props type from the generic here.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mergedProps: any = { ...requiredProps };

    const result = render(<Component {...mergedProps} />, renderOptions);
    const rootEl = getTargetElement(testInfo, result, 'className');

    if (!rootEl) {
      throw new Error(
        getErrorMessage({
          displayName,
          overview: `did not render an element to check the group marker against.`,
          suggestions: [
            `Make sure the component renders a root element.`,
            `If the class list lives on an element other than the container's first child, provide ${resolveInfo(
              'getTargetElement',
            )} in your isConformant options.`,
          ],
        }),
      );
    }

    return { classNames: classListToStrings(rootEl.classList), domSnapshot: String(prettyDOM(rootEl) || '') };
  };

  it(`stamps its named group marker(s) (${COMPONENT_HAS_GROUP_MARKER_TEST_NAME})`, () => {
    const { classNames, domSnapshot } = renderClassNames();
    assertGroupMarkerIsStamped({ displayName, classNames, expectedMarkers, domSnapshot });
  });

  it(`never emits the marker as classList[0] (${COMPONENT_HAS_GROUP_MARKER_TEST_NAME})`, () => {
    const { classNames, domSnapshot } = renderClassNames();
    assertMarkerIsNotLeadingToken({ displayName, classNames, domSnapshot });
  });
}

function classListToStrings(classList: DOMTokenList): string[] {
  // Mirrors the helper in defaultTests.tsx: spreading a DOMTokenList would require
  // `lib: dom.iterable`, and react-conformance is type-checked with each converged package.
  const result: string[] = [];
  for (let i = 0; i < classList.length; i++) {
    result.push(classList[i]);
  }
  return result;
}
