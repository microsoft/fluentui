import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { ButtonContextProvider } from '../../contexts/ButtonContext';
import type { ButtonContextValue } from '../../contexts/ButtonContext';
import { useMenuButton_unstable } from './useMenuButton';
import { MenuButton } from './MenuButton';

const wrap = (contextValue: ButtonContextValue = {}): React.FC<{ children?: React.ReactNode }> => {
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <ButtonContextProvider value={contextValue}>{children}</ButtonContextProvider>
  );
  return Wrapper;
};

describe('useMenuButton_unstable', () => {
  it('returns the MenuButton components shape including the menuIcon slot', () => {
    const { result } = renderHook(() => useMenuButton_unstable({}, React.createRef()));
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components).toEqual({ root: 'button', icon: 'span', menuIcon: 'span' });
  });

  it('renders a menuIcon slot with a default icon', () => {
    const result = render(<MenuButton />);
    expect(result.container.querySelector('svg')).toBeInTheDocument();
  });

  it('preserves a user-provided menuIcon over the default chevron', () => {
    const customIcon = <span data-testid="custom-menu-icon" />;
    const { result } = renderHook(() =>
      useMenuButton_unstable({ menuIcon: { children: customIcon } }, React.createRef()),
    );
    expect(result.current.menuIcon?.children).toBe(customIcon);
  });

  it('renders the default chevron when menuIcon is explicitly undefined', () => {
    const result = render(<MenuButton menuIcon={undefined} />);
    expect(result.container.querySelector('svg')).toBeInTheDocument();
  });

  it('hides the menuIcon slot when menuIcon is null', () => {
    const { result } = renderHook(() => useMenuButton_unstable({ menuIcon: null }, React.createRef()));
    expect(result.current.menuIcon).toBeUndefined();
  });

  it('defaults aria-expanded to false when not provided', () => {
    const { result } = renderHook(() => useMenuButton_unstable({}, React.createRef()));
    expect(result.current.root['aria-expanded']).toBe(false);
  });

  it('sets iconOnly true when there are no children and false otherwise', () => {
    const { result: iconOnly } = renderHook(() => useMenuButton_unstable({}, React.createRef()));
    expect(iconOnly.current.iconOnly).toBe(true);

    const { result: withChildren } = renderHook(() => useMenuButton_unstable({ children: 'Open' }, React.createRef()));
    expect(withChildren.current.iconOnly).toBe(false);
  });

  it('applies default styling props inherited from Button', () => {
    const { result } = renderHook(() => useMenuButton_unstable({}, React.createRef()));
    expect(result.current.appearance).toBe('secondary');
    expect(result.current.shape).toBe('rounded');
    expect(result.current.size).toBe('medium');
  });

  it('honors explicit appearance, shape and size props', () => {
    const { result } = renderHook(() =>
      useMenuButton_unstable({ appearance: 'primary', shape: 'circular', size: 'large' }, React.createRef()),
    );
    expect(result.current.appearance).toBe('primary');
    expect(result.current.shape).toBe('circular');
    expect(result.current.size).toBe('large');
  });

  it('inherits size from ButtonContext when no size prop is set', () => {
    const { result } = renderHook(() => useMenuButton_unstable({}, React.createRef()), {
      wrapper: wrap({ size: 'small' }),
    });
    expect(result.current.size).toBe('small');
  });
});
