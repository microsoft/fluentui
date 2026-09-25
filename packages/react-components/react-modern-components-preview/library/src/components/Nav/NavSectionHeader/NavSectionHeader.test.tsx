import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { NavSectionHeader, navSectionHeaderClassNames } from './';

describe('NavSectionHeader', () => {
  isConformant({
    Component: NavSectionHeader,
    displayName: 'NavSectionHeader',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Section' },
  });

  it('renders stable styling and preserves a consumer class', () => {
    const { getByRole } = render(<NavSectionHeader className="consumer-class">Section</NavSectionHeader>);

    expect(getByRole('heading', { name: 'Section' })).toHaveClass(navSectionHeaderClassNames.root, 'consumer-class');
  });
});
