import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavSubItemGroup } from './NavSubItemGroup';
import { navSubItemGroupClassNames } from './useNavSubItemGroupStyles.styles';
import type { NavCategoryContextValue } from '../NavCategoryContext';
import { NavCategoryProvider } from '../NavCategoryContext';

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

  it('does not apply overflow clipping or translateZ transform to root', () => {
    const { container } = render(
      <NavSubItemGroup>
        <span>child</span>
      </NavSubItemGroup>,
      { wrapper: Wrapper },
    );
    const root = container.querySelector<HTMLElement>(`.${navSubItemGroupClassNames.root}`)!;
    const view = root.ownerDocument.defaultView!;
    const computedStyle = view.getComputedStyle(root);

    expect(computedStyle.overflow).not.toBe('hidden');
    expect(computedStyle.transform).not.toBe('translateZ(0)');
  });
});
