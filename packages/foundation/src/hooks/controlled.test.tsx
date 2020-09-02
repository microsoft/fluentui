import { renderHook, act } from 'react-hooks-testing-library';
import { useControlledState, getControlledDerivedProps } from './controlled';

interface ITestProps {
  testProp?: string;
  defaultTestProp?: string;
}

describe('useControlledState', () => {
  test('should use prop value', () => {
    const { result } = renderHook(() => useControlledState({ testProp: 'testPropValue' }, 'testProp'));
    expect(result.current[0]).toBe('testPropValue');
  });

  test('should be undefined with no options', () => {
    const { result } = renderHook(() => useControlledState({} as ITestProps, 'testProp'));
    expect(result.current[0]).toBeUndefined();
  });

  test('should use defaultPropName', () => {
    const { result } = renderHook(() =>
      useControlledState({ defaultTestProp: 'defaultNameValue' } as ITestProps, 'testProp', {
        defaultPropName: 'defaultTestProp',
      }),
    );
    expect(result.current[0]).toBe('defaultNameValue');
  });

  test('should use defaultPropValue', () => {
    const { result } = renderHook(() =>
      useControlledState({ defaultTestProp: 'defaultNameValue' } as ITestProps, 'testProp', {
        defaultPropValue: 'defaultPropValue',
      }),
    );
    expect(result.current[0]).toBe('defaultPropValue');
  });

  test('should use defaultPropName over defaultPropValue', () => {
    const { result } = renderHook(() =>
      useControlledState({ defaultTestProp: 'defaultNameValue' } as ITestProps, 'testProp', {
        defaultPropValue: 'defaultPropValue',
        defaultPropName: 'defaultTestProp',
      }),
    );
    expect(result.current[0]).toBe('defaultNameValue');
  });

  test('should not use defaults when prop exists', () => {
    const { result } = renderHook(() =>
      useControlledState({ testProp: 'testPropValue', defaultTestProp: 'defaultTestPropValue' }, 'testProp', {
        defaultPropValue: 'defaultValue',
        defaultPropName: 'defaultTestProp',
      }),
    );
    expect(result.current[0]).toBe('testPropValue');
  });

  test('should change state when prop is not present', () => {
    const { result } = renderHook(() => useControlledState({} as ITestProps, 'testProp'));
    act(() => result.current[1]('stateValue'));
    expect(result.current[0]).toBe('stateValue');
  });

  test('should let state override default values', () => {
    const { result } = renderHook(() =>
      useControlledState({ defaultTestProp: 'defaultTestPropValue' } as ITestProps, 'testProp', {
        defaultPropValue: 'defaultValue',
        defaultPropName: 'defaultTestProp',
      }),
    );
    expect(result.current[0]).toBe('defaultTestPropValue');
    act(() => result.current[1]('stateValue'));
    expect(result.current[0]).toBe('stateValue');
  });

  test('should give prop value priority over state updates', () => {
    const { result } = renderHook(() => useControlledState({ testProp: 'testPropValue' }, 'testProp'));
    act(() => result.current[1]('stateValue'));
    expect(result.current[0]).toBe('testPropValue');
  });
});

describe('getControlledDerivedProps', () => {
  test('should use prop value over derived value', () => {
    const result = getControlledDerivedProps({ testProp: 'testPropValue' }, 'testProp', 'derivedValue');
    expect(result).toBe('testPropValue');
  });

  test('should use derived value', () => {
    const result = getControlledDerivedProps({} as ITestProps, 'testProp', 'derivedValue');
    expect(result).toBe('derivedValue');
  });
});
