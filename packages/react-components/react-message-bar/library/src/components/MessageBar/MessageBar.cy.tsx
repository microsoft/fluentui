import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle } from '@fluentui/react-message-bar';

const mount = (element: JSX.Element) => {
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

describe('MessageBar', () => {
  // ⚠️ - This test will fail on headed cypress runs, since cypress element highlighting injects divs that
  // trigger resize observer updates
  it('Should render MessageActions slots with correct keys', () => {
    mount(<Test />);

    // wait for resize observer to trigger
    cy.wait(1000).get('#action').should('be.focused').get('#containerAction').should('not.be.focused');
  });
});
