import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { ColorSlider } from './ColorSlider';
import type { ColorSliderProps } from './ColorSlider.types';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const ColorSliderExample = (props: ColorSliderProps) => {
  const [color, setColor] = React.useState(props.color ?? { h: 0, s: 1, v: 1 });
  return (
    <>
      <p tabIndex={0} id="before">
        Before
      </p>
      <ColorSlider
        color={color}
        onChange={(_, data) => setColor(data.color)}
        id="color-slider"
        aria-label="Hue"
        aria-valuetext={`${color.h}°`}
      />
    </>
  );
};

describe('ColorSlider', () => {
  describe('keyboard navigation', () => {
    it('has correct focus behavior', () => {
      mountFluent(
        <>
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
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.realPress('ArrowLeft');
      cy.realPress('ArrowLeft');
      assertSliderValue('104');
      cy.realPress('ArrowRight');
      assertSliderValue('105');
      cy.realPress('ArrowUp');
      assertSliderValue('106');
      cy.realPress('ArrowDown');
      assertSliderValue('105');
    });
    it('hue channel selected on left edge correctly', () => {
      mountFluent(<ColorSliderExample color={{ h: 2, s: 1, v: 0.03 }} />);
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.realPress('ArrowLeft');
      cy.realPress('ArrowLeft');
      assertSliderValue('0');
      cy.realPress('ArrowLeft');
      assertSliderValue('0');
      cy.realPress('ArrowRight');
      assertSliderValue('1');
    });
    it('hue channel selected on right edge correctly', () => {
      mountFluent(<ColorSliderExample color={{ h: 358, s: 0.03, v: 0.45 }} />);
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.realPress('ArrowRight');
      assertSliderValue('359');
      cy.realPress('ArrowRight');
      assertSliderValue('360');
      cy.realPress('ArrowRight');
      assertSliderValue('360');
      cy.realPress('ArrowLeft');
      assertSliderValue('359');
    });
  });

  describe('mouse navigation', () => {
    it('has correct a11y attributes', () => {
      mountFluent(<ColorSliderExample color={{ h: 324, s: 0.5, v: 0.5 }} />);
      cy.get('#color-slider').should('have.attr', 'aria-label', 'Hue');
      cy.get('#color-slider').realClick();
      assertSliderValue('180');
    });
  });
});

function assertSliderValue(value: string) {
  cy.get('#color-slider').should('have.attr', 'aria-valuetext', `${value}°`);
  cy.get('#color-slider').should('have.attr', 'value', value);
}
