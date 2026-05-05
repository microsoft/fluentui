import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import type { JSXElement } from '@fluentui/react-utilities';

import { Dialog, DialogActions, DialogBody, DialogSurface, DialogTitle, DialogTrigger } from '.';
import type { DialogProps, DialogSurfaceProps } from '.';
import { Button } from '../Button';
import { Provider } from '../Provider';
// TODO: replace with headless alternatives when available
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-popover';
import { Tooltip } from '@fluentui/react-tooltip';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';

const dialogTriggerId = 'dialog-trigger';
const dialogTriggerOpenId = `${dialogTriggerId}-open`;
const dialogTriggerCloseId = `${dialogTriggerId}-close`;
const dialogPrimaryButtonId = 'do-something-btn';
const dialogSurfaceSelector = `dialog[open]`;
const dialogSurfaceElementSelector = `dialog`;
const dialogTriggerOpenSelector = `#${dialogTriggerOpenId}`;
const dialogTriggerCloseSelector = `#${dialogTriggerCloseId}`;
const dialogPrimaryButtonSelector = `#${dialogPrimaryButtonId}`;

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);

type BasicDialogProps = Omit<DialogProps, 'children'> & {
  /**
   * Render without the primary action button — used to verify focus-on-surface
   * fallback when the dialog has no tabbable descendants.
   */
  withoutActions?: boolean;
  /**
   * Ref forwarded to the close button (second `DialogTrigger`). Useful for tests
   * that need to programmatically focus it.
   */
  closeButtonRef?: React.Ref<HTMLButtonElement>;
  /** Extra props forwarded to `DialogSurface` (e.g. `id`, `style`). */
  surfaceProps?: DialogSurfaceProps;
};

/**
 * Reusable dialog fixture used by most tests. Covers the common shape:
 * trigger → surface → body → title + content + actions(close, primary).
 */
const BasicDialog: React.FC<BasicDialogProps> = ({ withoutActions, closeButtonRef, surfaceProps, ...dialogProps }) => (
  <Dialog {...dialogProps}>
    <DialogTrigger>
      <Button id={dialogTriggerOpenId}>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface {...surfaceProps}>
      <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </div>
        {!withoutActions && (
          <DialogActions>
            <DialogTrigger>
              <Button id={dialogTriggerCloseId} ref={closeButtonRef}>
                Close
              </Button>
            </DialogTrigger>
            <Button id={dialogPrimaryButtonId}>Do Something</Button>
          </DialogActions>
        )}
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

describe('Dialog', () => {
  it('should be closed by default', () => {
    mount(<BasicDialog />);
    cy.get(dialogTriggerOpenSelector).should('exist');
    cy.get(dialogSurfaceSelector).should('not.exist');
  });

  it('should open when trigger is clicked', () => {
    mount(<BasicDialog />);
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogSurfaceSelector).should('exist');
  });

  it('should focus on first focusabled element when opened', () => {
    mount(<BasicDialog />);
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogTriggerCloseSelector).should('be.focused');
  });

  it('should focus on dialog surface if no focusable element in dialog', () => {
    mount(<BasicDialog withoutActions surfaceProps={{ id: 'dialog-surface' }} />);
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogSurfaceSelector).should('be.focused');
  });

  it('should focus back on trigger when dialog closed', () => {
    mount(<BasicDialog />);
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogTriggerCloseSelector).realClick();
    cy.get(dialogTriggerOpenSelector).should('be.focused');
  });

  it('should remain mounted after close when unmountOnClose is false', () => {
    mount(<BasicDialog unmountOnClose={false} />);

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
      return <BasicDialog open={open} onOpenChange={(_event, data) => setOpen(data.open)} closeButtonRef={buttonRef} />;
    };
    mount(<CustomFocusedElementOnOpen />);
    cy.get(dialogTriggerOpenSelector).realClick();
    cy.get(dialogTriggerCloseSelector).should('be.focused');
  });

  it('should not close with Escape keydown while focusing other elements that control Escape', () => {
    mount(
      <Dialog modalType="non-modal">
        <DialogTrigger>
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
            <DialogActions>
              <DialogTrigger>
                <Tooltip hideDelay={0} showDelay={0} content="Test tooltip" relationship="label">
                  <Button id={dialogTriggerCloseId}>Close</Button>
                </Tooltip>
              </DialogTrigger>
              <Button>Do Something</Button>
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

  const modalTypes = ['modal', 'non-modal', 'alert'] as const;

  modalTypes.forEach(modalType => {
    describe(`modalType = ${modalType}`, () => {
      it('should close with escape keydown', () => {
        mount(<BasicDialog modalType={modalType} />);
        cy.get(dialogTriggerOpenSelector).realClick();
        cy.focused().realType('{esc}');
        cy.get(dialogSurfaceSelector).should('not.exist');
      });

      if (modalType === 'non-modal') {
        it('should close with escape keydown and return focus to trigger', () => {
          mount(<BasicDialog modalType={modalType} />);
          cy.get(dialogTriggerOpenSelector).realClick();
          cy.focused().realType('{esc}');
          cy.get(dialogSurfaceSelector).should('not.exist');
          cy.get(dialogTriggerOpenSelector).should('be.focused');
        });
      }

      it('should preserve html overflow styles when dialog opens', () => {
        mount(
          <>
            <BasicDialog modalType={modalType} />
            {Array.from({ length: 10 }, (_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
                eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
                natus iure cumque eaque?
              </p>
            ))}
          </>,
        );
        cy.get('html')
          .invoke('css', 'overflow')
          .then(initialOverflow => {
            cy.get(dialogTriggerOpenSelector).realClick();
            cy.get('html').should('have.css', 'overflow', initialOverflow);
          });
      });

      // Focus trap tests apply to modal/alert only — non-modal is intentionally not trapped.
      if (modalType !== 'non-modal') {
        // TODO: re-enable skipped test after introducing focus trap implementation
        it.skip('should focus trap by default', () => {
          mount(<BasicDialog modalType={modalType} />);
          cy.get(dialogTriggerOpenSelector).realClick();
          cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
          cy.get(dialogPrimaryButtonSelector).should('be.focused').realPress('Tab');
          cy.get(dialogTriggerCloseSelector).should('be.focused');
        });

        it.skip('should keep focus trapped when inertTrapFocus=true', () => {
          mount(<BasicDialog inertTrapFocus modalType={modalType} />);
          cy.get(dialogTriggerOpenSelector).realClick();
          cy.get(dialogTriggerCloseSelector).should('be.focused').realPress('Tab');
          cy.get(dialogPrimaryButtonSelector).should('be.focused').realPress('Tab');
          cy.get(dialogTriggerCloseSelector).should('be.focused');
        });
      }
    });
  });

  describe('modalType = non-modal', () => {
    it('should be able to focus inside non-modal dialog after navigating outside', () => {
      mount(
        <>
          {/*
            The headless component ships no default styles. The UA stylesheet combined
            with the portal mount node (`position: absolute; top: 0; left: 0; right: 0`)
            pins the non-modal dialog to the top of the viewport, where it would overlap
            and intercept clicks on the sibling "outside" button. Position it out of the
            way so this test can verify focus behaviour rather than layout.
          */}
          <BasicDialog
            modalType="non-modal"
            surfaceProps={{
              style: { position: 'fixed', top: 'auto', bottom: 0, right: 0, left: 'auto', margin: 0 },
            }}
          />
          <Button id="extra-btn-outside">Button outside dialog</Button>
        </>,
      );
      cy.get(dialogTriggerOpenSelector).realClick();
      cy.get(dialogTriggerCloseSelector).should('be.focused');
      cy.get('#extra-btn-outside').realClick().should('be.focused');
      cy.get(dialogPrimaryButtonSelector).realClick().should('be.focused').realType('{esc}');
      cy.get(dialogSurfaceSelector).should('not.exist');
    });
  });

  it('should allow nested dialogs', () => {
    // Nested structure is intentionally bespoke — kept inline for clarity.
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
                  <Button id="open-second-dialog-btn">Open inner dialog</Button>
                </DialogTrigger>
                <DialogSurface id="second-dialog">
                  <DialogBody>
                    <DialogTitle>Inner dialog title</DialogTitle>
                    <div>⛔️ just because you can doesn't mean you should have nested dialogs ⛔️</div>
                    <DialogActions>
                      <DialogTrigger>
                        <Button id="close-second-dialog-btn">Close</Button>
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
