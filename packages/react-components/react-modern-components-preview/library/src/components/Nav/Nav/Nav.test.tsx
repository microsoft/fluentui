import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Nav, navClassNames } from './';

describe('Nav', () => {
  isConformant({
    Component: Nav,
    displayName: 'Nav',
    disableTypeTests: true,
    disabledTests: ['consistent-callback-args', 'exported-top-level', 'has-top-level-file'],
  });

  it('renders visual defaults and preserves a consumer class', () => {
    const { getByRole } = render(<Nav className="consumer-class" />);
    const nav = getByRole('navigation');

    expect(nav).toHaveAttribute('data-density', 'medium');
    expect(nav).toHaveClass(navClassNames.root, 'consumer-class');
  });

  it('maps density to a data attribute', () => {
    const { getByRole } = render(<Nav density="small" />);

    expect(getByRole('navigation')).toHaveAttribute('data-density', 'small');
  });
});
