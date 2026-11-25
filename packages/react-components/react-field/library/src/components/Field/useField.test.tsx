import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useField_unstable } from './useField';

describe('useField_unstable', () => {
  const ref = React.createRef<HTMLDivElement>();

  it('should return default state when no props are provided', () => {
    const { result } = renderHook(() => useField_unstable({}, ref));

    expect(result.current).toMatchObject({
      children: undefined,
      orientation: 'vertical',
      components: {
        label: expect.objectContaining({}),
      },
      size: 'medium',
      label: undefined,
      validationMessageIcon: undefined,
      validationState: 'none',
    });
  });

  it('should return state when props are provided', () => {
    const { result } = renderHook(() =>
      useField_unstable(
        {
          orientation: 'horizontal',
          size: 'small',
          label: 'Test Label',
          validationState: 'error',
        },
        ref,
      ),
    );

    expect(result.current).toMatchObject({
      orientation: 'horizontal',
      size: 'small',
      label: expect.objectContaining({ children: 'Test Label' }),
      validationMessageIcon: expect.objectContaining({ children: expect.objectContaining({}) }),
      validationState: 'error',
    });
  });
});
