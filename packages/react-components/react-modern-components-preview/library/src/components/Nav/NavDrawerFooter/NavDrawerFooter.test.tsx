import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { NavDrawerFooter, navDrawerFooterClassNames } from './';

describe('NavDrawerFooter', () => {
  isConformant({
    Component: NavDrawerFooter,
    displayName: 'NavDrawerFooter',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Footer' },
  });

  it('renders nav and drawer classes and preserves a consumer class', () => {
    const { getByText } = render(<NavDrawerFooter className="consumer-class">Footer</NavDrawerFooter>);

    expect(getByText('Footer')).toHaveClass(navDrawerFooterClassNames.root, 'fui-DrawerFooter', 'consumer-class');
  });
});
