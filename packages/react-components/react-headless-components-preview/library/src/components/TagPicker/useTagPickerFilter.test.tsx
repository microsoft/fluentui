import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTagPickerFilter as useStyledTagPickerFilter } from '@fluentui/react-tag-picker';

import { useTagPickerFilter } from '../../tag-picker';
import { TagPickerOption } from './TagPickerOption';

jest.mock('@fluentui/react-tag-picker', () => {
  const actual = jest.requireActual('@fluentui/react-tag-picker');

  return {
    ...actual,
    useTagPickerFilter: jest.fn(actual.useTagPickerFilter),
  };
});

const useStyledTagPickerFilterMock = useStyledTagPickerFilter as jest.MockedFunction<typeof useStyledTagPickerFilter>;

describe('useTagPickerFilter', () => {
  beforeEach(() => {
    useStyledTagPickerFilterMock.mockClear();
  });

  it('delegates filtering to the styled TagPicker hook', () => {
    const noOptionsElement = <TagPickerOption value="no-options">No options</TagPickerOption>;

    renderHook(() =>
      useTagPickerFilter({
        query: '',
        options: ['Cat'],
        noOptionsElement,
      }),
    );

    expect(useStyledTagPickerFilterMock).toHaveBeenCalledTimes(1);
    expect(useStyledTagPickerFilterMock).toHaveBeenCalledWith(
      expect.objectContaining({ renderOption: expect.any(Function) }),
    );
  });

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

  it('uses a caller-provided option renderer', () => {
    const noOptionsElement = <span>No options</span>;
    const renderOption = (option: string) => <span key={option}>Custom {option}</span>;
    const { result } = renderHook(() =>
      useTagPickerFilter({
        query: '',
        options: ['Cat'],
        noOptionsElement,
        renderOption,
      }),
    );

    expect(result.current[0].type).toBe('span');
    expect(result.current[0].key).toBe('Cat');
    expect(React.Children.toArray(result.current[0].props.children).join('')).toBe('Custom Cat');
  });

  it('filters options using the query by default', () => {
    const noOptionsElement = <span>No options</span>;
    const { result } = renderHook(() =>
      useTagPickerFilter({
        query: 'at',
        options: ['Cat', 'Dog'],
        noOptionsElement,
      }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].props.value).toBe('Cat');
  });

  it('forwards option indexes to a caller-provided filter', () => {
    const filter = jest.fn((_option: string, index: number) => index === 1);
    const noOptionsElement = <span>No options</span>;
    const { result } = renderHook(() =>
      useTagPickerFilter({
        query: '',
        options: ['Cat', 'Dog'],
        filter,
        noOptionsElement,
      }),
    );

    expect(filter).toHaveBeenNthCalledWith(1, 'Cat', 0);
    expect(filter).toHaveBeenNthCalledWith(2, 'Dog', 1);
    expect(result.current[0].props.value).toBe('Dog');
  });

  it('adds a stable key to an unkeyed no-options element', () => {
    const noOptionsElement = <span>No options</span>;
    const { result } = renderHook(() =>
      useTagPickerFilter({
        query: '',
        options: [],
        noOptionsElement,
      }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].key).toBe('no-options');
  });

  it('preserves the key of a keyed no-options element', () => {
    const noOptionsElement = <span key="custom-no-options">No options</span>;
    const { result } = renderHook(() =>
      useTagPickerFilter({
        query: '',
        options: [],
        noOptionsElement,
      }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toBe(noOptionsElement);
    expect(result.current[0].key).toBe('custom-no-options');
  });
});
