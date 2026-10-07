import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import type { TabsterDOMAttribute } from '@fluentui/react-tabster';
import { render } from '@testing-library/react';
import { useList_unstable } from './useList';

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
});
