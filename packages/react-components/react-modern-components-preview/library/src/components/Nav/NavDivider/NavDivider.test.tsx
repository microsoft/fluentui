import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { NavDivider, navDividerClassNames } from './';

describe('NavDivider', () => {
  isConformant({
    Component: NavDivider,
    displayName: 'NavDivider',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
  });

  it('renders strong divider styling by default', () => {
    const { getByRole } = render(<NavDivider className="consumer-class" />);
    const divider = getByRole('separator');

    expect(divider).toHaveAttribute('data-appearance', 'strong');
    expect(divider).toHaveClass(navDividerClassNames.root, 'consumer-class');
  });
});
