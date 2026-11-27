import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle } from '@fluentui/react-message-bar';
import type { MessageBarProps } from '@fluentui/react-message-bar';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const Test = () => {
  const actionRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    actionRef.current?.focus();
  }, []);

  return (
    <div style={{ width: 400 }}>
      <MessageBar intent="success">
        <MessageBarBody>
          <MessageBarTitle>Descriptive title</MessageBarTitle>
          Message providing information to the user with actionable insights. <a>Link</a>
        </MessageBarBody>
        <MessageBarActions containerAction={<button id="containerAction">XXX</button>}>
          <button id="action" ref={actionRef}>
            Action
          </button>
        </MessageBarActions>
      </MessageBar>
    </div>
  );
};

const TextMeasure = ({ layout }: Pick<MessageBarProps, 'layout'>) => (
  <div data-testid="container" style={{ width: 1200 }}>
    <MessageBar layout={layout}>
      <MessageBarBody>
        <MessageBarTitle>Descriptive title</MessageBarTitle>
        Message providing information to the user with actionable insights. Message providing information to the user
        with actionable insights. Message providing information to the user with actionable insights.
      </MessageBarBody>
      <MessageBarActions containerAction={<button aria-label="dismiss">Dismiss</button>}>
        <button>Action</button>
      </MessageBarActions>
    </MessageBar>
  </div>
);

describe('MessageBar', () => {
  it('bounds multiline text without moving the actions or overflowing a narrow container', () => {
    mount(<TextMeasure layout="multiline" />);

    cy.get('.fui-MessageBarBody').should($body => {
      expect($body.width()).to.be.at.most(520);
    });
    cy.get('[data-testid="container"]').invoke('css', 'width', '400px');
    cy.get('.fui-MessageBarBody').should($body => {
      expect($body.width()).to.be.lessThan(400);
      const body = $body[0].getBoundingClientRect();
      const bar = $body[0].parentElement!;
      const action = bar.querySelector('.fui-MessageBarActions')!.getBoundingClientRect();
      const dismiss = bar.querySelector('[aria-label="dismiss"]')!.getBoundingClientRect();
      expect(action.top).to.be.at.least(body.bottom);
      expect(dismiss.left).to.be.at.least(body.right);
    });
  });

  it('removes the multiline text bound when automatic layout expands back to singleline', () => {
    mount(<TextMeasure layout="auto" />);

    cy.get('[data-testid="container"]').invoke('css', 'width', '400px');
    cy.get('.fui-MessageBarBody').should('have.css', 'max-width', '520px');
    cy.get('[data-testid="container"]').invoke('css', 'width', '1800px');
    cy.get('.fui-MessageBarBody')
      .should('have.css', 'max-width', 'none')
      .should($body => {
        expect($body.width()).to.be.greaterThan(520);
      });
  });

  // ⚠️ - This test will fail on headed cypress runs, since cypress element highlighting injects divs that
  // trigger resize observer updates
  it('Should render MessageActions slots with correct keys', () => {
    mount(<Test />);

    cy.on('uncaught:exception', err => {
      // Ignore uncaught exceptions from resize observer
      // These seem to only happen on cypress headed runs
      if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
        return false;
      }
    });

    // wait for resize observer to trigger
    cy.wait(1000).get('#action').should('be.focused').get('#containerAction').should('not.be.focused');
  });
});
