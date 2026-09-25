import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Link, LinkContextProvider, linkClassNames } from './';

describe('Link', () => {
  it('renders as a button with default visual state', () => {
    render(<Link>Default link</Link>);

    const link = screen.getByRole('button');
    expect(link).toHaveAttribute('data-appearance', 'default');
    expect(link).toHaveAttribute('data-as', 'button');
    expect(link).toHaveClass(linkClassNames.root);
  });

  it('renders as an anchor and preserves the consumer class name', () => {
    render(
      <Link className="custom-link" href="https://example.com" appearance="subtle">
        Anchor link
      </Link>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('data-as', 'a');
    expect(link).toHaveAttribute('data-href');
    expect(link).toHaveAttribute('data-appearance', 'subtle');
    expect(link).toHaveClass(linkClassNames.root, 'custom-link');
  });

  it('inherits inline styling from LinkContext', () => {
    render(
      <LinkContextProvider value={{ inline: true }}>
        <Link>Inline link</Link>
      </LinkContextProvider>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('data-inline');
  });

  it('preserves disabled headless behavior', () => {
    const onClick = jest.fn();
    render(
      <Link disabled onClick={onClick}>
        Disabled link
      </Link>,
    );

    const link = screen.getByRole('button');
    fireEvent.click(link);

    expect(link).toBeDisabled();
    expect(link).toHaveAttribute('data-disabled');
    expect(onClick).not.toHaveBeenCalled();
  });
});
