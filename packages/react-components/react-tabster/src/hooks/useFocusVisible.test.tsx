import { Provider_unstable } from '@fluentui/react-shared-contexts';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

jest.mock('../focus/focusVisiblePolyfill', () => ({ applyFocusVisiblePolyfill: jest.fn() }));

import { applyFocusVisiblePolyfill } from '../focus/focusVisiblePolyfill';
import { useFocusVisible } from './useFocusVisible';

describe('useFocusVisible', () => {
  describe('targetWindow', () => {
    it('uses a window from context by default', () => {
      const Wrapper: React.FC<{ targetDocument: Document | undefined }> = props => (
        <Provider_unstable value={{ dir: 'ltr', targetDocument: props.targetDocument }}>
          {props.children}
        </Provider_unstable>
      );
      const element = document.createElement('div');

      const { result, rerender } = renderHook<
        { targetDocument: Document | undefined },
        React.MutableRefObject<HTMLElement | null>
      >(() => useFocusVisible(), {
        wrapper: Wrapper,
        initialProps: { targetDocument: undefined },
      });

      result.current.current = element;
      rerender({ targetDocument: document });

      expect(applyFocusVisiblePolyfill).toHaveBeenCalledTimes(1);
      expect(applyFocusVisiblePolyfill).toHaveBeenCalledWith(element, document.defaultView);
    });

    it('uses a window from options', () => {
      const element = document.createElement('div');
      const { result, rerender } = renderHook<
        { targetDocument: Document | undefined },
        React.MutableRefObject<HTMLElement | null>
      >(props => useFocusVisible({ targetDocument: props.targetDocument }), {
        wrapper: props => (
          <Provider_unstable value={{ dir: 'ltr', targetDocument: undefined }}>{props.children}</Provider_unstable>
        ),
        initialProps: { targetDocument: undefined },
      });

      result.current.current = element;
      rerender({ targetDocument: document });

      expect(applyFocusVisiblePolyfill).toHaveBeenCalledTimes(1);
      expect(applyFocusVisiblePolyfill).toHaveBeenCalledWith(element, document.defaultView);
    });
  });
});
