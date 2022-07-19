import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import type { DialogOpenChangeEvent } from './Dialog.types';

import { useDialog_unstable } from './useDialog';

describe('useDialog_unstable', () => {
  it('handle open behavior', () => {
    const { result } = renderHook(() =>
      useDialog_unstable({ children: [React.createElement('div'), React.createElement('div')] }),
    );

    expect(result.current.open).toEqual(false);
    const fakeEvent = { isDefaultPrevented: () => false } as DialogOpenChangeEvent;
    act(() => result.current.requestOpenChange({ open: true, type: 'triggerClick', event: fakeEvent }));

    expect(result.current.open).toEqual(true);
  });
});
