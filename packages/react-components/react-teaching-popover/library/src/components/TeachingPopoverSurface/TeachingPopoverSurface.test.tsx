import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverSurface } from './TeachingPopoverSurface';
import type { TeachingPopoverSurfaceProps } from './TeachingPopoverSurface.types';

describe('TeachingPopoverSurface', () => {
  // TeachingPopoverSurface is rendered by a Portal so won't be available in the rendered container
  const testid = 'component';
  // also include an aria-label to prevent warnings in debug mode
  const props = { 'data-testid': testid, 'aria-label': 'test' };

  isConformant({
    Component: TeachingPopoverSurface,
    displayName: 'TeachingPopoverSurface',
    requiredProps: props as TeachingPopoverSurfaceProps,
    getTargetElement: result => result.getByTestId(testid),
    disabledTests: [
      // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
      // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses; this hook now
      // composes with clsx and delegates to react-popover's converted
      // `usePopoverSurfaceStyles_unstable`, so mergeClasses is never called at all.
      // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
      // Arrow slot is optional — and, since D16.1, this package publishes no BEM statics at
      // all, which is the other half of why this test cannot apply.
      'component-has-static-classnames-object',
    ],
    testOptions: {
      // A TeachingPopoverSurface IS a react-popover `PopoverSurface` — its hook returns
      // `usePopoverSurface_unstable(props, ref)` verbatim and
      // `usePopoverSurfaceStyles_unstable` stamps its marker on this same element — so this
      // root legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole
      // set keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-popover-surface', 'group/fui-teaching-popover-surface'],
      },
    },
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverSurface>Default TeachingPopoverSurface</TeachingPopoverSurface>);
    expect(result.container).toMatchSnapshot();
  });
});
