import * as React from 'react';
import { mount } from '@cypress/react';
import type {} from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from '../BreadcrumbItem';
import { BreadcrumbButton } from '../BreadcrumbButton';
import type { BreadcrumbProps } from '../Breadcrumb';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const BreadcrumbSampleWithButton = (props: BreadcrumbProps) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>

    <Breadcrumb {...props} id="breadcrumb">
      <BreadcrumbItem>
        <BreadcrumbButton id="breadcrumb-button-1">Item 1</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbButton id="breadcrumb-button-2">Item 2</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbButton id="breadcrumb-button-3" disabled>
          Item 3
        </BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbButton id="breadcrumb-button-4" current>
          Item 4
        </BreadcrumbButton>
      </BreadcrumbItem>
    </Breadcrumb>

    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

describe('Breadcrumb', () => {
  describe('focus behaviors for BreadcrumbButton', () => {
    describe('focusMode="tab"(default)', () => {
      it('should be focusable', () => {
        mountFluent(<BreadcrumbSampleWithButton />);

        cy.get('#before').focus();

        cy.get('#breadcrumb-button-1').should('not.be.focused');

        cy.realPress('Tab');

        cy.get('#breadcrumb-button-1').should('be.focused');
        cy.realPress('Tab');
        cy.get('#breadcrumb-button-2').should('be.focused');
        cy.realPress('Tab');
        cy.get('#breadcrumb-button-3').should('not.be.focused');
        cy.get('#breadcrumb-button-4').should('be.focused');
      });
    });

    describe('focusMode="arrow"', () => {
      it('should be focusable', () => {
        mountFluent(<BreadcrumbSampleWithButton focusMode="arrow" />);

        cy.get('#before').focus();

        cy.get('#breadcrumb-button-1').should('not.be.focused');

        cy.realPress('Tab');

        cy.get('#breadcrumb-button-1').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#breadcrumb-button-2').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#breadcrumb-button-3').should('not.be.focused');
        cy.get('#breadcrumb-button-4').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#breadcrumb-button-1').should('be.focused');
      });
    });
  });
});
