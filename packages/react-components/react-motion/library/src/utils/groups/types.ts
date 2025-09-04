import type { JSXElement } from '@fluentui/react-utilities';

export type PresenceGroupChild = {
  element: JSXElement;

  appear: boolean;
  visible: boolean;
  unmountOnExit: boolean;
};

export type PresenceGroupChildMapping = Record<string, PresenceGroupChild>;
