import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import { Menu, MenuPopover, MenuList, MenuItem, MenuTrigger } from './';
import { Tooltip } from '../Tooltip';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => mountBase(element);

polyfillBodyAndObserve();

describe('Menu', () => {
  describe('autofocus suppression', () => {
    const Example = ({
      disableAutoFocus,
      initiallyOpen = false,
      keepOpenOnClose = false,
    }: {
      disableAutoFocus?: boolean;
      initiallyOpen?: boolean;
      keepOpenOnClose?: boolean;
    }) => {
      const [open, setOpen] = React.useState(initiallyOpen);
      const [suppressFocus, setSuppressFocus] = React.useState(disableAutoFocus);
      const firstItemRef = React.useRef<HTMLDivElement>(null);
      const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'F2') {
          setSuppressFocus(false);
        } else if (event.key === 'F3') {
          setSuppressFocus(undefined);
        } else if (event.key === 'F4') {
          setSuppressFocus(true);
        }
      };

      return (
        <>
          <button>Before trigger</button>
          <Menu
            open={open}
            onOpenChange={(_, data) => {
              if (data.open || !keepOpenOnClose) {
                setOpen(data.open);
              }
            }}
            unstable_disableAutoFocus={suppressFocus}
          >
            <MenuTrigger>
              <button
                onKeyDown={event => {
                  onKeyDown(event);
                  if (event.key === 'ArrowDown' && open) {
                    event.preventDefault();
                    firstItemRef.current?.focus();
                  }
                }}
              >
                Open commands
              </button>
            </MenuTrigger>
            <MenuPopover onKeyDown={onKeyDown}>
              <MenuList>
                <MenuItem ref={firstItemRef}>First command</MenuItem>
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <MenuItem>More commands</MenuItem>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem>Nested command</MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </MenuList>
            </MenuPopover>
          </Menu>
          <button>After trigger</button>
        </>
      );
    };

    [undefined, false].forEach(disableAutoFocus => {
      it(`preserves opening autofocus when suppression is ${disableAutoFocus}`, () => {
        mount(<Example disableAutoFocus={disableAutoFocus} />);
        cy.contains('button', 'Open commands').click();
        cy.contains('[role="menuitem"]', 'First command').should('be.visible').should('be.focused');
      });
    });

    it('keeps focus on the trigger when opening with suppression enabled', () => {
      mount(
        <React.StrictMode>
          <Example disableAutoFocus />
        </React.StrictMode>,
      );
      cy.contains('button', 'Open commands').click();
      cy.contains('[role="menuitem"]', 'First command').should('be.visible').should('not.have.attr', 'autofocus');
      cy.contains('button', 'Open commands').should('be.focused');
    });

    it('preserves typing and selection while externally controlled results open', () => {
      const SearchResults = () => {
        const [query, setQuery] = React.useState('');
        const [input, setInput] = React.useState<HTMLInputElement | null>(null);
        return (
          <>
            <input
              ref={setInput}
              aria-label="Find commands"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            <Menu open={query.length > 0} positioning={{ target: input }} unstable_disableAutoFocus>
              <MenuPopover>
                <MenuList aria-label="Commands" aria-labelledby={undefined}>
                  <MenuItem>Command {query}</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </>
        );
      };
      mount(<SearchResults />);
      cy.get('input').type('abc').should('be.focused').should('have.value', 'abc');
      cy.contains('[role="menuitem"]', 'Command abc').should('be.visible');
      cy.get('input').then(input => input[0].setSelectionRange(1, 2));
      cy.get('input').realPress('x');
      cy.get('input').should('be.focused').should('have.value', 'axc');
      cy.contains('[role="menuitem"]', 'Command axc').should('be.visible');
      cy.get('input').should(input => {
        expect(input[0].selectionStart).to.equal(2);
        expect(input[0].selectionEnd).to.equal(2);
      });
    });

    it('suppresses autofocus when initially open', () => {
      mount(<Example disableAutoFocus initiallyOpen />);
      cy.contains('[role="menuitem"]', 'First command').should('be.visible').should('not.be.focused');
    });

    it('supports owner-driven entry and focusgroup navigation', () => {
      mount(<Example disableAutoFocus />);
      cy.contains('button', 'Open commands').click().realPress('ArrowDown');
      cy.contains('[role="menuitem"]', 'First command')
        .should('be.focused')
        .should('have.attr', 'tabindex', '0')
        .realPress('ArrowDown');
      cy.contains('[role="menuitem"]', 'More commands').should('be.focused');
    });

    it('focuses the first item when suppression is turned off while open', () => {
      mount(<Example disableAutoFocus />);
      cy.contains('button', 'Open commands').click();
      cy.contains('[role="menuitem"]', 'First command').should('be.visible');
      cy.contains('button', 'Open commands').realPress('F2');
      cy.contains('[role="menuitem"]', 'First command').should('be.focused');
    });

    it('does not move existing item focus when suppression is enabled', () => {
      mount(<Example />);
      cy.contains('button', 'Open commands').click();
      cy.contains('[role="menuitem"]', 'First command').should('be.focused').realPress('ArrowDown');
      cy.contains('[role="menuitem"]', 'More commands').should('be.focused').realPress('F4');
      cy.contains('[role="menuitem"]', 'More commands').should('be.focused');
    });

    it('preserves item focus when suppression changes between false and undefined', () => {
      mount(<Example disableAutoFocus={false} />);
      cy.contains('button', 'Open commands').click();
      cy.contains('[role="menuitem"]', 'First command').should('be.focused').realPress('ArrowDown');
      cy.contains('[role="menuitem"]', 'More commands').should('be.focused').realPress('F3');
      cy.contains('[role="menuitem"]', 'More commands').should('be.focused').realPress('F2');
      cy.contains('[role="menuitem"]', 'More commands').should('be.focused');
    });

    it('does not move focus when the flag changes while closed', () => {
      mount(<Example disableAutoFocus />);
      cy.contains('button', 'Open commands')
        .should(trigger => {
          expect(trigger[0].ownerDocument.activeElement).to.equal(trigger[0].ownerDocument.body);
        })
        .trigger('keydown', { key: 'F2' })
        .should('not.be.focused');
      cy.contains('[role="menuitem"]', 'First command').should('not.be.visible');
    });

    it('removes its autofocus attribute before a suppressed reopening', () => {
      mount(<Example />);
      cy.contains('button', 'Open commands').click();
      cy.contains('[role="menuitem"]', 'First command')
        .should('be.focused')
        .should('have.attr', 'autofocus')
        .realPress('F4');
      cy.contains('[role="menuitem"]', 'First command').should('not.have.attr', 'autofocus').realPress('Escape');
      cy.contains('button', 'Open commands').should('be.focused').click();
      cy.contains('[role="menuitem"]', 'First command').should('be.visible').should('not.be.focused');
      cy.contains('button', 'Open commands').should('be.focused');
    });

    it('preserves a consumer-authored autofocus attribute on cleanup', () => {
      const setAutoFocus = (element: HTMLDivElement | null) => {
        element?.setAttribute('autofocus', '');
      };
      mount(
        <Menu defaultOpen>
          <MenuPopover>
            <MenuList>
              <MenuItem ref={setAutoFocus}>Consumer autofocus</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );
      cy.contains('[role="menuitem"]', 'Consumer autofocus').should('be.focused').realPress('Escape');
      cy.contains('[role="menuitem"]', 'Consumer autofocus').should('not.be.visible').should('have.attr', 'autofocus');
    });

    it('preserves submenu autofocus and Escape restoration', () => {
      mount(<Example disableAutoFocus />);
      cy.contains('button', 'Open commands').click().realPress('ArrowDown');
      cy.contains('[role="menuitem"]', 'First command').should('be.focused').realPress('ArrowDown');
      cy.contains('[role="menuitem"]', 'More commands').should('be.focused').realPress('ArrowRight');
      cy.contains('[role="menuitem"]', 'Nested command').should('be.focused').realPress('Escape');
      cy.contains('[role="menuitem"]', 'More commands').should('be.focused').realPress('Escape');
      cy.contains('button', 'Open commands').should('be.focused');
      cy.contains('[role="menuitem"]', 'First command').should('not.be.visible');
    });

    [false, true].forEach(disableAutoFocus => {
      [false, true].forEach(fromSubmenu => {
        (['Tab', ['Shift', 'Tab']] as const).forEach(key => {
          const keyName = typeof key === 'string' ? key : key.join('+');
          it(`preserves native ${keyName} exit from ${
            fromSubmenu ? 'nested' : 'root'
          } items with suppression ${disableAutoFocus}`, () => {
            mount(<Example disableAutoFocus={disableAutoFocus} />);
            cy.contains('button', 'Open commands').click();
            if (disableAutoFocus) {
              cy.contains('button', 'Open commands').realPress('ArrowDown');
            }
            cy.contains('[role="menuitem"]', 'First command').should('be.focused');
            if (fromSubmenu) {
              cy.contains('[role="menuitem"]', 'First command').realPress('ArrowDown');
              cy.contains('[role="menuitem"]', 'More commands').should('be.focused').realPress('ArrowRight');
              cy.contains('[role="menuitem"]', 'Nested command').should('be.focused');
            }
            cy.realPress(typeof key === 'string' ? key : [...key]);
            cy.contains('button', typeof key === 'string' ? 'After trigger' : 'Before trigger').should('be.focused');
            cy.get('[role="menu"]').should('not.be.visible');
          });
        });
      });
    });

    it('keeps the native surface open when the controlled owner declines closing', () => {
      mount(<Example disableAutoFocus keepOpenOnClose />);
      cy.contains('button', 'Open commands').click().realPress('ArrowDown');
      cy.contains('[role="menuitem"]', 'First command').should('be.focused').realPress('Escape');
      cy.contains('[role="menuitem"]', 'First command').should('be.visible').should('be.focused');
      cy.get('[role="menu"]')
        .first()
        .parent()
        .should(surface => {
          expect(surface[0].matches(':popover-open')).to.be.true;
        });
    });

    it('does not emit a duplicate close request when hiding the native surface', () => {
      const onOpenChange = cy.spy().as('onOpenChange');
      mount(
        <Menu onOpenChange={onOpenChange}>
          <MenuTrigger>
            <button>Open commands</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>First command</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );
      cy.contains('button', 'Open commands').click();
      cy.contains('[role="menuitem"]', 'First command').should('be.focused').realPress('Escape');
      cy.contains('[role="menuitem"]', 'First command').should('not.be.visible');
      cy.contains('button', 'Open commands').should('be.focused');
      cy.get('@onOpenChange').should('have.been.calledTwice');
      cy.then(() => {
        expect(onOpenChange.secondCall.args[1].open).to.be.false;
      });
    });
  });

  describe('with Tooltip wrapping MenuTrigger', () => {
    const TooltipWrappedMenuExample = () => (
      <Menu>
        <Tooltip hideDelay={0} showDelay={0} content="Click to open menu options" relationship="label">
          <MenuTrigger>
            <button id="tooltip-wrapped-trigger">Options</button>
          </MenuTrigger>
        </Tooltip>
        <MenuPopover>
          <MenuList>
            <MenuItem id="menu-item-1">New</MenuItem>
            <MenuItem id="menu-item-2">Open</MenuItem>
            <MenuItem id="menu-item-3">Save</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );

    it('should open menu when tooltip-wrapped trigger is clicked', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('exist');
      cy.get('#menu-item-1').should('not.be.visible');
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-1').should('be.visible');
      cy.get('#menu-item-2').should('be.visible');
      cy.get('#menu-item-3').should('be.visible');
    });

    it('should have tooltip accessible on the trigger', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-label', 'Click to open menu options');
    });

    it('should have proper ARIA haspopup and expanded attributes', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-haspopup', 'menu');
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should handle keyboard interaction (Enter) with tooltip-wrapped trigger', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').focus().realPress('Enter');
      cy.get('#menu-item-1').should('be.visible');
    });

    it('should allow menu item selection and close menu', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-2').should('be.visible');
      cy.get('#menu-item-2').click();
      cy.get('#menu-item-1').should('not.be.visible');
    });

    it('should dismiss on Escape even with tooltip wrapper', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-1').should('be.visible');
      cy.focused().realPress('Escape');
      cy.get('#menu-item-1').should('not.be.visible');
    });

    it('should show tooltip on hover without opening menu', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').trigger('pointerover');
      cy.get('[role="tooltip"]').should('be.visible');
      cy.get('[role="tooltip"]').should('contain.text', 'Click to open menu options');
      cy.get('#menu-item-1').should('not.be.visible');
    });
  });
});
