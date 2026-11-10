import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import type { TabsterDOMAttribute } from '@fluentui/react-tabster';
import { render } from '@testing-library/react';
import { useList_unstable, useListBase_unstable } from './useList';

const mockFindAllFocusable = jest.fn((): HTMLElement[] => []);

jest.mock('@fluentui/react-tabster', () => ({
  ...jest.requireActual('@fluentui/react-tabster'),
  useFocusFinders: () => ({ findAllFocusable: mockFindAllFocusable }),
}));

describe('useList_unstable', () => {
  afterEach(() => {
    mockFindAllFocusable.mockClear();
  });

  it('applies Tabster navigation to the list', () => {
    const { result } = renderHook(() =>
      useList_unstable({ navigationMode: 'items' }, React.createRef<HTMLUListElement>()),
    );

    expect((result.current.root as Partial<TabsterDOMAttribute>)['data-tabster']).toContain('mover');
  });

  it('does not invoke focus finders when validating in production', () => {
    const { result } = renderHook(() => useList_unstable({}, React.createRef()));
    const { getByRole } = render(
      <ul>
        <li>Item</li>
      </ul>,
    );
    const listItem = getByRole('listitem');
    const originalEnvironment = process.env.NODE_ENV;

    try {
      process.env.NODE_ENV = 'production';
      result.current.validateListItem(listItem);

      expect(mockFindAllFocusable).not.toHaveBeenCalled();
    } finally {
      process.env.NODE_ENV = originalEnvironment;
    }
  });

  it.each([
    { name: 'styled', useHook: useList_unstable },
    { name: 'base', useHook: useListBase_unstable },
  ])('$name hook honors an explicit ordered-list root', ({ useHook }) => {
    const { result } = renderHook(() => useHook({ as: 'ol' }, React.createRef<HTMLOListElement>()));

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.root).toBe('ol');
  });

  describe.each([
    { name: 'styled', useHook: useList_unstable },
    { name: 'base', useHook: useListBase_unstable },
  ])('$name inferred roles', ({ useHook }) => {
    it('preserves the selection role when role is explicitly undefined', () => {
      const { result } = renderHook(() => useHook({ role: undefined, selectionMode: 'single' }, React.createRef()));

      expect(result.current.root.role).toBe('listbox');
      expect(result.current.listItemRole).toBe('option');
    });

    it('preserves the composite role when role is explicitly undefined', () => {
      const { result } = renderHook(() => useHook({ role: undefined, navigationMode: 'composite' }, React.createRef()));

      expect(result.current.root.role).toBe('grid');
      expect(result.current.listItemRole).toBe('row');
    });
  });
});
