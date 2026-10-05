import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useComboboxFilter } from './useComboboxFilter';
import { Option } from '../Dropdown/Option';

describe('useComboboxFilter', () => {
  const noOptionsElement = <Option value="no-options">No options</Option>;
  const renderOption = (option: string) => (
    <Option key={option} value={option}>
      {option}
    </Option>
  );

  it('renders headless Option elements by default', () => {
    const { result } = renderHook(() =>
      useComboboxFilter({
        query: '',
        options: ['Cat'],
        noOptionsElement,
        renderOption,
      }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toMatchObject({
      type: Option,
      props: { value: 'Cat', children: 'Cat' },
    });
  });

  it('filters options using the query by default', () => {
    const { result } = renderHook(() =>
      useComboboxFilter({
        query: 'at',
        options: ['Cat', 'Dog'],
        noOptionsElement,
        renderOption,
      }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].props.value).toBe('Cat');
  });

  it('forwards option indexes to a caller-provided filter', () => {
    const filter = jest.fn((_option: string, index: number) => index === 1);

    const { result } = renderHook(() =>
      useComboboxFilter({
        query: '',
        options: ['Cat', 'Dog'],
        filter,
        noOptionsElement,
        renderOption,
      }),
    );

    expect(filter).toHaveBeenNthCalledWith(1, 'Cat', 0);
    expect(filter).toHaveBeenNthCalledWith(2, 'Dog', 1);
    expect(result.current[0].props.value).toBe('Dog');
  });

  it('adds a stable key to an unkeyed no-options element', () => {
    const { result } = renderHook(() =>
      useComboboxFilter({
        query: '',
        options: [],
        noOptionsElement,
        renderOption,
      }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].key).toBe('no-options');
  });
});
