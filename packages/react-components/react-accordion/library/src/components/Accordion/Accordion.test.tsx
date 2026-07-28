import * as React from 'react';
import { render } from '@testing-library/react';

import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  isConformant({
    Component: Accordion,
    displayName: 'Accordion',
    // Accordion does not have own styles
    disabledTests: ['make-styles-overrides-win', 'consistent-callback-args'],
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // The hook now composes with clsx instead of mergeClasses; `classname-overrides-win`
    // is the cascade-native replacement for `make-styles-overrides-win` and DOES apply
    // here — the static `fui-Accordion` class is a class of the component's own, so the
    // assertion "consumer className is last" is non-vacuous (DECISIONS.md D9).
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  /**
   * Note: see more visual regression tests for Accordion in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<Accordion>Default Accordion</Accordion>);
    expect(container).toMatchSnapshot();
  });
});
