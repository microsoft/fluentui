import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { inputClassNames } from '../Input/useInputStyles.styles';
import { SearchBox } from './SearchBox';
import { searchBoxClassNames } from './useSearchBoxStyles.styles';

expect.extend(toHaveNoViolations);

describe('SearchBox', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<SearchBox aria-label="Search" />);

    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders default visual state and composes Input class names', () => {
    const { getByRole } = render(<SearchBox aria-label="Search" />);
    const input = getByRole('searchbox');
    const root = input.parentElement;

    expect(root).toHaveAttribute('data-appearance', 'outline');
    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveClass(searchBoxClassNames.root, inputClassNames.root);
    expect(input).toHaveClass(searchBoxClassNames.input, inputClassNames.input);
    expect(root?.firstElementChild).toHaveClass(searchBoxClassNames.contentBefore, inputClassNames.contentBefore);
    expect(getByRole('button', { name: 'clear' })).toHaveClass(searchBoxClassNames.dismiss);
  });

  it('maps visual props and focus state to data attributes', () => {
    const { getByRole } = render(<SearchBox aria-label="Search" appearance="filled-lighter-shadow" size="large" />);
    const input = getByRole('searchbox');
    const root = input.parentElement;

    expect(root).toHaveAttribute('data-appearance', 'filled-lighter-shadow');
    expect(root).toHaveAttribute('data-size', 'large');
    expect(root).not.toHaveAttribute('data-focused');

    fireEvent.focus(input);
    expect(root).toHaveAttribute('data-focused', '');
  });

  it('preserves consumer class names', () => {
    const { getByRole } = render(
      <SearchBox aria-label="Search" className="custom-root" input={{ className: 'custom-input' }} />,
    );
    const input = getByRole('searchbox');

    expect(input.parentElement).toHaveClass('custom-root');
    expect(input).toHaveClass('custom-input');
  });
});
