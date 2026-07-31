import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { CarouselNavContainer } from './CarouselNavContainer';

describe('CarouselNavContainer', () => {
  isConformant({
    Component: CarouselNavContainer,
    displayName: 'CarouselNavContainer',
    requiredProps: { autoplay: '' },
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` and the `has-static-classnames` testOptions
    // that accompanied it are both gone: they asserted the exact `fui-<Component>` /
    // `fui-<Component>__<slot>` format, and the D16 statics-removal sweep narrowed
    // `carouselNavContainerClassNames` to `{ root }` — the group marker — dropping the
    // `next` / `prev` / `autoplay` keys the old expectation enumerated, plus the three
    // `*Tooltip` keys that were never applied to the DOM at all (DECISIONS.md D16.1/D16.5).
    // `component-has-group-marker` (a default test) replaces the coverage on the root.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselNavContainer autoplay={''}>Default CarouselNavContainer</CarouselNavContainer>);
    expect(result.container).toMatchSnapshot();
  });
});
