import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Carousel } from './Carousel';

jest.mock('embla-carousel', () => ({
  __esModule: true,
  default: () => ({
    on: jest.fn(),
    off: jest.fn(),
    destroy: jest.fn(),
    slideNodes: jest.fn(),
    slidesInView: jest.fn(),
    scrollTo: jest.fn(),
    reInit: jest.fn(),
    selectedScrollSnap: () => 0,
  }),
}));

describe('Carousel', () => {
  isConformant({
    Component: Carousel,
    displayName: 'Carousel',
    requiredProps: {},
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` /
    // `fui-<Component>__<slot>` format, which the D16 statics-removal sweep retired for
    // converted packages: `carouselClassNames.root` is now the group marker
    // (DECISIONS.md D16.5/D16.6). `component-has-group-marker` — a default test, and no
    // longer disabled by this package's isConformant wrapper — is its replacement: it asserts
    // the marker is stamped AND never lands at `classList[0]`, the machine-checkable form of
    // the D15.1/D16.2 invariant.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Carousel defaultValue={'test'}>Default Carousel</Carousel>);
    expect(result.container).toMatchSnapshot();
  });
});
