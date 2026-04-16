import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import type { JSXElement } from '@fluentui/react-utilities';

import { Dialog, DialogFooter, DialogBody, DialogSurface, DialogTitle, DialogTrigger } from '.';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-popover';
import { Tooltip } from '@fluentui/react-tooltip';
import { Button } from '@fluentui/react-button';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';

const dialogTriggerId = 'dialog-trigger';
const dialogTriggerOpenId = `${dialogTriggerId}-open`;
const dialogTriggerCloseId = `${dialogTriggerId}-close`;
const dialogSurfaceSelector = `dialog[open]`;
const dialogSurfaceElementSelector = `dialog`;
const dialogTriggerOpenSelector = `#${dialogTriggerOpenId}`;
const dialogTriggerCloseSelector = `#${dialogTriggerCloseId}`;

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
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </div>
            <DialogFooter>
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogFooter>
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
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </div>
            <DialogFooter>
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogFooter>
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
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </div>
            <DialogFooter>
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogFooter>
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
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </div>
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
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </div>
            <DialogFooter>
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogFooter>
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
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </div>
            <DialogFooter>
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogFooter>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );

    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogSurfaceSelector).should('exist');

    cy.get(dialogTriggerCloseSelector).realClick();
    // dialog surface should remain mounted but no longer be open when unmountOnClose is false
    cy.get(dialogSurfaceElementSelector).should('exist');
    cy.get(dialogSurfaceElementSelector).should('not.have.attr', 'open');
    cy.get(dialogSurfaceSelector).should('not.exist');
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
              <div>This dialog focus on the second button instead of the first</div>
              <DialogFooter>
                <Button appearance="outline">Third Action</Button>
              </DialogFooter>
              <DialogFooter>
                <DialogTrigger disableButtonEnhancement>
                  <Button id={dialogTriggerCloseId} ref={buttonRef} appearance="secondary">
                    Close
                  </Button>
                </DialogTrigger>
                <Button appearance="primary">Do Something</Button>
              </DialogFooter>
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
            <div>
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
            </div>
            <DialogFooter>
              <DialogTrigger disableButtonEnhancement>
                <Tooltip hideDelay={0} showDelay={0} content="Test tooltip" relationship="label">
                  <Button id={dialogTriggerCloseId} appearance="secondary">
                    Close
                  </Button>
                </Tooltip>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogFooter>
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
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
              </div>
              <DialogFooter>
                <DialogTrigger disableButtonEnhancement>
                  <Button id={dialogTriggerCloseId} appearance="secondary">
                    Close
                  </Button>
                </DialogTrigger>
                <Button appearance="primary">Do Something</Button>
              </DialogFooter>
            </DialogBody>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.focused().realType('{esc}');
      cy.get(dialogSurfaceSelector).should('not.exist');
    });
    it('should preserve html overflow styles when dialog opens', () => {
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
              <DialogFooter>
                <DialogTrigger disableButtonEnhancement>
                  <Button id={dialogTriggerCloseId} appearance="secondary">
                    Close
                  </Button>
                </DialogTrigger>
                <Button appearance="primary">Do Something</Button>
              </DialogFooter>
            </DialogSurface>
          </Dialog>
          {lorem}
        </>,
      );
      cy.get('html')
        .invoke('css', 'overflow')
        .then(initialOverflow => {
          cy.get(dialogTriggerOpenSelector).realClick();
          cy.get('html').should('have.css', 'overflow', initialOverflow);
        });
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
            <DialogFooter>
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button id="do-something-btn" appearance="primary">
                Do Something
              </Button>
            </DialogFooter>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
      cy.get('#do-something-btn').should('be.focused').realPress('Tab');
      cy.get(dialogTriggerCloseSelector).should('be.focused');
    });
    it('should keep focus trapped when inertTrapFocus=true', () => {
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
            <DialogFooter>
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button id="do-something-btn" appearance="primary">
                Do Something
              </Button>
            </DialogFooter>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
      cy.get('#do-something-btn').should('be.focused').realPress('Tab');
      cy.get(dialogTriggerCloseSelector).should('be.focused');
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
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
              </div>
              <DialogFooter>
                <DialogTrigger disableButtonEnhancement>
                  <Button id={dialogTriggerCloseId} appearance="secondary">
                    Close
                  </Button>
                </DialogTrigger>
                <Button appearance="primary">Do Something</Button>
              </DialogFooter>
            </DialogBody>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.focused().realType('{esc}');
      cy.get(dialogSurfaceSelector).should('not.exist');
      cy.get(dialogTriggerOpenSelector).should('be.focused');
    });
    it('should preserve html overflow styles when dialog opens', () => {
      mount(
        <>
          <Dialog modalType="non-modal">
            <DialogTrigger disableButtonEnhancement>
              <Button id={dialogTriggerOpenId}>Open dialog</Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Dialog title</DialogTitle>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                  eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                  natus iure cumque eaque?
                </div>
                <DialogFooter>
                  <DialogTrigger disableButtonEnhancement>
                    <Button id={dialogTriggerCloseId} appearance="secondary">
                      Close
                    </Button>
                  </DialogTrigger>
                  <Button appearance="primary">Do Something</Button>
                </DialogFooter>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          {lorem}
        </>,
      );
      cy.get('html')
        .invoke('css', 'overflow')
        .then(initialOverflow => {
          cy.get(dialogTriggerOpenSelector).realClick();
          cy.get('html').should('have.css', 'overflow', initialOverflow);
        });
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
                <DialogFooter>
                  <DialogTrigger disableButtonEnhancement>
                    <Button id={dialogTriggerCloseId} appearance="secondary">
                      Close
                    </Button>
                  </DialogTrigger>
                  <Button id="extra-btn-inside" appearance="primary">
                    Do Something
                  </Button>
                </DialogFooter>
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
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
              </div>
              <DialogFooter>
                <DialogTrigger disableButtonEnhancement>
                  <Button id={dialogTriggerCloseId} appearance="secondary">
                    Close
                  </Button>
                </DialogTrigger>
                <Button appearance="primary">Do Something</Button>
              </DialogFooter>
            </DialogBody>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.focused().realType('{esc}');
      cy.get(dialogSurfaceSelector).should('not.exist');
    });
    it('should preserve html overflow styles when dialog opens', () => {
      mount(
        <>
          <Dialog modalType="alert">
            <DialogTrigger disableButtonEnhancement>
              <Button id={dialogTriggerOpenId}>Open dialog</Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Dialog title</DialogTitle>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                  eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                  natus iure cumque eaque?
                </div>
                <DialogFooter>
                  <DialogTrigger disableButtonEnhancement>
                    <Button id={dialogTriggerCloseId} appearance="secondary">
                      Close
                    </Button>
                  </DialogTrigger>
                  <Button appearance="primary">Do Something</Button>
                </DialogFooter>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          {lorem}
        </>,
      );
      cy.get('html')
        .invoke('css', 'overflow')
        .then(initialOverflow => {
          cy.get(dialogTriggerOpenSelector).realClick();
          cy.get('html').should('have.css', 'overflow', initialOverflow);
        });
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
            <DialogFooter>
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button id="do-something-btn" appearance="primary">
                Do Something
              </Button>
            </DialogFooter>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
      cy.get('#do-something-btn').should('be.focused').realPress('Tab');
      cy.get(dialogTriggerCloseSelector).should('be.focused');
    });
    it('should keep focus trapped when inertTrapFocus=true', () => {
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
            <DialogFooter>
              <DialogTrigger disableButtonEnhancement>
                <Button id={dialogTriggerCloseId} appearance="secondary">
                  Close
                </Button>
              </DialogTrigger>
              <Button id="do-something-btn" appearance="primary">
                Do Something
              </Button>
            </DialogFooter>
          </DialogSurface>
        </Dialog>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
      cy.get('#do-something-btn').should('be.focused').realPress('Tab');
      cy.get(dialogTriggerCloseSelector).should('be.focused');
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
            <DialogFooter>
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
                    <div>⛔️ just because you can doesn't mean you should have nested dialogs ⛔️</div>
                    <DialogFooter>
                      <DialogTrigger disableButtonEnhancement>
                        <Button id="close-second-dialog-btn" appearance="primary">
                          Close
                        </Button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogBody>
                </DialogSurface>
              </Dialog>
            </DialogFooter>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );
    cy.get('#open-first-dialog-btn').realClick();
    cy.get(dialogSurfaceSelector).should('have.length', 1);
    cy.get('#open-second-dialog-btn').should('exist').realClick();
    cy.get(dialogSurfaceSelector).should('have.length', 2);
    // Use Escape to close only the top-most nested dialog.
    // Clicking inside nested modal dialogs can be interpreted as a backdrop click
    // by the parent native <dialog> in some browsers.
    cy.get('#close-second-dialog-btn').should('exist').focus().realType('{esc}');
    cy.get(dialogSurfaceSelector).should('have.length', 1);
    cy.get('#close-first-dialog-btn').should('exist').realClick();
    cy.get(dialogSurfaceSelector).should('not.exist');
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
