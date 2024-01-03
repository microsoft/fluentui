import { Provider_unstable } from '@fluentui/react-shared-contexts';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useIsReducedMotion } from './useIsReducedMotion';

function createMatchMediaMock(matches: boolean): Window['matchMedia'] {
  return () =>
    ({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      matches,
    } as unknown as ReturnType<Window['matchMedia']>);
}

function createDocumentMock(matchMedia: Window['matchMedia'] | undefined): Document {
  return {
    defaultView: {
      matchMedia,
    } as Document['defaultView'],
  } as Document;
}

describe('useIsReducedMotion', () => {
  it('should return "false" if matchMedia is not supported', () => {
    const targetDocument = createDocumentMock(undefined);
    const { result } = renderHook(() => useIsReducedMotion(), {
      wrapper: ({ children }) => (
        <Provider_unstable value={{ targetDocument, dir: 'ltr' }}>{children}</Provider_unstable>
      ),
    });

    expect(result.current()).toBe(false);
  });

  it('should return a value if matchMedia is supported', () => {
    const matchMediaMock = createMatchMediaMock(true);
    const targetDocument = createDocumentMock(matchMediaMock);

    const { result } = renderHook(() => useIsReducedMotion(), {
      wrapper: ({ children }) => (
        <Provider_unstable value={{ targetDocument, dir: 'ltr' }}>{children}</Provider_unstable>
      ),
    });

    expect(result.current()).toBe(true);
  });
});
