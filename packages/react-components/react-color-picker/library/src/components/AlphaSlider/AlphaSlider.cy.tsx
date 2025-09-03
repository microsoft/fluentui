import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { AlphaSlider } from './AlphaSlider';
import type { AlphaSliderProps } from './AlphaSlider.types';
import { calculateTransparencyValue } from './alphaSliderUtils';
import { INITIAL_COLOR_HSV } from '../../utils/constants';
import type { JSXElement } from '@fluentui/react-utilities';

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const AlphaSliderExample = (props: AlphaSliderProps) => {
  const { transparency = false } = props;
  const [color, setColor] = React.useState(props.color ?? INITIAL_COLOR_HSV);
  return (
    <AlphaSlider
      color={color}
      onChange={(_, data) => setColor(data.color)}
      id="alpha-slider"
      aria-label="Alpha"
      aria-valuetext={`${calculateTransparencyValue(transparency, color.a ?? 1)}%`}
      transparency={transparency}
    />
  );
};

describe('AlphaSlider', () => {
  describe('keyboard navigation', () => {
    it('has correct focus behavior', () => {
      mountFluent(
        <>
          <p tabIndex={0} id="before">
            Before
          </p>
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

    describe('alpha channel', () => {
      it('selected correctly', () => {
        mountFluent(<AlphaSliderExample color={{ h: 106, s: 0.96, v: 0.1, a: 0.5 }} />);
        cy.get('.fui-AlphaSlider__input').focus();

        // decrements the value two times
        cy.realPress('ArrowLeft');
        cy.realPress('ArrowLeft');
        assertSliderValue('48');

        // increments the value
        cy.realPress('ArrowRight');
        assertSliderValue('49');

        // increments the value with arrowUp
        cy.realPress('ArrowUp');
        assertSliderValue('50');

        // decrements the value with arrowDown
        cy.realPress('ArrowDown');
        assertSliderValue('49');
      });

      it('selected on left edge correctly', () => {
        mountFluent(<AlphaSliderExample color={{ h: 111, s: 1, v: 0.03, a: 0.02 }} />);
        cy.get('.fui-AlphaSlider__input').focus();

        // decrements the value two times
        cy.realPress('ArrowLeft');
        cy.realPress('ArrowLeft');
        assertSliderValue('0');

        // decrements the value on left edge
        cy.realPress('ArrowLeft');
        assertSliderValue('0');

        // increments the value
        cy.realPress('ArrowRight');
        assertSliderValue('1');
      });

      it('selected on right edge correctly', () => {
        mountFluent(<AlphaSliderExample color={{ h: 111, s: 0.03, v: 0.45, a: 0.98 }} />);
        cy.get('.fui-AlphaSlider__input').focus();

        // increments the value
        cy.realPress('ArrowRight');
        assertSliderValue('99');

        // increments the value
        cy.realPress('ArrowRight');
        assertSliderValue('100');

        // increments the value on right edge
        cy.realPress('ArrowRight');
        assertSliderValue('100');

        // decrements the value
        cy.realPress('ArrowLeft');
        assertSliderValue('99');
      });
    });
  });

  describe('transparency', () => {
    it('selected correctly', () => {
      mountFluent(<AlphaSliderExample color={{ h: 106, s: 0.96, v: 0.1, a: 0.7 }} transparency />);
      cy.get('.fui-AlphaSlider__input').focus();

      // decrements the value two times
      cy.realPress('ArrowLeft');
      cy.realPress('ArrowLeft');
      assertSliderValue('28');

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('29');

      // increments the value with arrowUp
      cy.realPress('ArrowUp');
      assertSliderValue('30');

      // decrements the value with arrowDown
      cy.realPress('ArrowDown');
      assertSliderValue('29');
    });

    it('selected on left edge correctly', () => {
      mountFluent(<AlphaSliderExample color={{ h: 111, s: 1, v: 0.03, a: 0.98 }} transparency />);
      cy.get('.fui-AlphaSlider__input').focus();

      // decrements the value two times
      cy.realPress('ArrowLeft');
      cy.realPress('ArrowLeft');
      assertSliderValue('0');

      // decrements the value on left edge
      cy.realPress('ArrowLeft');
      assertSliderValue('0');

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('1');
    });

    it('selected on right edge correctly', () => {
      mountFluent(<AlphaSliderExample color={{ h: 111, s: 0.03, v: 0.45, a: 0.02 }} transparency />);
      cy.get('.fui-AlphaSlider__input').focus();

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('99');

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('100');

      // increments the value on right edge
      cy.realPress('ArrowRight');
      assertSliderValue('100');

      // decrements the value
      cy.realPress('ArrowLeft');
      assertSliderValue('99');
    });
  });

  describe('mouse navigation', () => {
    it('has correct a11y attributes', () => {
      mountFluent(<AlphaSliderExample color={{ h: 324, s: 0.5, v: 0.5 }} />);
      cy.get('#alpha-slider').should('have.attr', 'aria-label', 'Alpha');
      assertSliderValue('100');
      cy.get('#alpha-slider').realClick();
      assertSliderValue('50');
    });
  });
});

function assertSliderValue(value: string) {
  cy.get('#alpha-slider').should('have.attr', 'aria-valuetext', `${value}%`);
  cy.get('#alpha-slider').should('have.attr', 'value', value);
}
