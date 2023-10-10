import { canUseDOM } from '@fluentui/react-utilities';

export function getWindow(targetElement?: Element | null): Window | undefined {
  if (
    !canUseDOM() ||
    // eslint-disable-next-line no-restricted-globals
    typeof window === 'undefined'
  ) {
    return undefined;
  }

  const el = targetElement as Element;

  return el && el.ownerDocument && el.ownerDocument.defaultView
    ? el.ownerDocument.defaultView
    : // eslint-disable-next-line no-restricted-globals
      window;
}
