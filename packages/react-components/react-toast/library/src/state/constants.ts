export const EVENTS = {
  show: 'fui-toast-show',
  dismiss: 'fui-toast-dismiss',
  dismissAll: 'fui-toast-dismiss-all',
  update: 'fui-toast-update',
  pause: 'fui-toast-pause',
  play: 'fui-toast-play',
} as const;

export const TOAST_POSITIONS = {
  bottom: 'bottom',
  bottomEnd: 'bottom-end',
  bottomStart: 'bottom-start',
  top: 'top',
  topEnd: 'top-end',
  topStart: 'top-start',
} as const;
