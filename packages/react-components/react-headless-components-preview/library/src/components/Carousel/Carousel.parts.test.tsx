import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import {
  Carousel,
  CarouselAutoplayButton,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport,
} from './index';

const parts = {
  CarouselAutoplayButton,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport,
};

Object.entries(parts).forEach(([name, Component]) => {
  describe(name, () => {
    const Wrapper = ({ children }: { children?: React.ReactNode }) => (
      <Carousel aria-label="Notes" circular>
        {name === 'CarouselAutoplayButton' && children}
        {name === 'CarouselPrevious' ? children : <CarouselPrevious />}
        {name === 'CarouselViewport' ? (
          children
        ) : (
          <CarouselViewport>{name === 'CarouselCard' ? children : 'First'}Second</CarouselViewport>
        )}
        {name === 'CarouselNext' ? children : <CarouselNext />}
        {name === 'CarouselNav' ? (
          children
        ) : (
          <CarouselNav>
            {index => (name === 'CarouselNavButton' && index === 0 ? children : <CarouselNavButton />)}
          </CarouselNav>
        )}
      </Carousel>
    );
    isConformant<{ 'data-testid'?: string; children?: React.ReactNode }>({
      Component,
      displayName: name,
      componentPath: require.resolve(`./${name}/${name}`),
      renderOptions: { wrapper: Wrapper },
      getTargetElement: result => result.getByTestId('part'),
      requiredProps: { 'data-testid': 'part', ...(name === 'CarouselViewport' && { children: ['First', 'Second'] }) },
      disabledTests: ['has-top-level-file-extra'],
    });
  });
});
