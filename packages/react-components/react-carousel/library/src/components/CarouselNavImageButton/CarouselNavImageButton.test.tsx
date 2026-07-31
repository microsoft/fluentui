import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { CarouselNavImageButton } from './CarouselNavImageButton';
import type { CarouselNavImageButtonProps } from './CarouselNavImageButton.types';

describe('CarouselNavImageButton', () => {
  isConformant({
    Component: CarouselNavImageButton as React.FunctionComponent<CarouselNavImageButtonProps>,
    displayName: 'CarouselNavImageButton',
    requiredProps: {
      image: {
        src: 'test',
      },
    },
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` /
    // `fui-<Component>__<slot>` format the D16 statics-removal sweep retired:
    // `carouselNavImageButtonClassNames.root` is now the group marker and the per-slot
    // `image` key is gone (DECISIONS.md D16.5/D16.6). `component-has-group-marker` (a default
    // test) replaces it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselNavImageButton image={{ src: 'test' }} />);
    expect(result.container).toMatchSnapshot();
  });
});
