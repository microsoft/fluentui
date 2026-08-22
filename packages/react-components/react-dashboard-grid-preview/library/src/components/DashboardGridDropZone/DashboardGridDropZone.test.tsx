import * as React from 'react';
import { act, render } from '@testing-library/react';
import { DashboardGridProviderContextProvider } from '../../contexts/DashboardGridProviderContext';
import type {
  DashboardGridDropZoneRegistration,
  DashboardGridInteractionCoordinator,
} from '../../interaction/types';
import type { DashboardGridRegistry } from '../../provider/DashboardGridRegistry.types';
import { DashboardGridDropZone } from './DashboardGridDropZone';
import { DashboardGridProvider } from '../DashboardGridProvider/DashboardGridProvider';
import { isConformant } from '../../testing/isConformant';

describe('DashboardGridDropZone', () => {
  isConformant({
    Component: DashboardGridDropZone,
    displayName: 'DashboardGridDropZone',
    requiredProps: { id: 'drop-zone' },
    disabledTests: ['make-styles-overrides-win'],
    renderOptions: {
      wrapper: ({ children }) => <DashboardGridProvider>{children}</DashboardGridProvider>,
    },
  });

  it('renders a default state', () => {
    const { container } = render(
      <DashboardGridProvider>
        <DashboardGridDropZone id="drop-zone">Drop here</DashboardGridDropZone>
      </DashboardGridProvider>,
    );

    const zone = container.firstElementChild as HTMLElement;
    expect({
      tagName: zone.tagName,
      role: zone.getAttribute('role'),
      zoneId: zone.getAttribute('data-dashboard-grid-drop-zone'),
      state: zone.getAttribute('data-dashboard-grid-drop-state'),
      text: zone.textContent,
    }).toMatchInlineSnapshot(`
      {
        "role": "group",
        "state": "idle",
        "tagName": "DIV",
        "text": "Drop here",
        "zoneId": "drop-zone",
      }
    `);
  });

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
