import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselFooter } from './TeachingPopoverCarouselFooter';

describe('TeachingPopoverCarouselFooter', () => {
  isConformant({
    Component: TeachingPopoverCarouselFooter,
    displayName: 'TeachingPopoverCarouselFooter',
    requiredProps: {
      next: 'Next',
      previous: 'Previous',
      initialStepText: 'Close',
      finalStepText: 'Finish',
    },
    // Griffel → Tailwind + CSS Modules migration — same rationale as TeachingPopoverBody's
    // wrapper: `make-styles-overrides-win` can no longer observe a clsx-composed component,
    // `classname-overrides-win` is its cascade-native replacement (DECISIONS.md D9), and the
    // BEM statics this package published are gone (D16.1) — including the `__previous` /
    // `__next` slot statics, which were the ONLY thing this hook wrote to those two slots.
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
        Default TeachingPopoverCarouselFooter
      </TeachingPopoverCarouselFooter>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
