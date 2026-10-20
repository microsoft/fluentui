'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';

type FooterButtonElement = HTMLButtonElement | HTMLAnchorElement;

export const TeachingPopoverCarouselFooterContext = React.createContext<
  React.RefObject<FooterButtonElement | null> | undefined
>(undefined);

export const TeachingPopoverCarouselFooterProvider = ({ children }: { children: React.ReactNode }): JSXElement => {
  const nextRef = React.useRef<FooterButtonElement>(null);
  return (
    <TeachingPopoverCarouselFooterContext.Provider value={nextRef}>
      {children}
    </TeachingPopoverCarouselFooterContext.Provider>
  );
};
