import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import { useToastBody_unstable } from './useToastBody';
import { ToastContainerContextProvider } from '../../contexts/toastContainerContext';
import { BackgroundAppearanceProvider } from '@fluentui/react-shared-contexts';
import type { ToastContainerContextValue } from '../../contexts/toastContainerContext';
import type { BackgroundAppearanceContextValue } from '@fluentui/react-shared-contexts';

const defaultContextValue: ToastContainerContextValue = {
  close: () => null,
  intent: undefined,
  bodyId: 'test-body-id',
  titleId: 'test-title-id',
};

function makeWrapper(
  options: {
    context?: Partial<ToastContainerContextValue>;
    backgroundAppearance?: BackgroundAppearanceContextValue;
  } = {},
) {
  const contextValue = { ...defaultContextValue, ...options.context };
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      BackgroundAppearanceProvider,
      { value: options.backgroundAppearance },
      React.createElement(ToastContainerContextProvider, { value: contextValue }, children),
    );
}

describe('useToastBody_unstable', () => {
  it('returns components shape { root: div, subtitle: div }', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToastBody_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.components).toEqual({ root: 'div', subtitle: 'div' });
  });

  it('always returns a root slot', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToastBody_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.root).toBeDefined();
  });

  it('applies bodyId from context to root.id', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToastBody_unstable({}, ref), {
      wrapper: makeWrapper({ context: { bodyId: 'my-body-id' } }),
    });
    expect(result.current.root.id).toBe('my-body-id');
  });

  it('returns undefined subtitle when subtitle prop is not provided', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToastBody_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.subtitle).toBeUndefined();
  });

  it('returns a subtitle slot when subtitle prop is provided', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToastBody_unstable({ subtitle: 'sub text' }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.subtitle).toBeDefined();
  });

  it('reads backgroundAppearance from BackgroundAppearanceContext — undefined by default', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToastBody_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.backgroundAppearance).toBeUndefined();
  });

  it('reads backgroundAppearance="inverted" from BackgroundAppearanceContext', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToastBody_unstable({}, ref), {
      wrapper: makeWrapper({ backgroundAppearance: 'inverted' }),
    });
    expect(result.current.backgroundAppearance).toBe('inverted');
  });

  it('reads backgroundAppearance="brand" from BackgroundAppearanceContext', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToastBody_unstable({}, ref), {
      wrapper: makeWrapper({ backgroundAppearance: 'brand' }),
    });
    expect(result.current.backgroundAppearance).toBe('brand');
  });

  it('does not derive backgroundAppearance from props (it has no appearance prop)', () => {
    const ref = React.createRef<HTMLElement>();
    // ToastBody has no appearance prop; backgroundAppearance must always come from context
    const { result } = renderHook(() => useToastBody_unstable({}, ref), {
      wrapper: makeWrapper({ backgroundAppearance: 'brand' }),
    });
    expect(result.current.backgroundAppearance).toBe('brand');
  });

  it('spreads extra div props onto the root slot', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToastBody_unstable({ className: 'body-class', 'aria-label': 'body' }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.root.className).toBe('body-class');
    expect(result.current.root['aria-label']).toBe('body');
  });
});
