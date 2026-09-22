import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { NavDrawerBody, navDrawerBodyClassNames } from './';

describe('NavDrawerBody', () => {
  isConformant({
    Component: NavDrawerBody,
    displayName: 'NavDrawerBody',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Body' },
  });

  it('renders nav and drawer classes and preserves a consumer class', () => {
    const { getByRole } = render(<NavDrawerBody className="consumer-class">Body</NavDrawerBody>);

    expect(getByRole('navigation')).toHaveClass(navDrawerBodyClassNames.root, 'fui-DrawerBody', 'consumer-class');
  });
});
