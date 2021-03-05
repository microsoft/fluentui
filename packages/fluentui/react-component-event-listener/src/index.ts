import { TargetRef } from './types';

export const documentRef: TargetRef = {
  current: typeof document === 'undefined' ? null : document,
};
export const windowRef: TargetRef = {
  current: typeof window === 'undefined' ? null : window,
};

export { EventListener } from './EventListener';
export * from './types';
export { useEventListener } from './useEventListener';
