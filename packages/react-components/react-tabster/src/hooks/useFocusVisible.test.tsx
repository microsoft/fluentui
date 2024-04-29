import { Provider_unstable } from '@fluentui/react-shared-contexts';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

jest.mock('../focus/focusVisiblePolyfill', () => ({ applyFocusVisiblePolyfill: jest.fn() }));

import { applyFocusVisiblePolyfill } from '../focus/focusVisiblePolyfill';
import { useFocusVisible } from './useFocusVisible';

const createDocumentMock = (): Document => {
  const externalDocument = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);

  // `defaultView` is read-only by spec, getter is used as workaround
  // https://github.com/facebook/jest/issues/2227#issuecomment-430435133
  jest.spyOn(externalDocument, 'defaultView', 'get').mockReturnValue({} as typeof document.defaultView);

  return externalDocument;
};

describe('useFocusVisible', () => {
  describe('targetWindow', () => {
    it('uses a window from context by default', () => {
      const Wrapper: React.FC<{ targetDocument: Document | undefined }> = props => (
        <Provider_unstable value={{ dir: 'ltr', targetDocument: props.targetDocument }}>
          {props.children}
        </Provider_unstable>
      );

      const targetDocument = createDocumentMock();
      const element = targetDocument.createElement('div');

      const { result, rerender } = renderHook<
        { targetDocument: Document | undefined },
        React.MutableRefObject<HTMLElement | null>
      >(() => useFocusVisible(), {
        wrapper: Wrapper,
        initialProps: { targetDocument: undefined },
      });

      result.current.current = element;
      rerender({ targetDocument });

      expect(applyFocusVisiblePolyfill).toHaveBeenCalledTimes(1);
      expect(applyFocusVisiblePolyfill).toHaveBeenCalledWith(element, targetDocument.defaultView);
    });

    it('uses a window from options', () => {
      const targetDocument = createDocumentMock();
      const element = targetDocument.createElement('div');

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
      rerender({ targetDocument });

      expect(applyFocusVisiblePolyfill).toHaveBeenCalledTimes(1);
      expect(applyFocusVisiblePolyfill).toHaveBeenCalledWith(element, targetDocument.defaultView);
    });
  });
});
