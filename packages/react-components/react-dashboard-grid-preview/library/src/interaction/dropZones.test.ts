import { createDashboardGridDropZone } from './dropZones';
import type { DashboardGridDropZoneRegistration, DashboardGridInteractionCoordinator } from './types';

describe('dashboard grid drop zones', () => {
  it('registers, publishes non-color validity state, and unregisters', () => {
    let registration: DashboardGridDropZoneRegistration | undefined;
    const unregister = jest.fn();
    const coordinator = {
      registerDropZone: (value: DashboardGridDropZoneRegistration) => {
        registration = value;
        return unregister;
      },
    } as unknown as DashboardGridInteractionCoordinator;
    const element = document.createElement('div');
    const controller = createDashboardGridDropZone({
      coordinator,
      registration: {
        id: 'trash',
        element,
        kind: 'remove',
      },
    });
    const listener = jest.fn();
    controller.subscribe(listener);

    registration?.onStateChange?.({ active: true, valid: false, reason: 'target-rejected' });
    expect(controller.getState()).toEqual({ active: true, valid: false, reason: 'target-rejected' });
    expect(listener).toHaveBeenCalledTimes(1);

    controller.destroy();
    expect(unregister).toHaveBeenCalledTimes(1);
  });
});
