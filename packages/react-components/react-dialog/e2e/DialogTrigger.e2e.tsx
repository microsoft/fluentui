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
import { dialogSurfaceSelector, dialogTriggerOpenSelector } from './selectors';

const mount = (element: JSX.Element) => mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);

describe('DialogTrigger', () => {
  it(`should not open dialog when 'aria-disabled' is true`, () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <button aria-disabled>Open dialog</button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </DialogContent>
            <DialogActions>
              <DialogTrigger>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogSurfaceSelector).should('not.exist');
  });
  it(`should open dialog when 'aria-disabled' is false`, () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <button aria-disabled={false}>Open dialog</button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </DialogContent>
            <DialogActions>
              <DialogTrigger>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogSurfaceSelector).should('exist');
  });
  it('should work with any element besides <button>', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <div>Open dialog</div>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </DialogContent>
            <DialogActions>
              <DialogTrigger>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogSurfaceSelector).should('exist');
  });
});
