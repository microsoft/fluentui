import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { NavSubItemGroup } from './NavSubItemGroup';
import { NavCategoryContextValue, NavCategoryProvider } from '../NavCategoryContext';

export function mockNavCategoryContextValue(partialValue?: Partial<NavCategoryContextValue>): NavCategoryContextValue {
  return {
    open: false,
    value: undefined,
    ...partialValue,
  };
}

const Wrapper: React.FC = props => (
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
});
