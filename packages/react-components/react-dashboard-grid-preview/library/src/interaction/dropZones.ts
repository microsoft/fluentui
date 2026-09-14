import type {
  DashboardGridDropAcceptanceContext,
  DashboardGridDropZoneRegistration,
  DashboardGridDropZoneVisualState,
  DashboardGridInteractionCoordinator,
} from './types';

export const resolveDashboardGridDropAcceptance = (
  accepts: DashboardGridDropZoneRegistration['accepts'],
  context: DashboardGridDropAcceptanceContext,
): boolean => (typeof accepts === 'function' ? accepts(context) : accepts !== false);

export type DashboardGridDropZoneController = {
  getState(): DashboardGridDropZoneVisualState;
  subscribe(listener: () => void): () => void;
  update(registration: DashboardGridDropZoneRegistration): void;
  destroy(): void;
};

export const createDashboardGridDropZone = (options: {
  coordinator: DashboardGridInteractionCoordinator;
  registration: DashboardGridDropZoneRegistration;
}): DashboardGridDropZoneController => {
  const listeners = new Set<() => void>();
  let state: DashboardGridDropZoneVisualState = { active: false, valid: false };
  let registration = options.registration;
  let unregister: () => void = () => undefined;
  let destroyed = false;

  const register = () => {
    unregister();
    const onStateChange = registration.onStateChange;
    unregister = options.coordinator.registerDropZone({
      ...registration,
      onStateChange: nextState => {
        state = nextState;
        onStateChange?.(nextState);
        for (const listener of listeners) {
          listener();
        }
      },
    });
  };

  register();

  return {
    getState: () => state,
    subscribe: listener => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    update: nextRegistration => {
      if (destroyed) {
        return;
      }
      registration = nextRegistration;
      register();
    },
    destroy: () => {
      if (destroyed) {
        return;
      }
      destroyed = true;
      unregister();
      listeners.clear();
    },
  };
};
