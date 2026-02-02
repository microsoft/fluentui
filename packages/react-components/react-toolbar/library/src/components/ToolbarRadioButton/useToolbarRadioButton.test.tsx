import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { ToolbarContext } from '../Toolbar/ToolbarContext';
import { useToolbarRadioButton_unstable } from './useToolbarRadioButton';
import type { ToolbarRadioButtonProps } from './ToolbarRadioButton.types';

const refMock = React.createRef<HTMLButtonElement>();
const propsMock: ToolbarRadioButtonProps = {
  name: 'test-radio',
  value: 'test-value',
};

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToolbarContext.Provider value={{ size: 'large', vertical: false, checkedValues: {} }}>
      {children}
    </ToolbarContext.Provider>
  );
};

describe('useToolbarRadioButton', () => {
  describe('size', () => {
    it('applies the medium size by default', () => {
      const { result } = renderHook(() => useToolbarRadioButton_unstable(propsMock, refMock));

      expect(result.current.size).toBe('medium');
    });

    it('applies the size from a context', () => {
      const { result } = renderHook(() => useToolbarRadioButton_unstable(propsMock, refMock), {
        wrapper: Wrapper,
      });

      expect(result.current.size).toBe('large');
    });

    it('applies the size from props over context', () => {
      const { result } = renderHook(() => useToolbarRadioButton_unstable({ ...propsMock, size: 'small' }, refMock), {
        wrapper: Wrapper,
      });

      expect(result.current.size).toBe('small');
    });
  });
});
