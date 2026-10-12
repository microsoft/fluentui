import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Link } from './Link';

describe('Link', () => {
  isConformant({
    Component: Link,
    displayName: 'Link',
  });

  it('renders as a button when no href is provided', () => {
    const { getByRole } = render(<Link>Default Link</Link>);
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Default Link');
  });

  it('renders as an anchor when href is provided', () => {
    const { getByRole } = render(<Link href="https://example.com">Anchor Link</Link>);
    const link = getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveTextContent('Anchor Link');
  });

  it('renders with data-disabled when disabled', () => {
    const { container } = render(<Link disabled>Disabled Link</Link>);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
  });

  it('renders with data-disabled-focusable when disabledFocusable', () => {
    const { container } = render(<Link disabledFocusable>Disabled Focusable Link</Link>);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
    expect(root).toHaveAttribute('data-disabled-focusable');
  });
});
