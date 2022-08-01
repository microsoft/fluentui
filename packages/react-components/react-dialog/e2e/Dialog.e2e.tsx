import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { Dialog, DialogActions, DialogBody, DialogSurface, DialogTitle, DialogTrigger } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

const mount = (element: JSX.Element) => mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);

describe('Dialog', () => {
  it('should be closed by default', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button id="open-btn">Open dialog</Button>
        </DialogTrigger>
        <DialogSurface id="dialog-surface">
          <DialogTitle>Dialog title</DialogTitle>
          <DialogBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogBody>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>,
    );
    cy.get('#open-btn').should('exist');
    cy.get('#dialog-surface').should('not.exist');
  });
  it('should open when trigger is clicked', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button id="open-btn">Open dialog</Button>
        </DialogTrigger>
        <DialogSurface id="dialog-surface">
          <DialogTitle>Dialog title</DialogTitle>
          <DialogBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogBody>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>,
    );
    cy.get('#open-btn').click();
    cy.get('#dialog-surface').should('exist');
  });
  it('should focus on first focusabled element when opened', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button id="open-btn">Open dialog</Button>
        </DialogTrigger>
        <DialogSurface id="dialog-surface">
          <DialogTitle>Dialog title</DialogTitle>
          <DialogBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogBody>
          <DialogActions>
            <DialogTrigger>
              <Button id="close-btn" appearance="secondary">
                Close
              </Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>,
    );
    cy.get('#open-btn').click();
    cy.get('#close-btn').should('be.focused');
  });
  it('should focus on body if no focusabled element in dialog', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button id="open-btn">Open dialog</Button>
        </DialogTrigger>
        <DialogSurface id="dialog-surface">
          <DialogTitle>Dialog title</DialogTitle>
          <DialogBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get('#open-btn').click();
    cy.focused().should('not.exist');
  });
  it('should focus back on trigger when dialog closed', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button id="open-btn">Open dialog</Button>
        </DialogTrigger>
        <DialogSurface id="dialog-surface">
          <DialogTitle>Dialog title</DialogTitle>
          <DialogBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogBody>
          <DialogActions>
            <DialogTrigger>
              <Button id="close-btn" appearance="secondary">
                Close
              </Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>,
    );
    cy.get('#open-btn').click();
    cy.get('#close-btn').click();
    cy.get('#open-btn').should('be.focused');
  });
  describe('modalType = modal', () => {
    it('should close with escape keydown', () => {
      mount(
        <Dialog modalType="modal">
          <DialogTrigger>
            <Button id="open-btn">Open dialog</Button>
          </DialogTrigger>
          <DialogSurface id="dialog-surface">
            <DialogTitle>Dialog title</DialogTitle>
            <DialogBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </DialogBody>
            <DialogActions>
              <DialogTrigger>
                <Button id="close-btn" appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogSurface>
        </Dialog>,
      );
      cy.get('#open-btn').click();
      cy.focused().type('{esc}');
      cy.get('#dialog-surface').should('not.exist');
    });
  });
  describe('modalType = non-modal', () => {
    it('should close with escape keydown', () => {
      mount(
        <Dialog modalType="non-modal">
          <DialogTrigger>
            <Button id="open-btn">Open dialog</Button>
          </DialogTrigger>
          <DialogSurface id="dialog-surface">
            <DialogTitle>Dialog title</DialogTitle>
            <DialogBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </DialogBody>
            <DialogActions>
              <DialogTrigger>
                <Button id="close-btn" appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogSurface>
        </Dialog>,
      );
      cy.get('#open-btn').click();
      cy.focused().type('{esc}');
      cy.get('#dialog-surface').should('not.exist');
    });
  });
  describe('modalType = alert', () => {
    it('should not close with escape keydown', () => {
      mount(
        <Dialog modalType="alert">
          <DialogTrigger>
            <Button id="open-btn">Open dialog</Button>
          </DialogTrigger>
          <DialogSurface id="dialog-surface">
            <DialogTitle>Dialog title</DialogTitle>
            <DialogBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </DialogBody>
            <DialogActions>
              <DialogTrigger>
                <Button id="close-btn" appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogSurface>
        </Dialog>,
      );
      cy.get('#open-btn').click();
      cy.focused().type('{esc}');
      cy.get('#dialog-surface').should('exist');
    });
  });
});
