import * as React from 'react';
import { render } from '@testing-library/react';

import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { AccordionItem } from './AccordionItem';
import { isConformant } from '../../testing/isConformant';

describe('AccordionItem', () => {
  isConformant({
    Component: AccordionItem,
    displayName: 'AccordionItem',
    disabledTests: [
      // AccordionItem does not have own styles
      'make-styles-overrides-win',
      // Statics removal (DECISIONS.md D16.1 / D16.6) — see Accordion.test.tsx for the full
      // rationale. Replaced by `component-has-group-marker` (now a default test).
      'component-has-static-classnames-object',
    ],
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // The hook now composes with clsx instead of mergeClasses; `classname-overrides-win`
    // is the cascade-native replacement for `make-styles-overrides-win` and DOES apply
    // here — the identity-only `.root` local is a class of the component's own, so the
    // assertion "consumer className is last" is non-vacuous (DECISIONS.md D9).
    //
    // `component-has-group-marker` asserts the D16 public contract: exactly one
    // `group/fui-accordion-item` marker on the outermost slot, and never at `classList[0]`
    // (DECISIONS.md D15.1 / D16.2).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  /**
   * Note: see more visual regression tests for AccordionItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<AccordionItem value={0}>Default AccordionItem</AccordionItem>);
    expect(container).toMatchSnapshot();
  });
});
