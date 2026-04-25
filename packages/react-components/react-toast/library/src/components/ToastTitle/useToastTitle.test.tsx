import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { CheckmarkCircleFilled, DiamondDismissFilled, InfoFilled, WarningFilled } from '@fluentui/react-icons';
import { useToastTitle_unstable } from './useToastTitle';
import { ToastContainerContextProvider } from '../../contexts/toastContainerContext';
import { BackgroundAppearanceProvider } from '@fluentui/react-shared-contexts';
import type { ToastContainerContextValue } from '../../contexts/toastContainerContext';
import type { BackgroundAppearanceContextValue } from '@fluentui/react-shared-contexts';
import type { ToastIntent } from '../../state/types';

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

describe('useToastTitle_unstable', () => {
  describe('components and slots', () => {
    it('returns components shape { root: div, media: div, action: div }', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), { wrapper: makeWrapper() });
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components).toEqual({ root: 'div', media: 'div', action: 'div' });
    });

    it('always returns a root slot', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), { wrapper: makeWrapper() });
      expect(result.current.root).toBeDefined();
    });

    it('returns undefined action when action prop is not provided', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), { wrapper: makeWrapper() });
      expect(result.current.action).toBeUndefined();
    });

    it('returns an action slot when action prop is provided', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({ action: 'Dismiss' }, ref), {
        wrapper: makeWrapper(),
      });
      expect(result.current.action).toBeDefined();
    });
  });

  describe('root slot', () => {
    it('applies titleId from context to root.id', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), {
        wrapper: makeWrapper({ context: { titleId: 'my-title-id' } }),
      });
      expect(result.current.root.id).toBe('my-title-id');
    });

    it('spreads extra div props onto the root slot', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(
        () => useToastTitle_unstable({ className: 'title-class', 'aria-label': 'title' }, ref),
        { wrapper: makeWrapper() },
      );
      expect(result.current.root.className).toBe('title-class');
      expect(result.current.root['aria-label']).toBe('title');
    });
  });

  describe('backgroundAppearance', () => {
    it('is undefined by default', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), { wrapper: makeWrapper() });
      expect(result.current.backgroundAppearance).toBeUndefined();
    });

    it('reads "inverted" from BackgroundAppearanceContext', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), {
        wrapper: makeWrapper({ backgroundAppearance: 'inverted' }),
      });
      expect(result.current.backgroundAppearance).toBe('inverted');
    });

    it('reads "brand" from BackgroundAppearanceContext', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), {
        wrapper: makeWrapper({ backgroundAppearance: 'brand' }),
      });
      expect(result.current.backgroundAppearance).toBe('brand');
    });
  });

  describe('intent', () => {
    it('reads intent from ToastContainerContext', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), {
        wrapper: makeWrapper({ context: { intent: 'success' } }),
      });
      expect(result.current.intent).toBe('success');
    });

    it('intent is undefined when context does not provide one', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), {
        wrapper: makeWrapper({ context: { intent: undefined } }),
      });
      expect(result.current.intent).toBeUndefined();
    });
  });

  describe('media slot — default icon injection by intent', () => {
    it('media is undefined when no intent and no media prop', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), {
        wrapper: makeWrapper({ context: { intent: undefined } }),
      });
      expect(result.current.media).toBeUndefined();
    });

    it.each([
      ['success', CheckmarkCircleFilled],
      ['error', DiamondDismissFilled],
      ['warning', WarningFilled],
      ['info', InfoFilled],
    ] as [ToastIntent, React.ElementType][])('injects default icon for intent="%s"', (intent, ExpectedIcon) => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), {
        wrapper: makeWrapper({ context: { intent } }),
      });

      expect(result.current.media).toBeDefined();
      const children = result.current.media?.children as React.ReactElement | undefined;
      expect(children).toBeDefined();
      expect((children as React.ReactElement).type).toBe(ExpectedIcon);
    });

    it('renders media slot (without default icon) when intent is set but media has explicit children', () => {
      const ref = React.createRef<HTMLElement>();
      const customIcon = React.createElement('span', { 'data-testid': 'custom-icon' });
      const { result } = renderHook(() => useToastTitle_unstable({ media: { children: customIcon } }, ref), {
        wrapper: makeWrapper({ context: { intent: 'success' } }),
      });

      expect(result.current.media).toBeDefined();
      const children = result.current.media?.children as React.ReactElement;
      // User's children must take precedence over the default icon
      expect(children).toBe(customIcon);
      expect(children.type).not.toBe(CheckmarkCircleFilled);
    });

    it('media is defined (renderByDefault) when intent is set even without media prop', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({}, ref), {
        wrapper: makeWrapper({ context: { intent: 'info' } }),
      });
      // renderByDefault: !!intent → media must exist
      expect(result.current.media).toBeDefined();
    });

    it('media children are still the default icon when media prop is provided without children and intent is set', () => {
      const ref = React.createRef<HTMLElement>();
      const { result } = renderHook(() => useToastTitle_unstable({ media: {} }, ref), {
        wrapper: makeWrapper({ context: { intent: 'warning' } }),
      });

      expect(result.current.media).toBeDefined();
      const children = result.current.media?.children as React.ReactElement | undefined;
      expect(children).toBeDefined();
      expect((children as React.ReactElement).type).toBe(WarningFilled);
    });
  });
});
