import { canUseDOM } from '@fluentui/react-utilities';

export function getWindow(targetElement?: Element | null): Window | undefined {
  if (!canUseDOM() || typeof window === 'undefined') {
    return undefined;
  }

  const el = targetElement as Element;

  return el && el.ownerDocument && el.ownerDocument.defaultView ? el.ownerDocument.defaultView : window;
}
