import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { ColorArea } from './ColorArea';
import type { ColorAreaProps } from './ColorArea.types';
import { tinycolor } from '@ctrl/tinycolor';
import type { JSXElement } from '@fluentui/react-utilities';

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const ColorAreaNavigation = (props: ColorAreaProps) => {
  const [color, setColor] = React.useState(props.color);
  return (
    <>
      <div id="color">{tinycolor(color).toHexString()}</div>
      <ColorArea color={color} onChange={(_, data) => setColor(data.color)} id="color-area" />
    </>
  );
};

describe('ColorArea', () => {
  describe('keyboard navigation', () => {
    it('color should be changed correctly', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 324, s: 0.5, v: 0.5 }} />);
      cy.get('.fui-ColorArea__inputX').focus();
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#7d3e64');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#7a3d62');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#783c60');
      cy.realPress('ArrowRight');
      cy.realPress('ArrowRight');
      cy.get('#color').should('have.text', '#783a5f');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#75385d');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#75395d');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#753b5e');
      cy.realPress('ArrowUp');
      cy.get('#color').should('have.text', '#783c60');
    });
    it('color selected on right edge correctly', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 106, s: 0.96, v: 0.1 }} />);
      cy.get('.fui-ColorArea__inputX').focus();
      cy.realPress('ArrowRight');
      cy.get('#color').should('have.text', '#071a01');
      cy.realPress('ArrowRight');
      cy.get('#color').should('have.text', '#061a01');
      cy.realPress('ArrowRight');
      cy.get('#color').should('have.text', '#061a00');
    });
    it('color selected on bottom edge correctly', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 111, s: 1, v: 0.03 }} />);
      cy.get('.fui-ColorArea__inputX').focus();
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#010500');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#000300');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#000000');
    });
    it('color selected on left edge correctly', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 111, s: 0.03, v: 0.45 }} />);
      cy.get('.fui-ColorArea__inputX').focus();
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#717370');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#727372');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#737373');
    });
    it('color selected on top edge correctly', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 106, s: 1, v: 0.97 }} />);
      cy.get('.fui-ColorArea__inputX').focus();
      cy.realPress('ArrowUp');
      cy.get('#color').should('have.text', '#3afa00');
      cy.realPress('ArrowUp');
      cy.get('#color').should('have.text', '#3bfc00');
      cy.realPress('ArrowUp');
      cy.get('#color').should('have.text', '#3cff00');
    });
    it('hue stays the same after achiving bottom edge', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 111, s: 1, v: 0.03 }} />);
      cy.get('.fui-ColorArea__inputX').focus();
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#000000');
      cy.get('#color-area').realClick();
      cy.get('#color').should('have.text', '#498040');
    });
  });

  describe('mouse navigation', () => {
    it('should select color onClick', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 324, s: 0.5, v: 0.5 }} />);
      cy.get('#color-area').realClick();
      cy.get('#color').should('have.text', '#804066');
    });
  });
});
