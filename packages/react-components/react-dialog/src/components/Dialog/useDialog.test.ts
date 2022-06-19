import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import type { DialogOpenChangeArgs } from './Dialog.types';

import { useDialog_unstable } from './useDialog';

describe('useAccordion_unstable', () => {
  it('handle open behavior', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() =>
      useDialog_unstable({ children: [React.createElement('div'), React.createElement('div')] }, ref),
    );

    expect(result.current.open).toEqual(false);
    const fakeEvent = { defaultPrevented: false } as DialogOpenChangeArgs[0];
    act(() => result.current.requestOpenChange({ open: true, type: 'triggerClick', event: fakeEvent }));

    expect(result.current.open).toEqual(true);
  });
});
