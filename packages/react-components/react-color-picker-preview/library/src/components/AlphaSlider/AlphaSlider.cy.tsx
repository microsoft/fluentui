import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { AlphaSlider } from './AlphaSlider';
import type { AlphaSliderProps } from './AlphaSlider.types';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const AlphaSliderExample = (props: AlphaSliderProps) => {
  const [color, setColor] = React.useState(props.color ?? { h: 0, s: 1, v: 1, a: 1 });
  return (
    <>
      <p tabIndex={0} id="before">
        Before
      </p>
      <AlphaSlider
        color={color}
        onChange={(_, data) => setColor(data.color)}
        id="alpha-slider"
        aria-label="Alpha"
        aria-valuetext={`${(color.a ?? 1) * 100}%`}
      />
    </>
  );
};

describe('AlphaSlider', () => {
  describe('keyboard navigation', () => {
    it('has correct focus behavior', () => {
      mountFluent(
        <>
          <AlphaSliderExample color={{ h: 106, s: 0.96, v: 0.1 }} />
          <p tabIndex={0} id="after">
            After
          </p>
        </>,
      );
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.get('#alpha-slider').should('have.focus');
      cy.realPress('Tab');
      cy.get('#alpha-slider').should('not.have.focus');
      cy.get('#after').should('have.focus');
    });

    it('alpha channel selected correctly', () => {
      mountFluent(<AlphaSliderExample color={{ h: 106, s: 0.96, v: 0.1, a: 0.5 }} />);
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.realPress('ArrowLeft');
      cy.realPress('ArrowLeft');
      cy.get('#alpha-slider').should('have.attr', 'aria-valuetext', '48%');
      cy.get('#alpha-slider').should('have.attr', 'value', '48');
      cy.realPress('ArrowRight');
      cy.get('#alpha-slider').should('have.attr', 'value', '49');
      cy.realPress('ArrowUp');
      cy.get('#alpha-slider').should('have.attr', 'value', '50');
      cy.realPress('ArrowDown');
      cy.get('#alpha-slider').should('have.attr', 'value', '49');
    });
    it('alpha channel selected on left edge correctly', () => {
      mountFluent(<AlphaSliderExample color={{ h: 111, s: 1, v: 0.03, a: 0.02 }} />);
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.realPress('ArrowLeft');
      cy.realPress('ArrowLeft');
      cy.get('#alpha-slider').should('have.attr', 'value', '0');
      cy.realPress('ArrowLeft');
      cy.get('#alpha-slider').should('have.attr', 'value', '0');
      cy.realPress('ArrowRight');
      cy.get('#alpha-slider').should('have.attr', 'value', '1');
      cy.get('#alpha-slider').should('have.attr', 'aria-valuetext', '1%');
    });
    it('alpha channel selected on right edge correctly', () => {
      mountFluent(<AlphaSliderExample color={{ h: 111, s: 0.03, v: 0.45, a: 0.98 }} />);
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.realPress('ArrowRight');
      cy.get('#alpha-slider').should('have.attr', 'value', '99');
      cy.realPress('ArrowRight');
      cy.get('#alpha-slider').should('have.attr', 'value', '100');
      cy.realPress('ArrowRight');
      cy.get('#alpha-slider').should('have.attr', 'value', '100');
      cy.realPress('ArrowLeft');
      cy.get('#alpha-slider').should('have.attr', 'value', '99');
      cy.get('#alpha-slider').should('have.attr', 'aria-valuetext', '99%');
    });
  });

  describe('mouse navigation', () => {
    it('has correct a11y attributes', () => {
      mountFluent(<AlphaSliderExample color={{ h: 324, s: 0.5, v: 0.5 }} />);
      cy.get('#alpha-slider').should('have.attr', 'aria-label', 'Alpha');
      cy.get('#alpha-slider').realClick();
      cy.get('#alpha-slider').should('have.attr', 'aria-valuetext', '50%');
      cy.get('#alpha-slider').should('have.attr', 'value', '50');
    });
  });
});
