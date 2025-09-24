import 'cypress-real-events';
import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import type { CarouselProps } from './Carousel.types';
import { CarouselNav } from '../CarouselNav/CarouselNav';
import { CarouselNavButton, carouselNavButtonClassNames } from '../CarouselNavButton/index';
import { CarouselNavContainer } from '../CarouselNavContainer/CarouselNavContainer';
import { CarouselSlider } from '../CarouselSlider/CarouselSlider';
import { CarouselViewport } from '../CarouselViewport/CarouselViewport';
import { Carousel } from './Carousel';
import { CarouselCard, carouselCardClassNames } from '../CarouselCard/index';
import { CarouselIndexChangeData } from '../CarouselContext.types';
import type { EventHandler, JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const CarouselTest: React.FC<CarouselProps> = props => {
  return (
    <Carousel {...props}>
      <CarouselViewport>
        <CarouselSlider cardFocus>
          <CarouselCard>Card 1</CarouselCard>
          <CarouselCard>Card 2</CarouselCard>
          <CarouselCard>Card 3</CarouselCard>
        </CarouselSlider>
      </CarouselViewport>
      <CarouselNavContainer>
        <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
};
CarouselTest.displayName = 'CarouselTest';

describe('CarouselControlledIndexTest', () => {
  it('Should render to initial value', () => {
    const defaultActiveIndex = 1;
    mount(<CarouselTest defaultActiveIndex={defaultActiveIndex} />);
    const activeIndexNavButton = cy.get<HTMLElement>(`.${carouselNavButtonClassNames.root}`).eq(defaultActiveIndex);
    activeIndexNavButton.should('have.attr', 'aria-selected', 'true');
  });

  it('Should render to controlled value', () => {
    const controlledActiveIndex = 1;
    mount(<CarouselTest activeIndex={controlledActiveIndex} />);
    const activeIndexNavButton = cy.get<HTMLElement>(`.${carouselNavButtonClassNames.root}`).eq(controlledActiveIndex);
    activeIndexNavButton.should('have.attr', 'aria-selected', 'true');
  });

  it('Should callback new index value', () => {
    const controlledActiveIndex = 1;
    let callbackIndex = controlledActiveIndex;
    const callback: EventHandler<CarouselIndexChangeData> = (ev, data) => {
      callbackIndex = data.index;
    };
    mount(<CarouselTest defaultActiveIndex={controlledActiveIndex} onActiveIndexChange={callback} />);

    const prevIndexButton = cy.get<HTMLElement>(`.${carouselNavButtonClassNames.root}`).first();
    const nextIndexButton = cy.get<HTMLElement>(`.${carouselNavButtonClassNames.root}`).last();

    // Click to previous of original index
    prevIndexButton.click().then(() => {
      expect(callbackIndex).equals(controlledActiveIndex - 1);
      const prevIndexNavButton = cy
        .get<HTMLElement>(`.${carouselNavButtonClassNames.root}`)
        .eq(controlledActiveIndex - 1);
      prevIndexNavButton.should('have.attr', 'aria-selected', 'true');
    });

    // Check next from original index
    nextIndexButton.click().then(() => {
      expect(callbackIndex).equals(controlledActiveIndex + 1);
      const nextIndexNavButton = cy
        .get<HTMLElement>(`.${carouselNavButtonClassNames.root}`)
        .eq(controlledActiveIndex + 1);
      nextIndexNavButton.should('have.attr', 'aria-selected', 'true');
    });
  });

  it('Should set index to focused card', () => {
    mount(<CarouselTest />);

    const secondCard = cy.get<HTMLElement>(`.${carouselCardClassNames.root}`).eq(1);
    secondCard.focus().then(() => {
      const nextIndexNavButton = cy.get<HTMLElement>(`.${carouselNavButtonClassNames.root}`).eq(1);
      nextIndexNavButton.should('have.attr', 'aria-selected', 'true');
    });
  });
});

const CarouselAddCardsTest: React.FC<CarouselProps> = props => {
  const [isVisible, setVisibility] = React.useState(false);
  const [controlledIndex, setControlledIndex] = React.useState<number | undefined>(props.activeIndex);

  return (
    <Carousel {...props} activeIndex={controlledIndex}>
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
CarouselAddCardsTest.displayName = 'CarouselAddCardsTest';

describe('CarouselAddCardsTest', () => {
  it('Should handle controlled index set to newly appended card', () => {
    mount(<CarouselAddCardsTest activeIndex={1} />);

    const activeIndexNavButton = cy.get<HTMLElement>(`.${carouselNavButtonClassNames.root}`).eq(1);
    activeIndexNavButton.should('have.attr', 'aria-selected', 'true');
    cy.then(() => {
      const addNewCardsButton = cy.get<HTMLElement>('.addNewCardsButton');
      addNewCardsButton.click();
    }).then(() => {
      const newCardIndexNavButton = cy.get<HTMLElement>(`.${carouselNavButtonClassNames.root}`).eq(4);
      newCardIndexNavButton.should('have.attr', 'aria-selected', 'true');
    });
  });
});
