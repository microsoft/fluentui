import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import { useToast_unstable } from './useToast';
import { ToastContainerContextProvider } from '../../contexts/toastContainerContext';
import type { ToastContainerContextValue } from '../../contexts/toastContainerContext';

const defaultContextValue: ToastContainerContextValue = {
  close: () => null,
  intent: undefined,
  bodyId: 'body-id',
  titleId: 'title-id',
};

function makeWrapper(contextValue: Partial<ToastContainerContextValue> = {}) {
  const value = { ...defaultContextValue, ...contextValue };
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(ToastContainerContextProvider, { value }, children);
}

describe('useToast_unstable', () => {
  it('returns components shape { root: div }', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToast_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.components).toEqual({ root: 'div' });
  });

  it('always returns a root slot', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToast_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.root).toBeDefined();
  });

  it('sets backgroundAppearance to undefined when appearance prop is omitted', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToast_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.backgroundAppearance).toBeUndefined();
  });

  it('sets backgroundAppearance to "inverted" when appearance="inverted"', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToast_unstable({ appearance: 'inverted' }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.backgroundAppearance).toBe('inverted');
  });

  it('sets backgroundAppearance to "brand" when appearance="brand"', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToast_unstable({ appearance: 'brand' }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.backgroundAppearance).toBe('brand');
  });

  it('reads intent from ToastContainerContext', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToast_unstable({}, ref), {
      wrapper: makeWrapper({ intent: 'success' }),
    });
    expect(result.current.intent).toBe('success');
  });

  it('intent is undefined when context does not provide one', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToast_unstable({}, ref), {
      wrapper: makeWrapper({ intent: undefined }),
    });
    expect(result.current.intent).toBeUndefined();
  });

  it('spreads extra div props onto the root slot', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useToast_unstable({ className: 'custom-class', 'aria-label': 'toast' }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.root.className).toBe('custom-class');
    expect(result.current.root['aria-label']).toBe('toast');
  });
});
