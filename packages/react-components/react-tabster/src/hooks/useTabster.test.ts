import { createTabster, disposeTabster } from 'tabster';
import { renderHook } from '@testing-library/react-hooks';
import { useTabster } from './useTabster';

jest.mock('tabster', () => ({
  createTabster: jest.fn(() => 'mock-tabster-instance'),
  disposeTabster: jest.fn(),
}));

const createTabsterMock = createTabster as jest.Mock;
const disposeTabsterMock = disposeTabster as jest.Mock;

describe('useTabster', () => {
  it('returns a ref to the tabster instance', () => {
    const { result } = renderHook(() => useTabster());

    expect(createTabsterMock).toHaveBeenCalledTimes(1);
    expect(result.current).toMatchObject({
      current: 'mock-tabster-instance',
    });
  });

  it('uses the provided factory function to transform the tabster instance', () => {
    const factoryMock = jest.fn(tabster => ({ customProperty: 'value', tabster }));
    const { result } = renderHook(() => useTabster(factoryMock));

    expect(factoryMock).toHaveBeenCalledWith('mock-tabster-instance');
    expect(result.current).toMatchObject({
      current: { customProperty: 'value', tabster: 'mock-tabster-instance' },
    });
  });

  it('disposes tabster when the component unmounts', () => {
    const { unmount } = renderHook(() => useTabster());

    unmount();
    expect(disposeTabsterMock).toHaveBeenCalledWith('mock-tabster-instance');
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

      const mockFactory1 = jest.fn(tabster => tabster);
      const mockFactory2 = jest.fn(tabster => tabster);

      const { rerender, result } = renderHook(({ factory }) => useTabster(factory), {
        initialProps: { factory: mockFactory1 },
      });

      expectRenderErrorMatching(
        () => rerender({ factory: mockFactory2 }),
        result,
        /@fluentui\/react-tabster:\s*\nThe factory function passed to useTabster has changed\. This should not ever happen\./,
      );

      // React 17 (with @testing-library/react-hooks) captures hook errors into result.error instead of throwing
      // while React 18/19 tend to throw synchronously. Support both behaviors.
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
          // React 17 behavior
          expect(renderResult.error).toBeDefined();
          expect(getErrorMessages(renderResult.error).join('\n')).toMatch(expected);
        }
      }
    });
  });
});

// React 19 wraps render-time errors into an AggregateError with empty message.
// This helper extracts nested messages so we can assert reliably across React versions.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getErrorMessages(err: any): string[] {
  if (!err) {
    return [];
  }
  const messages: string[] = [];
  if (typeof err.message === 'string') {
    messages.push(err.message);
  }
  if (Array.isArray(err.errors)) {
    for (const inner of err.errors) {
      messages.push(...getErrorMessages(inner));
    }
  }
  if (err.cause) {
    messages.push(...getErrorMessages(err.cause));
  }
  return messages;
}
