import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { ColorSlider } from './ColorSlider';
import type { ColorSliderProps } from './ColorSlider.types';
import { INITIAL_COLOR_HSV } from '../../utils/constants';
import type { JSXElement } from '@fluentui/react-utilities';

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const ColorSliderExample = (props: ColorSliderProps) => {
  const [color, setColor] = React.useState(props.color ?? INITIAL_COLOR_HSV);
  return (
    <ColorSlider
      color={color}
      onChange={(_, data) => setColor(data.color)}
      id="color-slider"
      aria-label="Hue"
      aria-valuetext={`${color.h}°`}
    />
  );
};

describe('ColorSlider', () => {
  describe('keyboard navigation', () => {
    it('has correct focus behavior', () => {
      mountFluent(
        <>
          <p tabIndex={0} id="before">
            Before
          </p>
          <ColorSliderExample color={{ h: 106, s: 0.96, v: 0.1 }} />
          <p tabIndex={0} id="after">
            After
          </p>
        </>,
      );
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.get('#color-slider').should('have.focus');
      cy.realPress('Tab');
      cy.get('#color-slider').should('not.have.focus');
      cy.get('#after').should('have.focus');
    });

    it('hue channel selected correctly', () => {
      mountFluent(<ColorSliderExample color={{ h: 106, s: 0.96, v: 0.1 }} />);
      cy.get('.fui-ColorSlider__input').focus();

      // decrements the value two times
      cy.realPress('ArrowLeft');
      cy.realPress('ArrowLeft');
      assertSliderValue('104');

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('105');

      // increments the value with arrowUp
      cy.realPress('ArrowUp');
      assertSliderValue('106');

      // decrements the value with arrowDown
      cy.realPress('ArrowDown');
      assertSliderValue('105');
    });

    it('hue channel selected on left edge correctly', () => {
      mountFluent(<ColorSliderExample color={{ h: 2, s: 1, v: 0.03 }} />);
      cy.get('.fui-ColorSlider__input').focus();

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

    it('hue channel selected on right edge correctly', () => {
      mountFluent(<ColorSliderExample color={{ h: 358, s: 0.03, v: 0.45 }} />);
      cy.get('.fui-ColorSlider__input').focus();

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('359');

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('360');

      // increments the value on right edge
      cy.realPress('ArrowRight');
      assertSliderValue('360');

      // decrements the value
      cy.realPress('ArrowLeft');
      assertSliderValue('359');
    });
  });

  describe('mouse navigation', () => {
    it('has correct a11y attributes', () => {
      mountFluent(<ColorSliderExample color={{ h: 324, s: 0.5, v: 0.5 }} />);
      cy.get('#color-slider').should('have.attr', 'aria-label', 'Hue');
      assertSliderValue('324');

      cy.get('#color-slider').realClick();
      assertSliderValue('180');
    });
  });
});

function assertSliderValue(value: string) {
  cy.get('#color-slider').should('have.attr', 'aria-valuetext', `${value}°`);
  cy.get('#color-slider').should('have.attr', 'value', value);
}
