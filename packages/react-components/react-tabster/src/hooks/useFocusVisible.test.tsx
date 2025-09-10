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
      const targetDocument = createDocumentMock();
      const element = targetDocument.createElement('div');

      // Use a scoped variable to feed context and update it before rerenders.
      // NOTE: Wrapper has only `children` with new `renderHook` from '@testing-library/react';
      let wrapperTargetDocument: Document | undefined = undefined;
      const Wrapper: React.FC<{ children?: React.ReactNode; targetDocument: Document | undefined }> = props => (
        <Provider_unstable value={{ dir: 'ltr', targetDocument: wrapperTargetDocument }}>
          {props.children}
        </Provider_unstable>
      );

      const { result, rerender } = renderHook<
        { targetDocument: Document | undefined },
        React.MutableRefObject<HTMLElement | null>
      >(() => useFocusVisible(), { wrapper: Wrapper });

      result.current.current = element;
      wrapperTargetDocument = targetDocument;
      rerender();

      expect(applyFocusVisiblePolyfill).toHaveBeenCalledTimes(1);
      expect(applyFocusVisiblePolyfill).toHaveBeenCalledWith(element, targetDocument.defaultView);
    });

    it('uses a window from options', () => {
      const targetDocument = createDocumentMock();
      const element = targetDocument.createElement('div');
      // NOTE: Wrapper has only `children` with new `renderHook` from '@testing-library/react';
      const Wrapper: React.FC<{ children?: React.ReactNode; targetDocument: Document | undefined }> = props => (
        <Provider_unstable value={{ dir: 'ltr', targetDocument: undefined }}>{props.children}</Provider_unstable>
      );

      const { result, rerender } = renderHook<
        { targetDocument: Document | undefined },
        React.MutableRefObject<HTMLElement | null>
      >(props => useFocusVisible({ targetDocument: props.targetDocument }), {
        wrapper: Wrapper,
        initialProps: { targetDocument: undefined },
      });

      result.current.current = element;
      rerender({ targetDocument });

      expect(applyFocusVisiblePolyfill).toHaveBeenCalledTimes(1);
      expect(applyFocusVisiblePolyfill).toHaveBeenCalledWith(element, targetDocument.defaultView);
    });
  });
});
