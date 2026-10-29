import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { registerIcons } from '@fluentui/react';
import { Nav } from './Nav';

describe('docsite Nav', () => {
  const pages = [
    { title: 'Button', url: '#/controls/ios/button' },
    { title: 'Avatar', url: '#/controls/ios/avatar' },
  ];

  beforeAll(() => {
    registerIcons({ icons: { Search: 'search', GroupedList: 'categories' } });
  });

  it('keeps every mobile navigation link in the normal tab order', () => {
    render(
      <Nav pages={pages} isSmallScreen searchablePageTitle="Controls" navigationLabel="Controls section navigation" />,
    );

    expect(screen.getByRole('navigation').getAttribute('aria-label')).toBe('Controls section navigation');
    for (const link of screen.getAllByRole('link')) {
      expect(link.tabIndex).toBe(0);
    }
  });

  it('preserves the existing desktop FocusZone', () => {
    const { container } = render(<Nav pages={pages} navigationLabel="Controls section navigation" />);

    expect(container.querySelector('[data-focuszone-id]')).not.toBeNull();
  });

  it('uses the searchable page title when no navigation label is provided', () => {
    render(<Nav pages={pages} searchablePageTitle="Controls" />);

    expect(screen.getByRole('navigation', { name: 'Controls' })).toBeTruthy();
  });

  it('defaults the navigation label to Pages', () => {
    render(<Nav pages={pages} />);

    expect(screen.getByRole('navigation', { name: 'Pages' })).toBeTruthy();
  });
});
