import { renderHook } from '@testing-library/react-hooks';
import { useTextarea_unstable } from './useTextarea';
import type { TextareaProps } from './Textarea.types';
import * as React from 'react';
import { Field, type FieldProps } from '@fluentui/react-field';

const createWrapper = (props: Partial<FieldProps>) => {
  return ({ children }: { children: React.ReactNode }) => <Field {...props}>{children}</Field>;
};

describe('useTextarea', () => {
  it('returns the correct initial state', () => {
    const props: TextareaProps = {
      value: 'test',
      disabled: false,
    };

    const { result } = renderHook(() => useTextarea_unstable(props, React.createRef<HTMLTextAreaElement>()));

    expect(result.current.textarea.value).toBe('test');
    expect(result.current.textarea.disabled).toBe(false);
    expect(result.current.size).toBe('medium');
    expect(result.current.textarea.required).toBeFalsy();
  });

  it('gets props from a surrounding Field', () => {
    const props: TextareaProps = {
      value: 'test',
    };

    const ref = React.createRef<HTMLTextAreaElement>();

    const { result } = renderHook(() => useTextarea_unstable(props, ref), {
      wrapper: createWrapper({ size: 'small', required: true }),
    });

    expect(result.current.textarea.value).toBe('test');
    expect(result.current.size).toBe('small');
    expect(result.current.textarea.required).toBe(true);
  });

  it('overrides props from a surrounding Field', () => {
    const props: TextareaProps = {
      value: 'test',
      // Override the size from the surrounding Field
      size: 'large',
    };

    const { result } = renderHook(() => useTextarea_unstable(props, React.createRef<HTMLTextAreaElement>()), {
      wrapper: createWrapper({ size: 'small', required: true }),
    });

    expect(result.current.textarea.value).toBe('test');
    expect(result.current.size).toBe('large');
    expect(result.current.textarea.required).toBe(true);
  });
});
