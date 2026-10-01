import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { NavDrawerHeader, navDrawerHeaderClassNames } from './';

describe('NavDrawerHeader', () => {
  isConformant({
    Component: NavDrawerHeader,
    displayName: 'NavDrawerHeader',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Header' },
  });

  it('renders nav and drawer classes and preserves a consumer class', () => {
    const { getByText } = render(<NavDrawerHeader className="consumer-class">Header</NavDrawerHeader>);

    expect(getByText('Header')).toHaveClass(navDrawerHeaderClassNames.root, 'fui-DrawerHeader', 'consumer-class');
  });
});
