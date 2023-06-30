import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

const mount = (element: JSX.Element) => mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);

describe('DialogTrigger', () => {
  it('should focus on triggers while navigating through dialog', () => {
    mount(
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button id="open-1">Open dialog</Button>
        </DialogTrigger>
        <DialogSurface id="surface-1">
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nisi, atque esse, aut saepe obcaecati
              corporis numquam delectus molestias quos commodi, animi consectetur est quisquam. Blanditiis, nisi! Alias,
              id qui?
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button id="close-1" appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get('#surface-1').should('not.exist');
    cy.get('#open-1').realClick();
    cy.get('#surface-1').should('exist');
    cy.get('#close-1').should('be.focused').realClick();
    cy.get('#surface-1').should('not.exist');
    cy.get('#open-1').should('be.focused');
  });
  it('should focus on triggers while navigating through nested dialogs', () => {
    mount(
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button id="open-1">Open dialog</Button>
        </DialogTrigger>
        <DialogSurface id="surface-1">
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              <Dialog>
                <DialogTrigger disableButtonEnhancement>
                  <Button id="open-2">Open inner dialog</Button>
                </DialogTrigger>
                <DialogSurface id="surface-2">
                  <DialogBody>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogActions>
                      <DialogTrigger disableButtonEnhancement>
                        <Button id="close-2" appearance="secondary">
                          Close
                        </Button>
                      </DialogTrigger>
                    </DialogActions>
                  </DialogBody>
                </DialogSurface>
              </Dialog>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button id="close-1" appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get('#surface-1').should('not.exist');
    cy.get('#open-1').realClick();
    cy.get('#surface-1').should('exist');
    cy.get('#open-2').should('be.focused').realClick();
    cy.get('#surface-2').should('exist');
    cy.get('#close-2').should('be.focused').realClick();
    cy.get('#surface-2').should('not.exist');
    cy.get('#open-2').should('be.focused');
    cy.get('#close-1').realClick();
    cy.get('#open-1').should('be.focused');
  });
});
