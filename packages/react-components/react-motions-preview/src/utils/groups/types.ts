import * as React from 'react';

export type PresenceGroupChild = {
  element: React.ReactElement;

  appear: boolean;
  visible: boolean;
  unmountOnExit: boolean;
};

export type PresenceGroupChildMapping = Record<string, PresenceGroupChild>;
