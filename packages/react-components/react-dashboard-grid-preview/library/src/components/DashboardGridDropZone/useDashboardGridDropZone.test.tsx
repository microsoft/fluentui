import * as React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { DashboardGridProviderContextProvider } from '../../contexts/DashboardGridProviderContext';
import type { DashboardGridDropZoneRegistration, DashboardGridInteractionCoordinator } from '../../interaction/types';
import type { DashboardGridRegistry } from '../../provider/DashboardGridRegistry.types';
import { useDashboardGridDropZone_unstable } from './useDashboardGridDropZone';

describe('useDashboardGridDropZone_unstable', () => {
  it('registers its root and publishes coordinator visual state', async () => {
    let registration: DashboardGridDropZoneRegistration | undefined;
    const unregister = jest.fn();
    const coordinator = {
      registerDropZone: (nextRegistration: DashboardGridDropZoneRegistration) => {
        registration = nextRegistration;
        return unregister;
      },
    } as unknown as DashboardGridInteractionCoordinator;
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DashboardGridProviderContextProvider
        value={{
          coordinator,
          registry: {} as DashboardGridRegistry,
          targetDocument: document,
        }}
      >
        {children}
      </DashboardGridProviderContextProvider>
    );
    const ref = React.createRef<HTMLDivElement>();
    const { result, unmount } = renderHook(
      () =>
        useDashboardGridDropZone_unstable(
          {
            id: 'zone',
            gridId: 'target',
            kind: 'custom',
            label: 'Custom target',
          },
          ref,
        ),
      { wrapper },
    );
    const rootElement = document.createElement('div');
    const rootRef = result.current.root.ref;

    act(() => {
      expect(typeof rootRef).toBe('function');
      (rootRef as React.RefCallback<HTMLDivElement>)(rootElement);
    });

    await waitFor(() => expect(registration?.element).toBe(rootElement));
    expect(registration).toMatchObject({
      id: 'zone',
      gridId: 'target',
      kind: 'custom',
      label: 'Custom target',
      disabled: false,
    });

    act(() => registration?.onStateChange?.({ active: true, valid: false, reason: 'target-rejected' }));
    expect(result.current.dropState).toEqual({
      active: true,
      valid: false,
      reason: 'target-rejected',
    });

    unmount();
    expect(unregister).toHaveBeenCalledTimes(1);
  });
});
