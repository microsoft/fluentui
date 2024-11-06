import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import type { CarouselProps } from './Carousel.types';
import { CarouselNav } from '../CarouselNav/CarouselNav';
import { CarouselNavButton } from '../CarouselNavButton/CarouselNavButton';
import { CarouselNavContainer } from '../CarouselNavContainer/CarouselNavContainer';
import { CarouselSlider } from '../CarouselSlider/CarouselSlider';
import { CarouselViewport } from '../CarouselViewport/CarouselViewport';
import { Carousel } from './Carousel';
import { CarouselCard } from '../CarouselCard/CarouselCard';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const CarouselControlledIndexTest: React.FC<CarouselProps> = props => {
  const [isVisible, setVisibility] = React.useState(false);
  const [controlledIndex, setControlledIndex] = React.useState<number | undefined>(props.activeIndex);

  return (
    <Carousel
      {...props}
      activeIndex={controlledIndex}
      onActiveIndexChange={(ev, data) => {
        setControlledIndex(data.index);
      }}
    >
      <CarouselViewport>
        <CarouselSlider>
          <CarouselCard>Card 1</CarouselCard>
          <CarouselCard>Card 2</CarouselCard>
          <CarouselCard>Card 3</CarouselCard>
          {isVisible && <CarouselCard>Card 4</CarouselCard>}
          {isVisible && <CarouselCard>Card 5</CarouselCard>}
        </CarouselSlider>
      </CarouselViewport>
      <CarouselNavContainer>
        <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
      </CarouselNavContainer>
      <button
        className="addNewCardsButton"
        onClick={() => {
          // Add and set to new card
          setVisibility(true);
          setControlledIndex(4);
        }}
      >
        {'Add cards'}
      </button>
    </Carousel>
  );
};
CarouselControlledIndexTest.displayName = 'CarouselTest';

describe('CarouselControlledIndexTest', () => {
  it('Should render to initial value', () => {
    const defaultActiveIndex = 1;
    mount(<CarouselControlledIndexTest defaultActiveIndex={defaultActiveIndex} />);
    const activeIndexNavButton = cy.get<HTMLElement>('.fui-CarouselNavButton').eq(defaultActiveIndex);
    activeIndexNavButton.should('have.attr', 'aria-selected', 'true');
  });

  it('Should handle controlled index set to newly appended card', () => {
    mount(<CarouselControlledIndexTest activeIndex={1} />);

    const activeIndexNavButton = cy.get<HTMLElement>('.fui-CarouselNavButton').eq(1);
    activeIndexNavButton.should('have.attr', 'aria-selected', 'true');
    cy.then(() => {
      const addNewCardsButton = cy.get<HTMLElement>('.addNewCardsButton');
      addNewCardsButton.click();
    }).then(() => {
      const newCardIndexNavButton = cy.get<HTMLElement>('.fui-CarouselNavButton').eq(4);
      newCardIndexNavButton.should('have.attr', 'aria-selected', 'true');
    });
  });
});
