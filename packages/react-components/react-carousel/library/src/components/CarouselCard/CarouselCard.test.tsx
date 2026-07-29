import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { CarouselCard } from './CarouselCard';
import { setTabsterDefault } from '../useEmblaCarousel';
import { getTabsterAttribute } from 'tabster';

describe('CarouselCard', () => {
  isConformant({
    Component: CarouselCard,
    displayName: 'CarouselCard',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last; this component now composes with clsx and
    // never calls mergeClasses. `classname-overrides-win` below is its cascade-native
    // replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` format the
    // D16 statics-removal sweep retired; `carouselCardClassNames.root` is now the group
    // marker (DECISIONS.md D16.5/D16.6) and `component-has-group-marker` (a default test)
    // replaces it.
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselCard>Default CarouselCard</CarouselCard>);
    expect(result.container).toMatchSnapshot();
  });

  it('handles tabster attributes', () => {
    const emptyTabProps = {
      focusable: {},
    };
    const emptyStrAttr = getTabsterAttribute(emptyTabProps, true);
    const isDefaultTabProps = {
      focusable: { isDefault: true },
    };
    const defaultStrAttr = getTabsterAttribute(isDefaultTabProps, true);
    const isNotDefaultTabProps = {
      focusable: { isDefault: false },
    };
    const isNotDefaultStrAttr = getTabsterAttribute(isNotDefaultTabProps, true);

    const result = render(<CarouselCard>Default CarouselCard</CarouselCard>);

    setTabsterDefault(result.container, true);
    // If no tabster present, setTabsterDefault does nothing.
    expect(result.container.hasAttribute('data-tabster')).toBeFalsy();
    result.container.setAttribute('data-tabster', emptyStrAttr);

    const isDefault = render(<CarouselCard {...isDefaultTabProps}>Default CarouselCard</CarouselCard>);
    isDefault.container.setAttribute('data-tabster', defaultStrAttr);
    const isNotDefault = render(<CarouselCard {...isNotDefaultTabProps}>Default CarouselCard</CarouselCard>);
    isNotDefault.container.setAttribute('data-tabster', isNotDefaultStrAttr);

    setTabsterDefault(result.container, true);
    expect(result.container.getAttribute('data-tabster')).toMatch(
      isDefault.container.getAttribute('data-tabster') ?? '',
    );

    setTabsterDefault(result.container, false);
    expect(result.container.getAttribute('data-tabster')).toMatch(
      isNotDefault.container.getAttribute('data-tabster') ?? '',
    );
  });
});
