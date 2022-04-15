import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useToggleState } from './useToggleState';
import type { ToggleProps } from './useToggleState';

const ButtonWithToggle = (props: ToggleProps) => {
  const toggleState = useToggleState(props);
  return <button {...toggleState}>Button</button>;
};

describe('useToggleState', () => {
  it('defaults to unchecked', () => {
    const { getByRole } = render(<ButtonWithToggle />);
    const button = getByRole('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-pressed')).toBe('false');
  });

  it('respects defaultChecked prop', () => {
    const { getByRole } = render(<ButtonWithToggle defaultChecked />);
    const button = getByRole('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('respects checked prop', () => {
    const { getByRole } = render(<ButtonWithToggle checked />);
    const button = getByRole('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('uses aria-checked instead of aria-pressed if role checkbox is passed in', () => {
    const { getByRole } = render(<ButtonWithToggle checked role="checkbox" />);
    const button = getByRole('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(button.getAttribute('aria-pressed')).toBe(null);
  });

  it('uses aria-checked instead of aria-pressed if role menuitemcheckbox is passed in', () => {
    const { getByRole } = render(<ButtonWithToggle checked role="menuitemcheckbox" />);
    const button = getByRole('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(button.getAttribute('aria-pressed')).toBe(null);
  });

  it('ignores defaultChecked updates', () => {
    const { getByRole, rerender } = render(<ButtonWithToggle defaultChecked />);
    const button = getByRole('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-pressed')).toBe('true');
    rerender(<ButtonWithToggle defaultChecked={false} />);
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('respects checked updates', () => {
    const { getByRole, rerender } = render(<ButtonWithToggle checked />);
    const button = getByRole('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-pressed')).toBe('true');
    rerender(<ButtonWithToggle checked={false} />);
    expect(button.getAttribute('aria-pressed')).toBe('false');
  });

  it('triggers a change in the checked state if it is uncontrolled', () => {
    const { getAllByRole } = render(
      <>
        <ButtonWithToggle defaultChecked={false} />
        <ButtonWithToggle defaultChecked={true} />
      </>,
    );
    const [initiallyUnchecked, initiallyChecked] = getAllByRole('button') as HTMLButtonElement[];

    expect(initiallyUnchecked.getAttribute('aria-pressed')).toBe('false');
    userEvent.click(initiallyUnchecked);
    expect(initiallyUnchecked.getAttribute('aria-pressed')).toBe('true');
    userEvent.click(initiallyUnchecked);
    expect(initiallyUnchecked.getAttribute('aria-pressed')).toBe('false');

    expect(initiallyChecked.getAttribute('aria-pressed')).toBe('true');
    userEvent.click(initiallyChecked);
    expect(initiallyChecked.getAttribute('aria-pressed')).toBe('false');
    userEvent.click(initiallyChecked);
    expect(initiallyChecked.getAttribute('aria-pressed')).toBe('true');
  });

  it('does not trigger a change in the checked state if it is controlled', () => {
    const { getAllByRole } = render(
      <>
        <ButtonWithToggle checked={false} />
        <ButtonWithToggle checked={true} />
      </>,
    );
    const [unchecked, checked] = getAllByRole('button') as HTMLButtonElement[];

    expect(unchecked.getAttribute('aria-pressed')).toBe('false');
    userEvent.click(unchecked);
    expect(unchecked.getAttribute('aria-pressed')).toBe('false');

    expect(checked.getAttribute('aria-pressed')).toBe('true');
    userEvent.click(checked);
    expect(checked.getAttribute('aria-pressed')).toBe('true');
  });

  it('does not trigger a change in the checked state if it is disabled', () => {
    const { getAllByRole } = render(
      <>
        <ButtonWithToggle defaultChecked={false} disabled />
        <ButtonWithToggle defaultChecked={true} disabled />
      </>,
    );
    const [unchecked, checked] = getAllByRole('button') as HTMLButtonElement[];

    expect(unchecked.getAttribute('aria-pressed')).toBe('false');
    userEvent.click(unchecked);
    expect(unchecked.getAttribute('aria-pressed')).toBe('false');

    expect(checked.getAttribute('aria-pressed')).toBe('true');
    userEvent.click(checked);
    expect(checked.getAttribute('aria-pressed')).toBe('true');
  });

  it('does not trigger a change in the checked state if it is disabledFocusable', () => {
    const { getAllByRole } = render(
      <>
        <ButtonWithToggle defaultChecked={false} disabledFocusable />
        <ButtonWithToggle defaultChecked={true} disabledFocusable />
      </>,
    );
    const [unchecked, checked] = getAllByRole('button') as HTMLButtonElement[];

    expect(unchecked.getAttribute('aria-pressed')).toBe('false');
    userEvent.click(unchecked);
    expect(unchecked.getAttribute('aria-pressed')).toBe('false');

    expect(checked.getAttribute('aria-pressed')).toBe('true');
    userEvent.click(checked);
    expect(checked.getAttribute('aria-pressed')).toBe('true');
  });
});
