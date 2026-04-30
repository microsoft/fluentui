import { act, renderHook } from '@testing-library/react-hooks';
import type { DialogOpenChangeData } from './Dialog.types';
import * as React from 'react';

import { useDialog_unstable } from './useDialog';

describe('useDialog_unstable', () => {
  it('handle open behavior', () => {
    const { result } = renderHook(() =>
      useDialog_unstable({ children: [React.createElement('div'), React.createElement('div')] }),
    );

    expect(result.current.open).toEqual(false);
    act(() =>
      result.current.requestOpenChange({
        open: true,
        type: 'triggerClick',
        event: { isDefaultPrevented: () => false },
      } as DialogOpenChangeData),
    );

    expect(result.current.open).toEqual(true);
  });
});
