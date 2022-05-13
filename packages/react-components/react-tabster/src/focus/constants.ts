export const KEYBOARD_NAV_ATTRIBUTE = 'data-keyboard-nav' as const;
export const KEYBOARD_NAV_SELECTOR = `:global([${KEYBOARD_NAV_ATTRIBUTE}])` as const;
export const defaultOptions = {
  style: {},
  selector: 'focus',
} as const;
