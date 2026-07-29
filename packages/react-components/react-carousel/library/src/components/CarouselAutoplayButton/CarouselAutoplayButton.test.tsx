import { render } from '@testing-library/react';
import * as React from 'react';

import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { CarouselAutoplayButton } from './CarouselAutoplayButton';
import type { CarouselAutoplayButtonProps } from './CarouselAutoplayButton.types';

describe('CarouselAutoplayButton', () => {
  isConformant({
    Component: CarouselAutoplayButton as React.FunctionComponent<CarouselAutoplayButtonProps>,
    displayName: 'CarouselAutoplayButton',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // Neither this component's styles hook nor @fluentui/react-button's ToggleButton (also
    // converted) calls mergeClasses any more, so `make-styles-overrides-win` has nothing to
    // observe. `classname-overrides-win` is its cascade-native replacement, and — unlike
    // before react-carousel itself converted — it now passes: this hook composes with clsx
    // and keeps `state.root.className`, which already ends with the consumer's, last
    // (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` and its `has-static-classnames` testOptions
    // are gone with the BEM statics: `carouselAutoplayButtonClassNames.root` is now the group
    // marker and the never-applied `icon` key was removed (DECISIONS.md D16.1/D16.5/D16.6).
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    testOptions: {
      // renders react-button's ToggleButton, which is a Button — each of the three hooks
      // stamps its own marker on this one element, so the root legitimately carries all
      // three (DECISIONS.md D16.3). Declaring the whole set keeps `component-has-group-marker`
      // running: it is an exact set comparison, so an undeclared marker still fails, and its
      // `classList[0]` half — the D16.2 invariant that nwsapi's jsdom `:scope` polyfill
      // depends on — is asserted here.
      //
      // `classList[0]` is this hook's own unconditional `styles.root`, which leads its clsx
      // after `useToggleButtonStyles_unstable` has already run.
      'has-group-marker': {
        markers: ['group/fui-button', 'group/fui-toggle-button', 'group/fui-carousel-autoplay-button'],
      },
    },
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<CarouselAutoplayButton />);

    expect(result.container).toMatchSnapshot();
  });

  it("applies 'aria-pressed' when is checked", () => {
    const { getByText } = render(<CarouselAutoplayButton checked>Hello world</CarouselAutoplayButton>);

    expect(getByText('Hello world')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls "onCheckedChange" when clicked', () => {
    const onCheckedChange = jest.fn();
    const { getByText } = render(
      <CarouselAutoplayButton checked onCheckedChange={onCheckedChange}>
        Hello world
      </CarouselAutoplayButton>,
    );

    getByText('Hello world').click();

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'click' }),
      expect.objectContaining({ checked: false }),
    );
  });
});
