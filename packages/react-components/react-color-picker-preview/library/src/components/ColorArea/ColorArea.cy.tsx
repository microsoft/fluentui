import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { ColorArea } from './ColorArea';
import { tinycolor } from '@ctrl/tinycolor';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const ColorAreaNavigation = () => {
  const [color, setColor] = React.useState({ h: 324, s: 0.9, v: 0.23 });
  return (
    <>
      <div id="color">{tinycolor(color).toHexString()}</div>
      <ColorArea value={color} onChange={(_, data) => setColor(data.color)} id="color-area" />
    </>
  );
};

describe('ColorArea', () => {
  describe('keyboard navigation', () => {
    it('color should be changed correctly', () => {
      mountFluent(<ColorAreaNavigation />);
      cy.realPress('Tab');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#380624');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#360522');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#330521');
      cy.realPress('ArrowRight');
      cy.realPress('ArrowRight');
      cy.get('#color').should('have.text', '#330420');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#30041f');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#30041f');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#30051f');
      cy.realPress('ArrowUp');
      cy.get('#color').should('have.text', '#330521');
    });
  });

  describe('mouse navigation', () => {
    it('should select color onClick', () => {
      mountFluent(<ColorAreaNavigation />);
      cy.get('#color-area').realClick();
      cy.get('#color').should('have.text', '#804066');
    });
  });
});
