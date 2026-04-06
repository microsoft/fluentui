import { renderHook } from '@testing-library/react-hooks';
import { useTabster } from './useTabster';
import * as navigationManagerModule from '../focus-navigation/navigationManager';

jest.mock('../focus-navigation/navigationManager', () => ({
  createNavigationManager: jest.fn(() => 'mock-manager-instance'),
  disposeNavigationManager: jest.fn(),
}));

const createNavigationManagerMock = navigationManagerModule.createNavigationManager as jest.Mock;
const disposeNavigationManagerMock = navigationManagerModule.disposeNavigationManager as jest.Mock;

describe('useTabster', () => {
  it('returns a ref to the navigation manager instance', () => {
    const { result } = renderHook(() => useTabster());

    expect(createNavigationManagerMock).toHaveBeenCalledTimes(1);
    expect(result.current).toMatchObject({
      current: 'mock-manager-instance',
    });
  });

  it('uses the provided factory function to transform the manager instance', () => {
    const factoryMock = jest.fn(manager => ({ customProperty: 'value', manager }));
    const { result } = renderHook(() => useTabster(factoryMock));

    expect(factoryMock).toHaveBeenCalledWith('mock-manager-instance');
    expect(result.current).toMatchObject({
      current: { customProperty: 'value', manager: 'mock-manager-instance' },
    });
  });

  it('disposes the navigation manager when the component unmounts', () => {
    const { unmount } = renderHook(() => useTabster());

    unmount();
    expect(disposeNavigationManagerMock).toHaveBeenCalledWith('mock-manager-instance');
  });

  describe('environment checks', () => {
    let originalNodeEnv: string;

    beforeEach(() => {
      originalNodeEnv = process.env.NODE_ENV ?? '';
    });

    afterEach(() => {
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('throws an error in development if factory function changes', () => {
      process.env.NODE_ENV = 'development';

      const mockFactory1 = jest.fn(m => m);
      const mockFactory2 = jest.fn(m => m);

      const { rerender, result } = renderHook(({ factory }) => useTabster(factory), {
        initialProps: { factory: mockFactory1 },
      });

      expectRenderErrorMatching(
        () => rerender({ factory: mockFactory2 }),
        result,
        /@fluentui\/react-tabster:\s*\nThe factory function passed to useTabster has changed\. This should not ever happen\./,
      );

      function expectRenderErrorMatching(run: () => void, renderResult: { error?: unknown }, expected: RegExp) {
        let threw: unknown;
        try {
          run();
        } catch (e) {
          threw = e;
        }

        if (threw) {
          expect(getErrorMessages(threw).join('\n')).toMatch(expected);
        } else {
          expect(renderResult.error).toBeDefined();
          expect(getErrorMessages(renderResult.error).join('\n')).toMatch(expected);
        }
      }
    });
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getErrorMessages(err: any): string[] {
  if (!err) return [];
  const messages: string[] = [];
  if (typeof err.message === 'string') messages.push(err.message);
  if (Array.isArray(err.errors)) {
    for (const inner of err.errors) messages.push(...getErrorMessages(inner));
  }
  if (err.cause) messages.push(...getErrorMessages(err.cause));
  return messages;
}
