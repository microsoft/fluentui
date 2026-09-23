import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { Provider } from '@fluentui/react-headless-components-preview/provider';
import type { JSXElement } from '@fluentui/react-utilities';

import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  dialogTitleClassNames,
} from '../../dialog';
import { Button } from '../../Button';

const dialogTriggerOpenId = 'open-btn';
const dialogTriggerOpenSelector = `#${dialogTriggerOpenId}`;
const dialogActionSelector = `.${dialogTitleClassNames.action}`;

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);

describe('DialogTitle', () => {
  describe('modalType = modal', () => {
    it('should not have closeButton by default', () => {
      mount(
        <Dialog modalType="modal">
          <DialogTrigger>
            <Button id={dialogTriggerOpenId}>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
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
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogActionSelector).should('not.exist');
    });
  });
  describe('modalType = non-modal', () => {
    it('should have closeButton by default', () => {
      mount(
        <Dialog modalType="non-modal">
          <DialogTrigger>
            <Button id={dialogTriggerOpenId}>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
              </DialogBody>
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
      cy.get(dialogActionSelector).should('exist');
    });
  });
  describe('modalType = alert', () => {
    it('should not have closeButton by default', () => {
      mount(
        <Dialog modalType="alert">
          <DialogTrigger>
            <Button id={dialogTriggerOpenId}>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
              </DialogBody>
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
      cy.get(dialogActionSelector).should('not.exist');
    });
  });
});
