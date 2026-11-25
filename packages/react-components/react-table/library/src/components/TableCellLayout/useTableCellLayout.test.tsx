// `state.components` is deprecated but is still part of the state contract that styled hooks and renderers rely on.
/* eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTableCellLayout_unstable } from './useTableCellLayout';
import { TableContextProvider, tableContextDefaultValue } from '../../contexts/tableContext';

const sizeWrapper =
  (size: 'extra-small' | 'small' | 'medium') =>
  ({ children }: { children?: React.ReactNode }) =>
    <TableContextProvider value={{ ...tableContextDefaultValue, size }}>{children}</TableContextProvider>;

describe('useTableCellLayout_unstable', () => {
  it('renders the main slot by default and no other optional slot', () => {
    const { result } = renderHook(() => useTableCellLayout_unstable({}, React.createRef()));

    expect(result.current.components).toEqual({
      root: 'div',
      main: 'span',
      description: 'span',
      content: 'div',
      media: 'span',
    });
    expect(result.current.main).toBeDefined();
    expect(result.current.media).toBeUndefined();
    expect(result.current.description).toBeUndefined();
    expect(result.current.content).toBeUndefined();
  });

  it('renders the content slot when there are children or a description', () => {
    const withChildren = renderHook(() => useTableCellLayout_unstable({ children: 'x' }, React.createRef()));
    const withDescription = renderHook(() => useTableCellLayout_unstable({ description: 'x' }, React.createRef()));

    expect(withChildren.result.current.content).toBeDefined();
    expect(withDescription.result.current.content).toBeDefined();
    expect(withDescription.result.current.description).toBeDefined();
  });

  it.each([
    ['medium', 32],
    ['small', 24],
    ['extra-small', 20],
  ] as const)('maps the %s table size to avatar size %s', (size, avatarSize) => {
    const { result } = renderHook(() => useTableCellLayout_unstable({}, React.createRef()), {
      wrapper: sizeWrapper(size),
    });

    expect(result.current.size).toBe(size);
    expect(result.current.avatarSize).toBe(avatarSize);
  });

  it('forwards appearance and truncate', () => {
    const { result } = renderHook(() =>
      useTableCellLayout_unstable({ appearance: 'primary', truncate: true }, React.createRef()),
    );

    expect(result.current.appearance).toBe('primary');
    expect(result.current.truncate).toBe(true);
  });
});
