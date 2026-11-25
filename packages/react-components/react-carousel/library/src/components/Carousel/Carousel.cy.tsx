import 'cypress-real-events';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { RendererProvider } from '@griffel/react';
import { createShadowDOMRenderer } from '@griffel/shadow-dom';
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
import type { CarouselIndexChangeData } from '../CarouselContext.types';
import type { EventHandler, JSXElement } from '@fluentui/react-utilities';
import { carouselButtonClassNames } from '../CarouselButton/useCarouselButtonStyles.styles';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const CarouselTest = ({
  cardCount = 3,
  hiddenNavigation = false,
  ...props
}: CarouselProps & { cardCount?: number; hiddenNavigation?: boolean }) => {
  return (
    <Carousel {...props}>
      <CarouselViewport>
        <CarouselSlider cardFocus>
          {Array.from({ length: cardCount }, (_, index) => (
            <CarouselCard key={index}>Card {index + 1}</CarouselCard>
          ))}
        </CarouselSlider>
      </CarouselViewport>
      {hiddenNavigation && <CarouselNavContainer hidden style={{ display: 'none' }} />}
      <CarouselNavContainer>
        <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
};
CarouselTest.displayName = 'CarouselTest';

const ShadowCarouselTest = (props: CarouselProps & { cardCount?: number }) => {
  const [mountTarget, setMountTarget] = React.useState<{
    node: HTMLDivElement;
    renderer: ReturnType<typeof createShadowDOMRenderer>;
  } | null>(null);
  const attachRoot = React.useCallback((host: HTMLDivElement | null) => {
    if (host) {
      const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
      const node = root.querySelector('div') ?? root.appendChild(host.ownerDocument.createElement('div'));
      setMountTarget({ node, renderer: createShadowDOMRenderer(root) });
    }
  }, []);

  return (
    <div data-testid="shadow-carousel" ref={attachRoot}>
      {mountTarget &&
        createPortal(
          <RendererProvider renderer={mountTarget.renderer}>
            <FluentProvider theme={teamsLightTheme}>
              <CarouselTest {...props} />
            </FluentProvider>
          </RendererProvider>,
          mountTarget.node,
        )}
    </div>
  );
};

describe('CarouselControlledIndexTest', () => {
  it('skips hidden enabled controls when transferring focus', () => {
    mount(<CarouselTest cardCount={2} groupSize={1} circular={false} hiddenNavigation />);

    cy.get(`.${carouselNavButtonClassNames.root}`).should('have.length', 2);
    const buttons = () => cy.get<HTMLElement>(`.${carouselButtonClassNames.root}`);
    buttons().filter(':visible').last().focus().realPress('Enter');
    buttons().first().should('not.be.disabled').and('not.be.visible');
    buttons().filter(':visible').first().should('be.focused');
    cy.realPress('Enter');
    buttons().filter(':visible').last().should('be.focused');
  });

  it('transfers keyboard focus in both directions inside a shadow root', () => {
    mount(<ShadowCarouselTest cardCount={2} groupSize={1} circular={false} />);

    cy.get('[data-testid="shadow-carousel"]')
      .shadow()
      .find(`.${carouselNavButtonClassNames.root}`)
      .should('have.length', 2);
    const buttons = () =>
      cy.get('[data-testid="shadow-carousel"]').shadow().find<HTMLElement>(`.${carouselButtonClassNames.root}`);
    const assertFocused = ($buttons: JQuery<HTMLElement>) => {
      const root = $buttons[0].getRootNode();
      expect('activeElement' in root && root.activeElement).to.equal($buttons[0]);
    };
    buttons().last().focus().realPress('Enter');
    buttons().first().should('not.be.disabled').and(assertFocused);
    cy.realPress('Enter');
    buttons().last().should('not.be.disabled').and(assertFocused);
  });

  it('respects focus moved outside the shadow root during activation', () => {
    const outsideRef = React.createRef<HTMLButtonElement>();
    mount(
      <>
        <ShadowCarouselTest
          cardCount={2}
          groupSize={1}
          circular={false}
          onActiveIndexChange={() => outsideRef.current?.focus()}
        />
        <button ref={outsideRef} data-testid="outside-carousel">
          Outside
        </button>
      </>,
    );

    cy.get('[data-testid="shadow-carousel"]')
      .shadow()
      .find(`.${carouselNavButtonClassNames.root}`)
      .should('have.length', 2);
    cy.get('[data-testid="shadow-carousel"]')
      .shadow()
      .find<HTMLElement>(`.${carouselButtonClassNames.root}`)
      .last()
      .focus()
      .realPress('Enter');
    cy.get('[data-testid="outside-carousel"]').should('be.focused');
  });

  it('transfers keyboard focus between newly enabled buttons in a two-card carousel', () => {
    mount(<CarouselTest cardCount={2} groupSize={1} circular={false} />);

    const buttons = () => cy.get<HTMLElement>(`.${carouselButtonClassNames.root}`);
    buttons().first().should('be.disabled');
    buttons().last().focus().realPress('Enter');
    buttons().first().should('not.be.disabled').and('be.focused');
    buttons().last().should('be.disabled');

    cy.realPress('Enter');
    buttons().last().should('not.be.disabled').and('be.focused');
    buttons().first().should('be.disabled');
  });

  it('preserves focus until the endpoint in a three-card carousel', () => {
    mount(<CarouselTest groupSize={1} circular={false} />);

    const buttons = () => cy.get<HTMLElement>(`.${carouselButtonClassNames.root}`);
    buttons().last().focus().realPress('Enter');
    buttons().first().should('not.be.disabled');
    buttons().last().should('be.focused').and('not.be.disabled');
    cy.realPress('Enter');
    buttons().first().should('be.focused');
    buttons().last().should('be.disabled');
  });

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
