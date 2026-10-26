'use client';

import * as React from 'react';

type FooterButtons = Partial<Record<'prev' | 'next', HTMLElement>>;

type FooterContext = {
  register: (direction: 'prev' | 'next', element: HTMLElement | null) => void;
  getButton: (direction: 'prev' | 'next') => HTMLElement | undefined;
};

export const TeachingPopoverCarouselFooterContext = React.createContext<FooterContext | undefined>(undefined);

export const TeachingPopoverCarouselFooterProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const buttons = React.useRef<FooterButtons>({});
  const value = React.useMemo<FooterContext>(
    () => ({
      register: (direction, element) => {
        if (element) {
          buttons.current[direction] = element;
        } else {
          delete buttons.current[direction];
        }
      },
      getButton: direction => buttons.current[direction],
    }),
    [],
  );
  return React.createElement(TeachingPopoverCarouselFooterContext.Provider, { value }, children);
};
