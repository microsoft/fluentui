import * as React from 'react';
import { renderHook } from '@testing-library/react';

import { useTagPickerFilter } from '../../tag-picker';
import { TagPickerOption } from './TagPickerOption';

describe('useTagPickerFilter', () => {
  it('renders headless TagPickerOption elements by default', () => {
    const noOptionsElement = <TagPickerOption value="no-options">No options</TagPickerOption>;
    const { result } = renderHook(() =>
      useTagPickerFilter({
        query: '',
        options: ['Cat'],
        noOptionsElement,
      }),
    );

    expect(result.current[0].type).toBe(TagPickerOption);
  });
});
