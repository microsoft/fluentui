import { renderHook } from '@testing-library/react-hooks';
import { useInput_unstable } from './useInput';
import type { InputProps } from './Input.types';
import * as React from 'react';
import { Field, type FieldProps } from '@fluentui/react-field';

const createWrapper = (props: Partial<FieldProps>) => {
  return ({ children }: { children: React.ReactNode }) => <Field {...props}>{children}</Field>;
};

describe('useInput', () => {
  it('returns the correct initial state', () => {
    const props: InputProps = {
      value: 'test',
      disabled: false,
    };

    const { result } = renderHook(() => useInput_unstable(props, React.createRef<HTMLInputElement>()));

    expect(result.current.input.value).toBe('test');
    expect(result.current.input.disabled).toBe(false);
    expect(result.current.size).toBe('medium');
    expect(result.current.input.required).toBeFalsy();
  });

  it('gets props from a surrounding Field', () => {
    const props: InputProps = {
      value: 'test',
    };

    const ref = React.createRef<HTMLInputElement>();

    const { result } = renderHook(() => useInput_unstable(props, ref), {
      wrapper: createWrapper({ size: 'small', required: true }),
    });

    expect(result.current.input.value).toBe('test');
    expect(result.current.size).toBe('small');
    expect(result.current.input.required).toBe(true);
  });

  it('overrides props from a surrounding Field', () => {
    const props: InputProps = {
      value: 'test',
      // Override the size from the surrounding Field
      size: 'large',
    };

    const { result } = renderHook(() => useInput_unstable(props, React.createRef<HTMLInputElement>()), {
      wrapper: createWrapper({ size: 'small', required: true }),
    });

    expect(result.current.input.value).toBe('test');
    expect(result.current.size).toBe('large');
    expect(result.current.input.required).toBe(true);
  });
});
