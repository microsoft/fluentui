import * as React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { CardBaseProps, CardState } from './Card.types';
import { useCardBase_unstable } from './useCard';
import { renderCard_unstable } from './renderCard';
import { useCardContextValue } from './useCardContextValue';

/**
 * Minimal styled wrapper that composes `useCardBase_unstable` exactly as a real
 * styled hook would: call the base hook, add design defaults, then render.
 */
const TestCard = React.forwardRef<HTMLDivElement, CardBaseProps>((props, ref) => {
  const baseState = useCardBase_unstable(props, ref);

  // Augment with design defaults to satisfy CardState for the renderer
  const state = Object.assign(baseState, {
    appearance: 'filled',
    orientation: 'vertical',
    size: 'medium',
  }) as CardState;

  const cardContextValue = useCardContextValue(state);
  return renderCard_unstable(state, cardContextValue);
});

describe('useCardBase_unstable', () => {
  // ── Slot structure ────────────────────────────────────────────────────

  it('renders a div with role="group"', () => {
    const { getByRole } = render(<TestCard>Content</TestCard>);
    expect(getByRole('group')).toBeInTheDocument();
  });

  it('does not render checkbox or floatingAction by default', () => {
    const { container } = render(<TestCard>Content</TestCard>);
    expect(container.querySelector('input[type="checkbox"]')).toBeNull();
    expect(container.querySelector('.fui-Card__floatingAction')).toBeNull();
  });

  // ── disabled ──────────────────────────────────────────────────────────

  it('sets aria-disabled on the root when disabled', () => {
    const { getByRole } = render(<TestCard disabled>Content</TestCard>);
    expect(getByRole('group')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not fire onClick when disabled', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <TestCard disabled onClick={onClick}>
        Content
      </TestCard>,
    );
    fireEvent.click(getByRole('group'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not add tabindex when disabled', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <TestCard disabled onClick={onClick}>
        <button>inner</button>
      </TestCard>,
    );
    expect(getByRole('group').getAttribute('tabindex')).toBeNull();
  });

  // ── focusMode / interactive ───────────────────────────────────────────

  it('does not add tabindex for non-interactive card (no event handlers)', () => {
    const { getByTestId } = render(
      <TestCard data-testid="card">
        <button>inner</button>
      </TestCard>,
    );
    expect(getByTestId('card').getAttribute('tabindex')).toBeNull();
  });

  it('adds tabindex=0 for interactive card (onClick present)', () => {
    const { getByTestId } = render(
      <TestCard data-testid="card" onClick={jest.fn()}>
        <button>inner</button>
      </TestCard>,
    );
    userEvent.tab();
    expect(getByTestId('card').getAttribute('tabindex')).toEqual('0');
  });

  it('overrides default focusMode when explicitly set to "off"', () => {
    const { getByTestId } = render(
      <TestCard data-testid="card" onClick={jest.fn()} focusMode="off">
        <button>inner</button>
      </TestCard>,
    );
    expect(getByTestId('card').getAttribute('tabindex')).toBeNull();
  });

  // ── selectable ────────────────────────────────────────────────────────

  it('renders a checkbox when onSelectionChange is provided', () => {
    const { getByRole } = render(
      <TestCard onSelectionChange={jest.fn()}>Content</TestCard>,
    );
    expect(getByRole('checkbox')).toBeInTheDocument();
  });

  it('toggles selection on click', () => {
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <TestCard defaultSelected={false} onSelectionChange={onSelectionChange}>
        Content
      </TestCard>,
    );
    fireEvent.click(getByRole('group'));
    expect(onSelectionChange).toHaveBeenCalledWith(expect.anything(), { selected: true });
  });

  it('does not toggle selection when disabled', () => {
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <TestCard disabled defaultSelected={false} onSelectionChange={onSelectionChange}>
        Content
      </TestCard>,
    );
    fireEvent.click(getByRole('group'));
    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it('disables checkbox when card is disabled', () => {
    const { getByRole } = render(
      <TestCard disabled selected={false} onSelectionChange={jest.fn()}>
        Content
      </TestCard>,
    );
    expect(getByRole('checkbox')).toHaveAttribute('disabled');
  });

  // ── refs ──────────────────────────────────────────────────────────────

  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TestCard ref={ref}>Content</TestCard>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
