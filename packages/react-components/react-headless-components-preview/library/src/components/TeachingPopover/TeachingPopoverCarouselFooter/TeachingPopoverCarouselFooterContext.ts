'use client';

import * as React from 'react';

export const TeachingPopoverCarouselFooterContext = React.createContext<((source: HTMLElement) => void) | undefined>(
  undefined,
);
