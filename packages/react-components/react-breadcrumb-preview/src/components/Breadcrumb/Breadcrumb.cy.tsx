import * as React from 'react';
import { mount } from '@cypress/react';
import type {} from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbLink } from '@fluentui/react-breadcrumb-preview';
import type { BreadcrumbProps } from '@fluentui/react-breadcrumb-preview';

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
        <BreadcrumbButton id="breadcrumb-button-3" current>
          Item 3
        </BreadcrumbButton>
      </BreadcrumbItem>
    </Breadcrumb>

    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

const BreadcrumbSampleWithLink = (props: BreadcrumbProps) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>

    <Breadcrumb {...props} id="breadcrumb">
      <BreadcrumbItem>
        <BreadcrumbLink href="#" id="breadcrumb-link-1">
          Item 1
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#" id="breadcrumb-link-2">
          Item 2
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#" id="breadcrumb-link-3" current>
          Item 3
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>

    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

const NonInteractiveBreadcrumbSample = (props: BreadcrumbProps) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>

    <Breadcrumb {...props} id="breadcrumb">
      <BreadcrumbItem id="breadcrumb-item-1">Item 1</BreadcrumbItem>
      <BreadcrumbItem id="breadcrumb-item-2">Item 2</BreadcrumbItem>
      <BreadcrumbItem id="breadcrumb-item-3" current>
        Item 3
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
        cy.get('#breadcrumb-button-3').should('be.focused');
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
        cy.get('#breadcrumb-button-3').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#breadcrumb-button-1').should('be.focused');
      });
    });
  });
  describe('focus behaviors for BreadcrumbLink', () => {
    describe('focusMode="tab"(default)', () => {
      it('should be focusable', () => {
        mountFluent(<BreadcrumbSampleWithLink />);

        cy.get('#before').focus();

        cy.get('#breadcrumb-link-1').should('not.be.focused');

        cy.realPress('Tab');

        cy.get('#breadcrumb-link-1').should('be.focused');
        cy.realPress('Tab');
        cy.get('#breadcrumb-link-2').should('be.focused');
        cy.realPress('Tab');
        cy.get('#breadcrumb-link-3').should('be.focused');
      });
    });

    describe('focusMode="arrow"', () => {
      it('should be focusable', () => {
        mountFluent(<BreadcrumbSampleWithLink focusMode="arrow" />);

        cy.get('#before').focus();

        cy.get('#breadcrumb-link-1').should('not.be.focused');

        cy.realPress('Tab');

        cy.get('#breadcrumb-link-1').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#breadcrumb-link-2').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#breadcrumb-link-3').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#breadcrumb-link-1').should('be.focused');
      });
    });
  });
  describe('focus behaviors for BreadcrumbItem', () => {
    it('should not be focusable', () => {
      mountFluent(<NonInteractiveBreadcrumbSample />);

      cy.get('#before').focus();

      cy.get('#breadcrumb-item-1').should('not.be.focused');
      cy.get('#before').should('be.focused');

      cy.realPress('Tab');

      cy.get('#breadcrumb-item-1').should('not.be.focused');
      cy.get('#after').should('be.focused');
    });
  });
});
