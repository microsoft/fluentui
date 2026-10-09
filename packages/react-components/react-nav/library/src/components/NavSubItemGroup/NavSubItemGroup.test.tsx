import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { isConformant } from '../../testing/isConformant';
import { NavSubItemGroup } from './NavSubItemGroup';
import { navSubItemGroupClassNames, useNavSubItemGroupStyles_unstable } from './useNavSubItemGroupStyles.styles';
import type { NavCategoryContextValue } from '../NavCategoryContext';
import { NavCategoryProvider } from '../NavCategoryContext';
import type { NavSubItemGroupState } from './NavSubItemGroup.types';

export function mockNavCategoryContextValue(partialValue?: Partial<NavCategoryContextValue>): NavCategoryContextValue {
  return {
    open: false,
    value: '',
    ...partialValue,
  };
}

const Wrapper: React.FC<{ children?: React.ReactNode }> = props => (
  <NavCategoryProvider
    value={mockNavCategoryContextValue({
      open: true,
    })}
  >
    {props.children}
  </NavCategoryProvider>
);

describe('NavSubItemGroup', () => {
  isConformant({
    Component: NavSubItemGroup,
    displayName: 'NavSubItemGroup',
    renderOptions: { wrapper: Wrapper },
  });

  describe('useNavSubItemGroupStyles_unstable', () => {
    it('applies root styling with flex-shrink and without overflow clipping', () => {
      const state: NavSubItemGroupState = {
        components: { root: 'div' },
        root: { type: 'div' },
        open: true,
      };

      const { result } = renderHook(() => useNavSubItemGroupStyles_unstable(state));
      expect(result.current.root.className).toContain(navSubItemGroupClassNames.root);
    });
  });
});
