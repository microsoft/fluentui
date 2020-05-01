import { TargetRef } from './types';

export const documentRef: TargetRef = {
  current: typeof document === 'undefined' ? null : document,
};
export const windowRef: TargetRef = {
  current: typeof window === 'undefined' ? null : window,
};

export { default as EventListener } from './EventListener';
export * from './types';
export { default as useEventListener } from './useEventListener';
