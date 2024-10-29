import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { ColorArea } from './ColorArea';
import type { ColorAreaProps } from '../ColorArea';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const ColorAreaSample = (props: ColorAreaProps) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>
    <ColorArea {...props} id="color-area" />
    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

const ColorAreaNavigation = () => {
  const [color, setColor] = React.useState('#3a0625');
  return (
    <>
      <div id="color">{color}</div>
      <ColorArea color={color} onChange={(_, data) => setColor(data.color)} id="color-area" />
    </>
  );
};

describe('ColorArea', () => {
  describe('focus behaviors', () => {
    it('area be focusable', () => {
      mountFluent(<ColorAreaSample color="#f09" />);

      cy.get('#before').focus();

      cy.get('#color-area').should('not.be.focused');

      cy.realPress('Tab');

      cy.get('#color-area').should('be.focused');
    });
  });

  describe('keyboard navigation', () => {
    it('color should be changed correctly', () => {
      mountFluent(<ColorAreaNavigation />);
      cy.realPress('Tab');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#380624');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#360522');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#330520');
      cy.realPress('ArrowRight');
      cy.realPress('ArrowRight');
      cy.get('#color').should('have.text', '#330420');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#30041e');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#30041f');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#30051f');
      cy.realPress('ArrowUp');
      cy.get('#color').should('have.text', '#330520');
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
