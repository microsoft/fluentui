import * as React from 'react';
import { act, render } from '@testing-library/react';
import { DashboardGridProviderContextProvider } from '../../contexts/DashboardGridProviderContext';
import type {
  DashboardGridDropZoneRegistration,
  DashboardGridInteractionCoordinator,
} from '../../interaction/types';
import type { DashboardGridRegistry } from '../../provider/DashboardGridRegistry.types';
import { DashboardGridDropZone } from './DashboardGridDropZone';

describe('DashboardGridDropZone', () => {
  it('exposes valid and invalid state without relying only on color', () => {
    let registration: DashboardGridDropZoneRegistration | undefined;
    const coordinator = {
      registerDropZone: (value: DashboardGridDropZoneRegistration) => {
        registration = value;
        return () => undefined;
      },
    } as unknown as DashboardGridInteractionCoordinator;
    const { getByRole } = render(
      <DashboardGridProviderContextProvider
        value={{
          coordinator,
          registry: {} as DashboardGridRegistry,
          targetDocument: document,
        }}
      >
        <DashboardGridDropZone id="trash" kind="remove" label="Remove item">
          Remove
        </DashboardGridDropZone>
      </DashboardGridProviderContextProvider>,
    );
    const zone = getByRole('group', { name: 'Remove item' });
    const indicator = zone.querySelector('[aria-hidden="true"]');

    act(() => registration?.onStateChange?.({ active: true, valid: false, reason: 'target-rejected' }));
    expect(zone.getAttribute('data-dashboard-grid-drop-state')).toBe('invalid');
    expect(indicator?.getAttribute('data-dashboard-grid-drop-valid')).toBe('false');

    act(() => registration?.onStateChange?.({ active: true, valid: true }));
    expect(zone.getAttribute('data-dashboard-grid-drop-state')).toBe('valid');
    expect(indicator?.getAttribute('data-dashboard-grid-drop-valid')).toBe('true');
  });
});
