import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CompoundButtonBaseProps } from './CompoundButton.types';
import { renderCompoundButton_unstable } from './renderCompoundButton';
import { useCompoundButtonBase_unstable } from './useCompoundButton';

const TestCompoundButtonBase: ForwardRefComponent<CompoundButtonBaseProps> = React.forwardRef((props, ref) => {
  const state = useCompoundButtonBase_unstable(props, ref);

  return renderCompoundButton_unstable(state);
});

describe('useCompoundButtonBase_unstable', () => {
  it('uses a button root with type button by default', () => {
    const { getByRole } = render(<TestCompoundButtonBase />);

    expect(getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('supports anchor polymorphism and href', () => {
    const { getByRole } = render(<TestCompoundButtonBase as="a" href="#compound-button" />);

    expect(getByRole('link')).toHaveAttribute('href', '#compound-button');
  });

  it('returns disabled and disabledFocusable state', () => {
    const { result } = renderHook(() =>
      useCompoundButtonBase_unstable({ disabled: true, disabledFocusable: true }, React.createRef()),
    );

    expect(result.current.disabled).toBe(true);
    expect(result.current.disabledFocusable).toBe(true);
  });

  it.each(['before', 'after'] as const)('supports %s icon position', iconPosition => {
    const { result } = renderHook(() => useCompoundButtonBase_unstable({ iconPosition }, React.createRef()));

    expect(result.current.iconPosition).toBe(iconPosition);
  });

  it('creates and normalizes content slots', () => {
    const { result } = renderHook(() =>
      useCompoundButtonBase_unstable(
        {
          contentContainer: { className: 'content-container' },
          secondaryContent: { children: 'Secondary', className: 'secondary-content' },
        },
        React.createRef(),
      ),
    );

    expect(result.current.contentContainer).toMatchObject({ className: 'content-container' });
    expect(result.current.secondaryContent).toMatchObject({
      children: 'Secondary',
      className: 'secondary-content',
    });
  });

  it('sets iconOnly false when secondary content has children without primary children', () => {
    const { result } = renderHook(() =>
      useCompoundButtonBase_unstable({ icon: <span />, secondaryContent: 'Secondary' }, React.createRef()),
    );

    expect(result.current.iconOnly).toBe(false);
  });

  it('sets iconOnly true only when an icon has no primary or secondary children', () => {
    const { result } = renderHook(() => useCompoundButtonBase_unstable({ icon: <span /> }, React.createRef()));

    expect(result.current.iconOnly).toBe(true);
  });

  it('keeps iconOnly true when the secondary content slot is empty', () => {
    const { result } = renderHook(() =>
      useCompoundButtonBase_unstable({ icon: <span />, secondaryContent: {} }, React.createRef()),
    );

    expect(result.current.secondaryContent).toBeDefined();
    expect(result.current.secondaryContent?.children).toBeUndefined();
    expect(result.current.iconOnly).toBe(true);
  });

  it('sets iconOnly false when the icon slot is empty', () => {
    const { result } = renderHook(() => useCompoundButtonBase_unstable({ icon: {} }, React.createRef()));

    expect(result.current.icon).toBeDefined();
    expect(result.current.icon?.children).toBeUndefined();
    expect(result.current.iconOnly).toBe(false);
  });

  it('places the provided ref on the root slot', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useCompoundButtonBase_unstable({}, ref));

    expect(result.current.root.ref).toBe(ref);
  });

  it('does not include visual fields in base state', () => {
    const { result } = renderHook(() => useCompoundButtonBase_unstable({}, React.createRef()));

    expect(result.current).not.toHaveProperty('appearance');
    expect(result.current).not.toHaveProperty('shape');
    expect(result.current).not.toHaveProperty('size');
  });
});
