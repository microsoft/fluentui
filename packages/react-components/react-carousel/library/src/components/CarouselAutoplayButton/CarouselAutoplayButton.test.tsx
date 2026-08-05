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
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` and its `has-static-classnames` testOptions
    // are gone with the BEM statics: `carouselAutoplayButtonClassNames.root` is now the group
    // marker and the never-applied `icon` key was removed (DECISIONS.md D16.1/D16.5/D16.6).
    disabledTests: ['component-has-static-classnames-object'],
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

  // PR-36513 review item 12: the rest colour slice is gated PER PROPERTY against the
  // configurations in which a later Griffel mergeClasses argument overwrote it.
  // `appearance="outline"` overrides only `background-color` in react-button, so the
  // carousel border/foreground class must survive it; every other non-`secondary`
  // appearance — and checked/disabled in any appearance — overrides all three colour
  // properties and drops both classes. Class names are the deterministic jest CSS-Modules
  // proxy idents (`fuicm-<local>`).
  describe('rest colour gates', () => {
    const restBackground = 'fuicm-rest-background';
    const restStrokeForeground = 'fuicm-rest-stroke-foreground';

    const renderRoot = (props?: CarouselAutoplayButtonProps) => {
      const { getByRole } = render(<CarouselAutoplayButton {...props}>Autoplay</CarouselAutoplayButton>);
      return getByRole('button');
    };

    it('applies both rest colour classes for the default (secondary) appearance', () => {
      const root = renderRoot();

      expect(root.classList.contains(restBackground)).toBe(true);
      expect(root.classList.contains(restStrokeForeground)).toBe(true);
    });

    it('keeps border/foreground but cedes background for appearance="outline"', () => {
      const root = renderRoot({ appearance: 'outline' });

      expect(root.classList.contains(restBackground)).toBe(false);
      expect(root.classList.contains(restStrokeForeground)).toBe(true);
    });

    it.each(['primary', 'subtle', 'transparent'] as const)('drops both classes for appearance="%s"', appearance => {
      const root = renderRoot({ appearance });

      expect(root.classList.contains(restBackground)).toBe(false);
      expect(root.classList.contains(restStrokeForeground)).toBe(false);
    });

    it.each([
      ['checked', { checked: true } as CarouselAutoplayButtonProps],
      ['disabled', { disabled: true } as CarouselAutoplayButtonProps],
      ['outline + checked', { appearance: 'outline', checked: true } as CarouselAutoplayButtonProps],
    ])('drops both classes when %s', (_name, props) => {
      const root = renderRoot(props);

      expect(root.classList.contains(restBackground)).toBe(false);
      expect(root.classList.contains(restStrokeForeground)).toBe(false);
    });
  });
});
