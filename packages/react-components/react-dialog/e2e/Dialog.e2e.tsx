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
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Tooltip,
} from '@fluentui/react-components';
import {
  dialogSurfaceSelector,
  dialogTriggerCloseId,
  dialogTriggerCloseSelector,
  dialogTriggerOpenSelector,
} from './selectors';

const mount = (element: JSX.Element) => mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);

describe('Dialog', () => {
  it('should be closed by default', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button>Open dialog</Button>
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
    cy.get(dialogTriggerOpenSelector).should('exist');
    cy.get(dialogSurfaceSelector).should('not.exist');
  });
  it('should open when trigger is clicked', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button>Open dialog</Button>
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
  it('should focus on first focusabled element when opened', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button>Open dialog</Button>
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
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogTriggerCloseSelector).should('be.focused');
  });
  it('should focus on dialog surface if no focusable element in dialog', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogSurface id="dialog-surface">
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogSurfaceSelector).should('be.focused');
  });
  it('should focus back on trigger when dialog closed', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button>Open dialog</Button>
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
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogTriggerCloseSelector).realClick();
    cy.get(dialogTriggerOpenSelector).should('be.focused');
  });
  it('should allow change of focus on open', () => {
    const CustomFocusedElementOnOpen = () => {
      const buttonRef = React.useRef<HTMLButtonElement>(null);
      const [open, setOpen] = React.useState(false);
      React.useEffect(() => {
        if (open && buttonRef.current) {
          buttonRef.current.focus();
        }
      }, [open]);
      return (
        <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
          <DialogTrigger>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogContent>This dialog focus on the second button instead of the first</DialogContent>
              <DialogActions position="start">
                <Button appearance="outline">Third Action</Button>
              </DialogActions>
              <DialogActions position="end">
                <DialogTrigger>
                  <Button id={dialogTriggerCloseId} ref={buttonRef} appearance="secondary">
                    Close
                  </Button>
                </DialogTrigger>
                <Button appearance="primary">Do Something</Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      );
    };
    mount(<CustomFocusedElementOnOpen />);
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogTriggerCloseSelector).should('be.focused');
  });
  it('should not close with Escape keydown while focusing other elements that control Escape', () => {
    mount(
      <Dialog modalType="non-modal">
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              <Menu>
                <MenuTrigger>
                  <Button id="open-menu-btn">Toggle menu</Button>
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>Item</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
              <Popover>
                <PopoverTrigger>
                  <Button id="open-popover-btn">Popover trigger</Button>
                </PopoverTrigger>
                <PopoverSurface aria-label="label">Content</PopoverSurface>
              </Popover>
            </DialogContent>
            <DialogActions>
              <DialogTrigger>
                <Tooltip hideDelay={0} showDelay={0} content="Test tooltip" relationship="label">
                  <Button id={dialogTriggerCloseId} appearance="secondary">
                    Close
                  </Button>
                </Tooltip>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    // Open Menu and then close it with Escape
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get('#open-menu-btn').realClick();
    cy.focused().realType('{esc}');
    cy.get(dialogSurfaceSelector).should('exist');

    // Open Popover and then close it with Escape
    cy.get('#open-popover-btn').realClick();
    cy.focused().realType('{esc}');
    cy.get(dialogSurfaceSelector).should('exist');

    // Open Tooltip, wait for the tooltip to appear and then close it with Escape
    cy.get(dialogTriggerCloseSelector).focus().wait(0).realType('{esc}');
    cy.get(dialogSurfaceSelector).should('exist');
  });
  describe('modalType = modal', () => {
    it('should close with escape keydown', () => {
      mount(
        <Dialog modalType="modal">
          <DialogTrigger>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
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
      cy.focused().realType('{esc}');
      cy.get(dialogSurfaceSelector).should('not.exist');
    });
    it('should lock body scroll when dialog open', () => {
      mount(
        <Dialog modalType="modal">
          <DialogTrigger>
            <Button>Open dialog</Button>
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
      cy.get('body').should('have.css', 'overflow', 'hidden');
    });
  });
  describe('modalType = non-modal', () => {
    it('should close with escape keydown', () => {
      mount(
        <Dialog modalType="non-modal">
          <DialogTrigger>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
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
      cy.focused().realType('{esc}');
      cy.get(dialogSurfaceSelector).should('not.exist');
    });
    it('should not lock body scroll when dialog open', () => {
      mount(
        <Dialog modalType="non-modal">
          <DialogTrigger>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
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
      cy.get('body').should('not.have.css', 'overflow', 'hidden');
    });
  });
  describe('modalType = alert', () => {
    it('should not close with escape keydown', () => {
      mount(
        <Dialog modalType="alert">
          <DialogTrigger>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
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
      cy.focused().realType('{esc}');
      cy.get(dialogSurfaceSelector).should('exist');
    });
    it('should lock body scroll when dialog open', () => {
      mount(
        <Dialog modalType="alert">
          <DialogTrigger>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
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
      cy.get('body').should('have.css', 'overflow', 'hidden');
    });
  });

  it('should allow nested dialogs', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button id="open-first-dialog-btn">Open nested dialog</Button>
        </DialogTrigger>
        <DialogSurface id="first-dialog">
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogActions>
              <DialogTrigger>
                <Button id="close-first-dialog-btn">Close</Button>
              </DialogTrigger>
              <Dialog>
                <DialogTrigger>
                  <Button id="open-second-dialog-btn" appearance="primary">
                    Open inner dialog
                  </Button>
                </DialogTrigger>
                <DialogSurface id="second-dialog">
                  <DialogBody>
                    <DialogTitle>Inner dialog title</DialogTitle>
                    <DialogContent>
                      ⛔️ just because you can doesn't mean you should have nested dialogs ⛔️
                    </DialogContent>
                    <DialogActions>
                      <DialogTrigger>
                        <Button id="close-second-dialog-btn" appearance="primary">
                          Close
                        </Button>
                      </DialogTrigger>
                    </DialogActions>
                  </DialogBody>
                </DialogSurface>
              </Dialog>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get('#open-first-dialog-btn').realClick();
    cy.get('#first-dialog').should('exist');
    cy.get('#second-dialog').should('not.exist');
    cy.get('#open-second-dialog-btn').should('exist').realClick();
    cy.get('#second-dialog').should('exist');
    cy.get('#close-second-dialog-btn').should('exist').realClick();
    cy.get('#second-dialog').should('not.exist');
    cy.get('#first-dialog').should('exist');
    cy.get('#close-first-dialog-btn').should('exist').realClick();
    cy.get('#second-dialog').should('not.exist');
    cy.get('#first-dialog').should('not.exist');
  });
});
