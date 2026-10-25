import * as React from 'react';
import { render } from '@testing-library/react';
import { CounterBadge } from './CounterBadge';

// Inspect the applied hiding rule: jsdom can give reset styles precedence over Griffel's atomic styles.
const hasHidingRule = (element: HTMLElement) =>
  Array.from(element.ownerDocument.querySelectorAll('style'))
    .flatMap(style => Array.from(style.sheet?.cssRules ?? []))
    .filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
    .some(rule => rule.style.display === 'none' && element.matches(rule.selectorText));

describe('CounterBadge rendering', () => {
  it.each([0, 7])('preserves visible numeric zero children when count is %s', count => {
    const { container } = render(<CounterBadge count={count}>{0}</CounterBadge>);
    const badge = container.firstElementChild as HTMLElement;

    expect(badge.textContent).toBe('0');
    expect(hasHidingRule(badge)).toBe(false);
  });

  it('preserves string zero children', () => {
    const { container } = render(<CounterBadge count={7}>{'0'}</CounterBadge>);
    const badge = container.firstElementChild as HTMLElement;

    expect(badge.textContent).toBe('0');
    expect(hasHidingRule(badge)).toBe(false);
  });

  it.each([
    { count: 0, text: '', hidden: true },
    { count: 7, text: '7', hidden: false },
  ])('renders count $count without custom children', ({ count, text, hidden }) => {
    const { container } = render(<CounterBadge count={count} />);
    const badge = container.firstElementChild as HTMLElement;

    expect(badge.textContent).toBe(text);
    expect(hasHidingRule(badge)).toBe(hidden);
  });

  it('shows a zero count when showZero is set', () => {
    const { container } = render(<CounterBadge count={0} showZero />);
    const badge = container.firstElementChild as HTMLElement;

    expect(badge.textContent).toBe('0');
    expect(hasHidingRule(badge)).toBe(false);
  });

  it('renders a visible dot without count text', () => {
    const { container } = render(<CounterBadge count={7} dot />);
    const badge = container.firstElementChild as HTMLElement;

    expect(badge.textContent).toBe('');
    expect(hasHidingRule(badge)).toBe(false);
  });
});
