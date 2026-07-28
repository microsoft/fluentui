import * as React from 'react';
import { render } from '@testing-library/react';

import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { AccordionItem } from './AccordionItem';
import { isConformant } from '../../testing/isConformant';

describe('AccordionItem', () => {
  isConformant({
    Component: AccordionItem,
    displayName: 'AccordionItem',
    // Accordion does not have own styles
    disabledTests: ['make-styles-overrides-win'],
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // The hook now composes with clsx instead of mergeClasses; `classname-overrides-win`
    // is the cascade-native replacement for `make-styles-overrides-win` and DOES apply
    // here — the static `fui-AccordionItem` class is a class of the component's own, so
    // the assertion "consumer className is last" is non-vacuous (DECISIONS.md D9).
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  /**
   * Note: see more visual regression tests for AccordionItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<AccordionItem value={0}>Default AccordionItem</AccordionItem>);
    expect(container).toMatchSnapshot();
  });
});
