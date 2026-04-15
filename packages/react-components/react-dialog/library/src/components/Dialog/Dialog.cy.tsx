import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import type { JSXElement } from '@fluentui/react-utilities';

import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-dialog';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-popover';
import { Tooltip } from '@fluentui/react-tooltip';
import { Button } from '@fluentui/react-button';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import {
  dialogSurfaceSelector,
  dialogTriggerCloseId,
  dialogTriggerCloseSelector,
  dialogTriggerOpenId,
  dialogTriggerOpenSelector,
} from '../../testing/selectors';

const mount = (element: JSXElement) => mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);

describe('Dialog', () => {
  it('should be closed by default', () => {
    mount(
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
              <DialogTrigger disableButtonEnhancement>
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
    cy.get(dialogTriggerOpenSelector).should('exist');
    cy.get(dialogSurfaceSelector).should('not.exist');
  });
  it('should open when trigger is clicked', () => {
    mount(
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
              <DialogTrigger disableButtonEnhancement>
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
    cy.get(dialogSurfaceSelector).should('exist');
  });
  it('should focus on first focusabled element when opened', () => {
    mount(
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
              <DialogTrigger disableButtonEnhancement>
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
        <DialogTrigger disableButtonEnhancement>
          <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
        <DialogTrigger disableButtonEnhancement>
          <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
              <DialogTrigger disableButtonEnhancement>
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

  it('should remain mounted after close when unmountOnClose is false', () => {
    mount(
      <Dialog unmountOnClose={false}>
        <DialogTrigger disableButtonEnhancement>
          <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
              <DialogTrigger disableButtonEnhancement>
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
    cy.get(dialogSurfaceSelector).should('exist');

    cy.get(dialogTriggerCloseSelector).realClick();
    // dialog surface should remain mounted when unmountOnClose is false
    cy.get(dialogSurfaceSelector).should('exist');
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
          <DialogTrigger disableButtonEnhancement>
            <Button id={dialogTriggerOpenId}>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogContent>This dialog focus on the second button instead of the first</DialogContent>
              <DialogActions position="start">
                <Button appearance="outline">Third Action</Button>
              </DialogActions>
              <DialogActions position="end">
                <DialogTrigger disableButtonEnhancement>
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
        <DialogTrigger disableButtonEnhancement>
          <Button id={dialogTriggerOpenId}>Open dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Button id="open-menu-btn">Toggle menu</Button>
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>Item</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
              <Popover>
                <PopoverTrigger disableButtonEnhancement>
                  <Button id="open-popover-btn">Popover trigger</Button>
                </PopoverTrigger>
                <PopoverSurface aria-label="label">Content</PopoverSurface>
              </Popover>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
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
    cy.get('#open-menu-btn').should('have.focus');

    // Open Popover and then close it with Escape
    cy.get('#open-popover-btn').realClick();
    cy.focused().realType('{esc}');
    cy.get(dialogSurfaceSelector).should('exist');
    cy.get('#open-popover-btn').should('have.focus');

    // Open Tooltip, wait for the tooltip to appear and then close it with Escape
    cy.get(dialogTriggerCloseSelector).focus().wait(0).realType('{esc}');
    cy.get(dialogSurfaceSelector).should('exist');
  });
  describe('modalType = modal', () => {
    it('should close with escape keydown', () => {
      mount(
        <Dialog modalType="modal">
          <DialogTrigger disableButtonEnhancement>
            <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
                <DialogTrigger disableButtonEnhancement>
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
      cy.focused().realType('{esc}');
      cy.get(dialogSurfaceSelector).should('not.exist');
    });
    it('should lock body scroll when dialog open', () => {
      mount(
        <>
          <Dialog modalType="modal">
            <DialogTrigger disableButtonEnhancement>
              <Button id={dialogTriggerOpenId}>Open dialog</Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
              </DialogBody>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button id={dialogTriggerCloseId} appearance="secondary">
                    Close
                  </Button>
                </DialogTrigger>
                <Button appearance="primary">Do Something</Button>
              </DialogActions>
            </DialogSurface>
          </Dialog>
          {lorem}
        </>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get('html').should('have.css', 'overflow', 'visible clip');
    });

    it('should focus trap by default', () => {
      mount(
        <Dialog modalType="modal">
          <DialogTrigger disableButtonEnhancement>
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
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button id="do-something-btn" appearance="primary">
                Do Something
              </Button>
            </DialogActions>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
      cy.get('#do-something-btn').should('be.focused').realPress('Tab');
      cy.get(dialogTriggerCloseSelector).should('be.focused');
    });
    it('should focus on window after last element when inertTrapFocus=true', () => {
      mount(
        <Dialog inertTrapFocus modalType="modal">
          <DialogTrigger disableButtonEnhancement>
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
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button id="do-something-btn" appearance="primary">
                Do Something
              </Button>
            </DialogActions>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
      cy.get('#do-something-btn').should('be.focused').realPress('Tab');
      cy.focused().should('not.exist');
    });
  });
  describe('modalType = non-modal', () => {
    it('should close with escape keydown and return focus to trigger', () => {
      mount(
        <Dialog modalType="non-modal">
          <DialogTrigger disableButtonEnhancement>
            <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
                <DialogTrigger disableButtonEnhancement>
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
      cy.focused().realType('{esc}');
      cy.get(dialogSurfaceSelector).should('not.exist');
      cy.get(dialogTriggerOpenSelector).should('be.focused');
    });
    it('should not lock body scroll when dialog open', () => {
      mount(
        <>
          <Dialog modalType="non-modal">
            <DialogTrigger disableButtonEnhancement>
              <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
                  <DialogTrigger disableButtonEnhancement>
                    <Button id={dialogTriggerCloseId} appearance="secondary">
                      Close
                    </Button>
                  </DialogTrigger>
                  <Button appearance="primary">Do Something</Button>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          {lorem}
        </>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get('html').should('not.have.css', 'overflow', 'visible clip');
    });
    it('should be able to focus inside non-modal dialog after navigating outside', () => {
      mount(
        <>
          <Dialog modalType="non-modal">
            <DialogTrigger disableButtonEnhancement>
              <Button id={dialogTriggerOpenId}>Open dialog</Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button id={dialogTriggerCloseId} appearance="secondary">
                      Close
                    </Button>
                  </DialogTrigger>
                  <Button id="extra-btn-inside" appearance="primary">
                    Do Something
                  </Button>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          <Button id="extra-btn-outside">Button outside dialog</Button>
        </>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogTriggerCloseSelector).should('be.focused');
      cy.get('#extra-btn-outside').realClick().should('be.focused');
      cy.get('#extra-btn-inside').realClick().should('be.focused').realType('{esc}');
      cy.get(dialogSurfaceSelector).should('not.exist');
    });
  });
  describe('modalType = alert', () => {
    it('should close with escape keydown', () => {
      mount(
        <Dialog modalType="alert">
          <DialogTrigger disableButtonEnhancement>
            <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
                <DialogTrigger disableButtonEnhancement>
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
      cy.focused().realType('{esc}');
      cy.get(dialogSurfaceSelector).should('not.exist');
    });
    it('should lock body scroll when dialog open', () => {
      mount(
        <>
          <Dialog modalType="alert">
            <DialogTrigger disableButtonEnhancement>
              <Button id={dialogTriggerOpenId}>Open dialog</Button>
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
                  <DialogTrigger disableButtonEnhancement>
                    <Button id={dialogTriggerCloseId} appearance="secondary">
                      Close
                    </Button>
                  </DialogTrigger>
                  <Button appearance="primary">Do Something</Button>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          {lorem}
        </>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get('html').should('have.css', 'overflow', 'visible clip');
    });
    it('should focus trap by default', () => {
      mount(
        <Dialog modalType="alert">
          <DialogTrigger disableButtonEnhancement>
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
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button id="do-something-btn" appearance="primary">
                Do Something
              </Button>
            </DialogActions>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
      cy.get('#do-something-btn').should('be.focused').realPress('Tab');
      cy.get(dialogTriggerCloseSelector).should('be.focused');
    });
    it('should focus on window after last element when inertTrapFocus=true', () => {
      mount(
        <Dialog inertTrapFocus modalType="alert">
          <DialogTrigger disableButtonEnhancement>
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
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button id="do-something-btn" appearance="primary">
                Do Something
              </Button>
            </DialogActions>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
      cy.get('#do-something-btn').should('be.focused').realPress('Tab');
      cy.focused().should('not.exist');
    });
  });

  it('should allow nested dialogs', () => {
    mount(
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button id="open-first-dialog-btn">Open nested dialog</Button>
        </DialogTrigger>
        <DialogSurface id="first-dialog">
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button id="close-first-dialog-btn">Close</Button>
              </DialogTrigger>
              <Dialog>
                <DialogTrigger disableButtonEnhancement>
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
                      <DialogTrigger disableButtonEnhancement>
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

  describe('stacked non-nested dialogs (sibling)', () => {
    /**
     * Regression test for https://github.com/microsoft/fluentui/issues/35985
     *
     * Two sibling Dialogs (NOT nested inside each other's JSX tree).
     * Dialog 1 is opened via a page-level trigger.
     * Dialog 2 is opened via a button inside Dialog 1, but is a sibling in the React tree.
     * When Dialog 2 closes, focus must return to the button inside Dialog 1 — NOT to the page trigger.
     *
     * Bug: Dialog 2's Modalizer leaves stale aria-hidden="true" on Dialog 1's portal mount node,
     * blocking browser focus restoration back into Dialog 1.
     */
    it('should restore focus to underlying dialog when top stacked dialog closes', () => {
      const StackedDialogsTest = () => {
        const [dialog1Open, setDialog1Open] = React.useState(false);
        const [dialog2Open, setDialog2Open] = React.useState(false);

        return (
          <>
            <Button id={dialogTriggerOpenId} onClick={() => setDialog1Open(true)}>
              Open Dialog 1
            </Button>

            {/* Dialog 1 — opened from the page-level trigger */}
            <Dialog open={dialog1Open} onOpenChange={(_, data) => setDialog1Open(data.open)}>
              <DialogSurface id="dialog-1-surface">
                <DialogBody>
                  <DialogTitle>Dialog 1</DialogTitle>
                  <DialogContent>Dialog 1 content</DialogContent>
                  <DialogActions>
                    <Button id="open-dialog-2-btn" onClick={() => setDialog2Open(true)}>
                      Open Dialog 2
                    </Button>
                    <Button id={dialogTriggerCloseId} onClick={() => setDialog1Open(false)}>
                      Close Dialog 1
                    </Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>

            {/* Dialog 2 — sibling in the React tree, NOT nested inside Dialog 1 */}
            <Dialog modalType="alert" open={dialog2Open} onOpenChange={(_, data) => setDialog2Open(data.open)}>
              <DialogSurface id="dialog-2-surface">
                <DialogBody>
                  <DialogTitle>Dialog 2 (alert)</DialogTitle>
                  <DialogContent>Dialog 2 content</DialogContent>
                  <DialogActions>
                    <Button id="close-dialog-2-btn" onClick={() => setDialog2Open(false)}>
                      Close Dialog 2
                    </Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </>
        );
      };

      mount(<StackedDialogsTest />);

      // Open Dialog 1
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get('#dialog-1-surface').should('exist');

      // Open Dialog 2 from inside Dialog 1
      cy.get('#open-dialog-2-btn').realClick();
      cy.get('#dialog-2-surface').should('exist');

      // Close Dialog 2
      cy.get('#close-dialog-2-btn').realClick();
      cy.get('#dialog-2-surface').should('not.exist');

      // Dialog 1 should still be open and the trigger button for Dialog 2 should have focus
      cy.get('#dialog-1-surface').should('exist');
      cy.get('#open-dialog-2-btn').should('be.focused');
    });

    it('should not have stale aria-hidden on dialog 1 portal ancestors after dialog 2 closes', () => {
      const StackedDialogsTest = () => {
        const [dialog1Open, setDialog1Open] = React.useState(false);
        const [dialog2Open, setDialog2Open] = React.useState(false);

        return (
          <>
            <Button id={dialogTriggerOpenId} onClick={() => setDialog1Open(true)}>
              Open Dialog 1
            </Button>
            <Dialog open={dialog1Open} onOpenChange={(_, data) => setDialog1Open(data.open)}>
              <DialogSurface id="dialog-1-surface">
                <DialogBody>
                  <DialogTitle>Dialog 1</DialogTitle>
                  <DialogActions>
                    <Button id="open-dialog-2-btn" onClick={() => setDialog2Open(true)}>
                      Open Dialog 2
                    </Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
            <Dialog modalType="alert" open={dialog2Open} onOpenChange={(_, data) => setDialog2Open(data.open)}>
              <DialogSurface id="dialog-2-surface">
                <DialogBody>
                  <DialogTitle>Dialog 2</DialogTitle>
                  <DialogActions>
                    <Button id="close-dialog-2-btn" onClick={() => setDialog2Open(false)}>
                      Close
                    </Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </>
        );
      };

      mount(<StackedDialogsTest />);

      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get('#open-dialog-2-btn').realClick();
      cy.get('#close-dialog-2-btn').realClick();

      // After Dialog 2 closes, no ancestor of Dialog 1's surface (up to body)
      // should carry a stale aria-hidden="true" (the backdrop div is intentionally aria-hidden but is not an ancestor)
      cy.get('#dialog-1-surface').then($el => {
        let el = $el[0].parentElement;
        while (el && el !== document.body) {
          expect(el.getAttribute('aria-hidden'), `ancestor <${el.tagName}> should not be aria-hidden`).to.not.equal(
            'true',
          );
          el = el.parentElement;
        }
      });
    });

    it('should maintain focus trap in dialog 1 after stacked dialog 2 is dismissed', () => {
      const StackedDialogsTest = () => {
        const [dialog1Open, setDialog1Open] = React.useState(false);
        const [dialog2Open, setDialog2Open] = React.useState(false);

        return (
          <>
            <Button id={dialogTriggerOpenId} onClick={() => setDialog1Open(true)}>
              Open Dialog 1
            </Button>
            <Dialog open={dialog1Open} onOpenChange={(_, data) => setDialog1Open(data.open)}>
              <DialogSurface id="dialog-1-surface">
                <DialogBody>
                  <DialogTitle>Dialog 1</DialogTitle>
                  <DialogActions>
                    <Button id="open-dialog-2-btn" onClick={() => setDialog2Open(true)}>
                      Open Dialog 2
                    </Button>
                    <Button id={dialogTriggerCloseId} onClick={() => setDialog1Open(false)}>
                      Close Dialog 1
                    </Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
            <Dialog modalType="modal" open={dialog2Open} onOpenChange={(_, data) => setDialog2Open(data.open)}>
              <DialogSurface id="dialog-2-surface">
                <DialogBody>
                  <DialogTitle>Dialog 2</DialogTitle>
                  <DialogActions>
                    <Button id="close-dialog-2-btn" onClick={() => setDialog2Open(false)}>
                      Close
                    </Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </>
        );
      };

      mount(<StackedDialogsTest />);

      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get('#open-dialog-2-btn').realClick();
      cy.get('#dialog-2-surface').should('exist');

      // Close Dialog 2 via its close button
      cy.get('#close-dialog-2-btn').realClick();
      cy.get('#dialog-2-surface').should('not.exist');
      cy.get('#dialog-1-surface').should('exist');

      // Tab should cycle inside Dialog 1 (focus trap re-engaged)
      cy.get('#open-dialog-2-btn').should('be.focused').realPress('Tab');
      cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
      cy.get('#open-dialog-2-btn').should('be.focused');
    });
  });
});

const lorem = (
  <>
    {Array.from({ length: 10 }, (_, i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
        dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
        eaque?
      </p>
    ))}
  </>
);
