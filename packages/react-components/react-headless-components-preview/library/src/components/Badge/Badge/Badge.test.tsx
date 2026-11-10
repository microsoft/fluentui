import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Badge } from '.';

describe('Badge', () => {
  isConformant({
    Component: Badge,
    displayName: 'Badge',
  });

  it('renders a default state', () => {
    const { getByText } = render(<Badge>Default Badge</Badge>);

    expect(getByText('Default Badge')).toBeInTheDocument();
  });

  it('renders with data-icon-position when icon is provided', () => {
    const { container } = render(<Badge icon={<span>★</span>}>With Icon</Badge>);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-icon-position', 'before');
  });

  it('does not render data-icon-position without icon', () => {
    const { container } = render(<Badge>No Icon</Badge>);
    const root = container.firstElementChild!;

    expect(root).not.toHaveAttribute('data-icon-position');
  });

  it.each<[string, React.ReactNode]>([
    ['undefined', undefined],
    ['null', null],
    ['conditional false', false],
    ['empty string', ''],
    ['empty array', []],
    ['nested empty arrays', [[], [[]]]],
    ['nested empty children', [false, ['', null, undefined, []]]],
  ])('emits data-icon-only with %s children', (_name, children) => {
    const { container } = render(<Badge icon="Icon">{children}</Badge>);

    expect(container.firstElementChild).toHaveAttribute('data-icon-only');
  });

  it.each<[string, React.ReactNode, string]>([
    ['numeric zero', 0, '0'],
    ['text', 'Text', 'Text'],
    ['nested numeric zero', [false, ['', [0]]], '0'],
    ['nested text', [false, ['', ['Text']]], 'Text'],
  ])('does not emit data-icon-only with %s children', (_name, children, expectedText) => {
    const { container } = render(<Badge icon="Icon">{children}</Badge>);

    expect(container.firstElementChild).not.toHaveAttribute('data-icon-only');
    expect(container.firstElementChild).toHaveTextContent(expectedText);
  });

  it('does not emit data-icon-only without an icon', () => {
    const { container } = render(<Badge />);

    expect(container.firstElementChild).not.toHaveAttribute('data-icon-only');
  });
});
