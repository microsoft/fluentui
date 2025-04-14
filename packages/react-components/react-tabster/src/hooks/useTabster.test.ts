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

      const { result, rerender } = renderHook(({ factory }) => useTabster(factory), {
        initialProps: { factory: mockFactory1 },
      });

      rerender({ factory: mockFactory2 });

      expect(result.error).toMatchInlineSnapshot(`
        [Error: @fluentui/react-tabster: 
        The factory function passed to useTabster has changed. This should not ever happen.]
      `);
    });
  });
});
