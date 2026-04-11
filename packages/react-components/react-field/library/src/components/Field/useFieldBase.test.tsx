import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFieldBase_unstable } from './useFieldBase';

describe('useFieldBase_unstable', () => {
  const ref = React.createRef<HTMLDivElement>();

  it('should return default state when no props are provided', () => {
    const { result } = renderHook(() => useFieldBase_unstable({}, ref));

    expect(result.current).toMatchObject({
      children: undefined,
      components: {
        // Plain HTML element is expected here, as base hook shouldn't know about the "styled" components
        label: 'label',
      },
      validationMessage: undefined,
      validationMessageIcon: undefined,
      validationState: 'none',
    });
  });

  it('should return default state when props are provided', () => {
    const { result } = renderHook(() =>
      useFieldBase_unstable(
        {
          label: 'Test Label',
          validationMessage: 'Test Validation Message',
          validationMessageIcon: 'Test Icon',
          validationState: 'error',
        },
        ref,
      ),
    );

    expect(result.current).toMatchObject({
      children: undefined,
      components: {
        // Plain HTML element is expected here, as base hook shouldn't know about the "styled" components
        label: 'label',
      },
      validationMessage: expect.objectContaining({ children: 'Test Validation Message' }),
      validationMessageIcon: expect.objectContaining({ children: 'Test Icon' }),
      validationState: 'error',
    });
  });
});
