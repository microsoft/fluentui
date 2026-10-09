import type * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { isConformant } from '../../testing/isConformant';
import { NavSubItem } from './NavSubItem';
import { navSubItemClassNames, useNavSubItemStyles_unstable } from './useNavSubItemStyles.styles';
import type { NavSubItemProps, NavSubItemState } from './NavSubItem.types';

describe('NavSubItem', () => {
  isConformant({
    Component: NavSubItem as React.FunctionComponent<NavSubItemProps>,
    displayName: 'NavSubItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: { value: 'test-value' },
          expectedClassNames: {
            root: navSubItemClassNames.root,
          },
        },
      ],
    },
  });

  describe('useNavSubItemStyles_unstable', () => {
    const createBaseState = (overrides?: Partial<NavSubItemState>): NavSubItemState => ({
      components: {
        root: 'button',
      },
      root: {
        type: 'button',
      },
      value: 'sub-item',
      selected: false,
      density: 'medium',
      ...overrides,
    });

    it('applies medium density and indicator styles when selected in medium density', () => {
      const state = createBaseState({ selected: true, density: 'medium' });
      const { result } = renderHook(() => useNavSubItemStyles_unstable(state));

      expect(result.current.root.className).toContain(navSubItemClassNames.root);
      expect(result.current.root.className).toBeTruthy();
    });

    it('applies small density styles and small indicator when selected in small density', () => {
      const mediumState = createBaseState({ selected: true, density: 'medium' });
      const smallState = createBaseState({ selected: true, density: 'small' });

      const { result: mediumResult } = renderHook(() => useNavSubItemStyles_unstable(mediumState));
      const { result: smallResult } = renderHook(() => useNavSubItemStyles_unstable(smallState));

      // Small and medium density selected classes must differ (different indicator offsets and padding)
      expect(smallResult.current.root.className).not.toEqual(mediumResult.current.root.className);
      expect(smallResult.current.root.className).toContain(navSubItemClassNames.root);
    });

    it('does not apply indicator styles when not selected', () => {
      const unselectedState = createBaseState({ selected: false, density: 'medium' });
      const selectedState = createBaseState({ selected: true, density: 'medium' });

      const { result: unselectedResult } = renderHook(() => useNavSubItemStyles_unstable(unselectedState));
      const { result: selectedResult } = renderHook(() => useNavSubItemStyles_unstable(selectedState));

      expect(unselectedResult.current.root.className).not.toEqual(selectedResult.current.root.className);
    });
  });
});
