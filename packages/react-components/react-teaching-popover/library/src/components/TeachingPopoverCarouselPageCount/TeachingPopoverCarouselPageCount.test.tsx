import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselPageCount } from './TeachingPopoverCarouselPageCount';

describe('TeachingPopoverCarouselPageCount', () => {
  isConformant({
    Component: TeachingPopoverCarouselPageCount,
    displayName: 'TeachingPopoverCarouselPageCount',
    requiredProps: {
      children: (currentPage, totalPages) => <div>{`${currentPage} of ${totalPages}`}</div>,
    },
    // Griffel → Tailwind + CSS Modules migration — same rationale as TeachingPopoverBody's
    // wrapper: `make-styles-overrides-win` can no longer observe a clsx-composed component,
    // `classname-overrides-win` is its cascade-native replacement (DECISIONS.md D9), and the
    // BEM statics this package published are gone (D16.1).
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarouselPageCount>
        {(currentPage, totalPages) => <div>{`${currentPage} of ${totalPages}`}</div>}
      </TeachingPopoverCarouselPageCount>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
