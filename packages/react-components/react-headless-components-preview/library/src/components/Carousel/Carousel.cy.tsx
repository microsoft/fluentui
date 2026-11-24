import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Carousel } from './Carousel';
import type { CarouselProps, CarouselTransition } from './Carousel.types';
import { CarouselViewport } from './CarouselViewport';
import { CarouselCard } from './CarouselCard';
import { CarouselPrevious } from './CarouselPrevious';
import { CarouselNext } from './CarouselNext';
import { CarouselNav } from './CarouselNav';
import { CarouselAutoplayButton } from './CarouselAutoplayButton';

const transition: CarouselTransition = ({ incoming, outgoing }) => [
  incoming.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 }),
  outgoing.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100 }),
];

describe('Carousel browser behavior', () => {
  let styles: string;
  before(() => {
    const storiesRoot = Cypress.spec.absolute.replace(/[/\\]library[/\\]src[/\\].*$/, '/stories');
    cy.readFile(`${storiesRoot}/.storybook/tokens.css`).then(tokens => {
      cy.readFile(`${storiesRoot}/src/Carousel/carousel.module.css`).then(css => {
        styles = `${tokens}\n${css}`;
      });
    });
  });
  const renderCarousel = ({ autoplay = false, ...props }: Partial<CarouselProps> & { autoplay?: boolean } = {}) =>
    mount(
      <div className="example">
        <style>{styles}</style>
        <button>Before</button>
        <Carousel
          id="lessons"
          aria-label="Lessons"
          groupSize={2}
          className="carousel"
          transition={transition}
          {...props}
        >
          {autoplay && <CarouselAutoplayButton className="button" />}
          <CarouselPrevious button={{ className: 'button', icon: '<' }} tooltip={{ className: 'tooltip' }} />
          <CarouselViewport className="viewport">
            {[1, 2, 3, 4, 5].map(index => (
              <CarouselCard key={index}>
                <button>Action {index}</button>
              </CarouselCard>
            ))}
          </CarouselViewport>
          <CarouselNext button={{ className: 'button', icon: '>' }} tooltip={{ className: 'tooltip' }} />
          <CarouselNav />
        </Carousel>
        <button>After</button>
      </div>,
    );

  it('keeps inactive actions out of Tab order and recovers boundary focus after motion', () => {
    renderCarousel();
    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.get('[aria-label="Slide 1 of 5"]').should('be.focused').realPress('Tab');
    cy.contains('button', 'Action 1').should('be.focused').realPress('Tab');
    cy.get('[aria-label="Slide 2 of 5"]').should('be.focused').realPress('Tab');
    cy.contains('button', 'Action 2').should('be.focused').realPress('Tab');
    cy.get('[data-carousel-action="next"]').should('be.focused').realPress('Enter');
    cy.get('[aria-busy="false"]').should('exist');
    cy.get('[data-carousel-action="next"]').should('be.focused').realPress('Enter');
    cy.get('[data-carousel-action="next"]').should('have.attr', 'aria-disabled', 'true');
    cy.get('[aria-label="Slide 5 of 5"]').should('be.focused').realPress('Tab');
    cy.contains('button', 'Action 5').should('be.focused').realPress('Tab');
    cy.get('[aria-selected="true"]').should('be.focused').realPress('Home');
    cy.get('[role="tab"]').first().should('be.focused').and('have.attr', 'aria-selected', 'true');
  });

  it('mirrors nav keys and retains button width in RTL', () => {
    renderCarousel({ dir: 'rtl' });
    cy.get('.viewport').then(viewports => {
      const { x, width, height } = viewports[0].getBoundingClientRect();
      cy.get('[aria-selected="true"]').focus().realPress('ArrowLeft');
      cy.get('[role="tab"]').eq(1).should('be.focused').and('have.attr', 'aria-selected', 'true');
      cy.get('[aria-busy="false"]').should('exist');
      cy.get('[aria-selected="true"]').realPress('End');
      cy.get('[role="tab"]').last().should('be.focused').and('have.attr', 'aria-selected', 'true');
      cy.get('[aria-busy="false"]').should('exist');
      cy.get('.viewport').should(next => {
        const rect = next[0].getBoundingClientRect();
        expect(rect.x).to.equal(x);
        expect(rect.width).to.equal(width);
        expect(rect.height).to.equal(height);
      });
    });
  });

  it('inherits an ancestor RTL direction for nav keys and the transition adapter', () => {
    const dirs: string[] = [];
    const record: CarouselTransition = data => {
      dirs.push(data.dir);
      return [];
    };
    mount(
      <div dir="rtl">
        <Carousel aria-label="Lessons" groupSize={2} transition={record}>
          <CarouselPrevious />
          <CarouselViewport>
            {[1, 2, 3, 4, 5].map(index => (
              <CarouselCard key={index}>{index}</CarouselCard>
            ))}
          </CarouselViewport>
          <CarouselNext />
          <CarouselNav />
        </Carousel>
      </div>,
    );
    cy.get('[role="region"]').should('not.have.attr', 'dir');
    cy.get('[aria-selected="true"]').focus().realPress('ArrowLeft');
    cy.get('[role="tab"]').eq(1).should('be.focused').and('have.attr', 'aria-selected', 'true');
    cy.wrap(dirs).should('deep.equal', ['rtl']);
  });

  it('shows tooltips immediately on focus and dismisses Escape without moving focus', () => {
    renderCarousel();
    cy.get('[data-carousel-action="next"]').focus();
    cy.get('#lessons-next-label').should('be.visible');
    cy.get('[data-carousel-action="next"]').realPress('Escape');
    cy.get('[data-carousel-action="next"]').should('be.focused');
    cy.get('#lessons-next-label').should('not.be.visible');
    cy.get('[data-carousel-action="next"]').should('have.attr', 'aria-labelledby', 'lessons-next-label');
    cy.get('[data-carousel-action="next"]').should('not.have.attr', 'aria-label');
    cy.get('[data-carousel-action="next"]').should('not.have.attr', 'aria-describedby');
  });

  it('keeps playback first, starts paused, and stops when focus enters content', () => {
    renderCarousel({ autoplay: true, circular: true, autoplayInterval: 1000 });
    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.contains('button', 'Play').should('be.focused').realPress('Enter');
    cy.contains('button', 'Pause').should('be.focused');
    cy.get('[role="tab"]').eq(1).should('have.attr', 'aria-selected', 'true');
    cy.contains('button', 'Pause').realPress('Tab');
    cy.contains('button', 'Play').should('exist');
    cy.get('[data-carousel-action="previous"]').should('be.focused');
    cy.get('.viewport').should('have.attr', 'aria-live', 'polite');
  });

  it('settles immediately when an input in the outgoing group would lose focus', () => {
    let change: (index: number) => void;
    const Controlled = () => {
      const [index, setIndex] = React.useState(0);
      change = setIndex;
      return (
        <Carousel aria-label="Controlled" activeIndex={index} transition={transition}>
          <CarouselViewport>
            <CarouselCard>
              <input aria-label="First" />
            </CarouselCard>
            <CarouselCard>
              <input aria-label="Second" />
            </CarouselCard>
          </CarouselViewport>
          <CarouselNav />
        </Carousel>
      );
    };
    mount(<Controlled />);
    cy.get('input[aria-label="First"]').focus();
    cy.then(() => change(1));
    cy.get('[aria-label="Slide 2 of 2"]').should('be.focused');
    cy.get('[aria-busy="false"]').should('exist');
  });
});
