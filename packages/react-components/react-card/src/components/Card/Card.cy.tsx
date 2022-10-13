import * as React from 'react';
import { mount } from '@cypress/react';
import type {} from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Button } from '@fluentui/react-button';
import { Card, CardFooter, CardHeader } from '@fluentui/react-card';
import type { CardProps } from '@fluentui/react-card';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const CardSample = (props: CardProps) => {
  const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-card';

  const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';

  return (
    <>
      <p tabIndex={0} id="before">
        Before
      </p>
      <Card id="card" {...props}>
        <CardHeader
          image={<img src={powerpointLogoURL} alt="Microsoft PowerPoint logo" />}
          header={<b>App Name</b>}
          description={<span>Developer</span>}
        />
        <div>
          Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar
          plum.
        </div>
        <CardFooter>
          <Button id="open-button" onClick={alert} appearance="primary">
            Open
          </Button>
          <Button id="close-button" appearance="outline">
            Close
          </Button>
        </CardFooter>
      </Card>
      <p tabIndex={0} id="after">
        After
      </p>
    </>
  );
};

describe('Card', () => {
  describe('focus behaviors', () => {
    describe('focusMode="off" (default)', () => {
      it('should not be focusable', () => {
        mountFluent(<CardSample />);

        cy.get('#before').focus();

        cy.get('#card').should('not.be.focused');

        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#open-button').should('be.focused');
      });
    });

    describe('focusMode="no-tab"', () => {
      it('should be focusable', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        const card = cy.get('#card');

        card.should('not.be.focused');

        card.focus();

        card.should('be.focused');
      });

      it('should focus inner elements on EnterKey press', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#card').focus();

        cy.realPress('Enter');

        cy.get('#open-button').should('be.focused');
      });

      it('should not focus inner elements on Tab press', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#card').focus();

        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#after').should('be.focused');
      });

      it('should trap focus', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#open-button').focus();

        cy.realPress('Tab');

        cy.get('#open-button').should('not.be.focused');
        cy.get('#close-button').should('be.focused');

        cy.realPress('Tab');

        cy.get('#open-button').should('be.focused');
        cy.get('#close-button').should('not.be.focused');
      });

      it('should focus parent on Esc press', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#open-button').focus();

        cy.realPress('Escape');

        cy.get('#open-button').should('not.be.focused');
        cy.get('#card').should('be.focused');
      });
    });

    describe('focusMode="tab-exit"', () => {
      it('should be focusable', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        const card = cy.get('#card');

        card.should('not.be.focused');

        card.focus();

        card.should('be.focused');
      });

      it('should focus inner elements on EnterKey press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#card').focus();

        cy.realPress('Enter');

        cy.get('#open-button').should('be.focused');
      });

      it('should not focus inner elements on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#card').focus();

        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#after').should('be.focused');
      });

      it('should exit on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#close-button').focus();

        cy.realPress('Tab');

        cy.get('#after').should('be.focused');
      });

      it('should focus parent on Esc press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#card').focus().realPress('Enter');

        cy.get('#open-button').should('be.focused');

        cy.realPress('Escape');

        cy.get('#card').should('be.focused');
      });
    });

    describe('focusMode="tab-only"', () => {
      it('should be focusable', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        const card = cy.get('#card');

        card.should('not.be.focused');

        card.focus();

        card.should('be.focused');
      });

      it('should focus inner elements on EnterKey press', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        cy.get('#card').focus();

        cy.realPress('Enter');

        cy.get('#open-button').should('be.focused');
      });

      it('should focus inner elements on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        cy.get('#card').focus();

        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#open-button').should('be.focused');
      });

      it('should exit on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        cy.get('#close-button').focus();

        cy.realPress('Tab');

        cy.get('#after').should('be.focused');
      });

      it('should focus parent on Esc press', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        cy.get('#card').focus().realPress('Enter');

        cy.get('#open-button').should('be.focused');

        cy.realPress('Escape');

        cy.get('#card').should('be.focused');
      });
    });
  });
});
