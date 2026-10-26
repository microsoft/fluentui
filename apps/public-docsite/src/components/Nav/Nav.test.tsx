import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Nav } from './Nav';

describe('docsite Nav', () => {
  const pages = [
    { title: 'Button', url: '#/controls/ios/button' },
    { title: 'Avatar', url: '#/controls/ios/avatar' },
  ];

  it('keeps every mobile navigation link in the normal tab order', () => {
    render(<Nav pages={pages} isSmallScreen navigationLabel="Controls section navigation" />);

    expect(screen.getByRole('navigation').getAttribute('aria-label')).toBe('Controls section navigation');
    for (const link of screen.getAllByRole('link')) {
      expect(link.tabIndex).toBe(0);
    }
  });

  it('preserves the existing desktop FocusZone', () => {
    const { container } = render(<Nav pages={pages} navigationLabel="Controls section navigation" />);

    expect(container.querySelector('[data-focuszone-id]')).not.toBeNull();
  });
});
