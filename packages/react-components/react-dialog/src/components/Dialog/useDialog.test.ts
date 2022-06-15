import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import { DialogOpenChangeEvent } from './Dialog.types';

import { useDialog_unstable } from './useDialog';

describe('useAccordion_unstable', () => {
  it('handle open behavior', () => {
    const { result } = renderHook(() =>
      useDialog_unstable({ children: [React.createElement('div'), React.createElement('div')] }),
    );

    expect(result.current.open).toEqual(false);
    const fakeEvent = { defaultPrevented: false } as DialogOpenChangeEvent;
    act(() => result.current.requestOpenChange(fakeEvent, { open: true, type: 'triggerClick' }));

    expect(result.current.open).toEqual(true);
  });
});
