import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useMenuGrid_unstable } from './useMenuGrid';

jest.mock('@fluentui/react-tabster', () => {
  const actual = jest.requireActual('@fluentui/react-tabster');
  return {
    ...actual,
    useFocusFinders: jest.fn(),
  };
});

(useFocusFinders as jest.Mock).mockReturnValue({
  findAllFocusable: jest.fn(),
});

describe('useMenuGrid_unstable', () => {
  describe('setFocusByFirstCharacter', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rows: any[];

    beforeEach(() => {
      rows = [
        { textContent: 'Apple', focus: jest.fn(), role: 'row' },
        { textContent: 'Banana', focus: jest.fn(), role: 'row' },
        { textContent: 'Cherry', focus: jest.fn(), role: 'row' },
        { textContent: 'Apricot', focus: jest.fn(), role: 'row' },
        { textContent: 'Date', focus: jest.fn(), role: 'row' },
      ];

      (useFocusFinders as jest.Mock).mockReturnValue({
        findAllFocusable: jest.fn().mockReturnValue(rows),
      });
    });

    const createEvent = (key: string, target?: Record<string, unknown>): React.KeyboardEvent<HTMLElement> =>
      ({
        key,
        target: target ?? { role: 'row' },
      } as unknown as React.KeyboardEvent<HTMLElement>);

    it('should focus the next row matching the pressed character', () => {
      const current = rows[0]; // Apple

      const { result } = renderHook(() => useMenuGrid_unstable({}, React.createRef()));
      (result.current.root.ref as React.RefCallback<HTMLElement>)?.(document.createElement('div'));
      result.current.setFocusByFirstCharacter!(createEvent('b'), current);

      expect(rows[1].focus).toHaveBeenCalledTimes(1); // Banana
    });

    it('should find the next item in a circular way', () => {
      const current = rows[3]; // Apricot — next "a" should wrap to Apple (index 0)

      const { result } = renderHook(() => useMenuGrid_unstable({}, React.createRef()));
      (result.current.root.ref as React.RefCallback<HTMLElement>)?.(document.createElement('div'));
      result.current.setFocusByFirstCharacter!(createEvent('a'), current);

      expect(rows[0].focus).toHaveBeenCalledTimes(1); // Apple
    });

    it('should ignore case of textContent', () => {
      rows.forEach((item, i) => {
        rows[i].textContent = item.textContent.toUpperCase();
      });
      const current = rows[1]; // BANANA

      const { result } = renderHook(() => useMenuGrid_unstable({}, React.createRef()));
      (result.current.root.ref as React.RefCallback<HTMLElement>)?.(document.createElement('div'));
      result.current.setFocusByFirstCharacter!(createEvent('d'), current);

      expect(rows[4].focus).toHaveBeenCalledTimes(1); // DATE
    });

    it('should not focus any row if no match is found', () => {
      const current = rows[0]; // Apple

      const { result } = renderHook(() => useMenuGrid_unstable({}, React.createRef()));
      (result.current.root.ref as React.RefCallback<HTMLElement>)?.(document.createElement('div'));
      result.current.setFocusByFirstCharacter!(createEvent('z'), current);

      rows.forEach(row => {
        expect(row.focus).not.toHaveBeenCalled();
      });
    });

    it('should skip the current row and find the next matching row', () => {
      const current = rows[0]; // Apple — next "a" should be Apricot (index 3)

      const { result } = renderHook(() => useMenuGrid_unstable({}, React.createRef()));
      (result.current.root.ref as React.RefCallback<HTMLElement>)?.(document.createElement('div'));
      result.current.setFocusByFirstCharacter!(createEvent('a'), current);

      expect(rows[3].focus).toHaveBeenCalledTimes(1); // Apricot
    });

    it('should not apply first-letter navigation when event target is not a row', () => {
      const current = rows[0]; // Apple
      const nonRowTarget = { role: 'gridcell' };

      const { result } = renderHook(() => useMenuGrid_unstable({}, React.createRef()));
      (result.current.root.ref as React.RefCallback<HTMLElement>)?.(document.createElement('div'));
      result.current.setFocusByFirstCharacter!(createEvent('b', nonRowTarget), current);

      rows.forEach(row => {
        expect(row.focus).not.toHaveBeenCalled();
      });
    });
  });
});
