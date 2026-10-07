import { mount as mountBase } from '@fluentui/scripts-cypress';
import { makeStyles } from '@griffel/react';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuGroup,
  MenuGroupHeader,
  MenuSplitGroup,
  type MenuProps,
  menuItemClassNames,
} from '@fluentui/react-menu';
import { FluentProvider } from '@fluentui/react-provider';
import { Portal } from '@fluentui/react-portal';
import { teamsLightTheme } from '@fluentui/react-theme';
import { useRestoreFocusTarget } from '@fluentui/react-tabster';
import * as React from 'react';

import {
  menuItemRadioSelector,
  menuItemCheckboxSelector,
  menuTriggerSelector,
  menuItemSelector,
  menuSelector,
  menuTriggerId,
} from '../../testing/selectors';

// eslint-disable-next-line @griffel/styles-file
const useStyles = makeStyles({
  pointerPortal: {
    zIndex: 10000000,
  },
});

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('MenuTrigger', () => {
  it('should open menu and focus first item when clicked', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .should('be.visible')
      .get(menuItemSelector)
      .should('be.focused');
  });

  it('should open menu on hover if openOnHover is set', () => {
    mount(
      <Menu openOnHover hoverDelay={1}>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .realHover()
      .wait(1)
      .get(menuSelector)
      .should('be.visible')
      .get(menuItemSelector)
      .should('be.focused');
  });

  it('should close menu on escape when focus is on the trigger', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .should('be.visible')
      .get(menuTriggerSelector)
      .type('{esc}')
      .get(menuSelector)
      .should('not.exist');
  });

  (['ArrowDown', 'Enter', 'Space'] as const).forEach(key => {
    it(`should open menu with ${key} and focus first menuitem`, () => {
      mount(
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      cy.get(menuTriggerSelector).focus().realPress(key);
      cy.get(menuSelector).should('be.visible').get(menuItemSelector).first().should('be.focused');
    });
  });

  it('should not automatically focus itself when mounted', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector).should('not.be.focused');
  });

  it('should not focus itself after re-render', () => {
    const Example = () => {
      const [count, setCount] = React.useState(0);

      React.useEffect(() => {
        // trigger 2 re-renders to make sure that the focus effect has finished running
        // after first re-render
        if (count < 2) {
          setCount(c => c + 1);
        }
      }, [count]);

      return (
        <>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <button data-status={count < 2 ? 'incomplete' : 'complete'} id={menuTriggerId}>
                Menu
              </button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Item</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <input type="text" />
        </>
      );
    };

    mount(<Example />);
    cy.get(menuTriggerSelector).should('have.attr', 'data-status', 'complete').should('not.be.focused');
  });
});

describe('Custom Trigger', () => {
  const CustomMenuTrigger = React.forwardRef<HTMLButtonElement, {}>((props, ref) => {
    return (
      <button id={menuTriggerId} {...props} ref={ref}>
        Custom Trigger
      </button>
    );
  });

  const CustomTriggerExample = () => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
      setOpen(data.open);
    };

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <CustomMenuTrigger />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  it('should open menu when clicked', () => {
    mount(<CustomTriggerExample />);

    cy.contains('Custom Trigger').click().get(menuSelector).should('be.visible');
  });

  it('should dismiss the menu when click outside', () => {
    mount(<CustomTriggerExample />);
    cy.contains('Custom Trigger').click().get('body').click('bottomRight').get(menuSelector).should('not.exist');
  });
});

describe('MenuItem', () => {
  it('should close the menu when clicked', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemSelector)
      .first()
      .click()
      .get(menuSelector)
      .should('not.be.exist');
  });

  it('should not close the menu when disabled on click', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem disabled>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .trigger('click')
      .get('[aria-disabled="true"]')
      .first()
      .click()
      .get(menuSelector)
      .should('be.visible');
  });

  it('should focus on hover', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemSelector)
      .each(el => {
        cy.wrap(el).trigger('mouseover').should('be.focused');
      });
  });
});

describe('MenuItemCheckbox', () => {
  it('should be selected on click', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox name="test" value="test">
              Item
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemCheckboxSelector)
      .first()
      .click()
      .should('have.attr', 'aria-checked', 'true');
  });

  ['enter', ' '].forEach(key => {
    it(`should be selected on ${key === ' ' ? 'space' : key} key`, () => {
      mount(
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemCheckbox name="test" value="test">
                Item
              </MenuItemCheckbox>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );
      cy.get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemCheckboxSelector)
        .first()
        .click()
        .should('have.attr', 'aria-checked', 'true');
    });
  });
});

describe('MenuItemRadio', () => {
  it('should be selected on', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemRadio name="test" value="test">
              Item
            </MenuItemRadio>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector).trigger('click').get(menuItemRadioSelector).first().click();

    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .first()
      .should('have.attr', 'aria-checked', 'true');
  });

  ['enter', ' '].forEach(key => {
    it(`should be selected on ${key === ' ' ? 'space' : key} key`, () => {
      mount(
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemRadio name="test" value="test">
                Item
              </MenuItemRadio>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );
      cy.get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemRadioSelector)
        .first()
        .click()
        .get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemRadioSelector)
        .first()
        .should('have.attr', 'aria-checked', 'true');
    });
  });

  it('should only have one item selected', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemRadio name="test" value="first">
              First
            </MenuItemRadio>
            <MenuItemRadio name="test" value="second">
              Second
            </MenuItemRadio>
            <MenuItemRadio name="test" value="third">
              Third
            </MenuItemRadio>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .first()
      .click()
      .get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .eq(1)
      .click()
      .get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .eq(2)
      .click()
      .get(menuTriggerSelector)
      .trigger('click')
      .get('[aria-checked="true"]')
      .should('have.length', 1);
  });
});

describe('Menu', () => {
  it('should not focus trigger on dismiss if another element is focused', () => {
    mount(
      <>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <input type="text" />
      </>,
    );
    cy.get(menuTriggerSelector).click().get(menuSelector).should('exist').get('input').realClick();

    cy.get('input').should('be.focused');
  });

  describe('Menu autofocus opt-out', () => {
    it('does not move body focus when toggling the option on a never-opened or already-closed menu', () => {
      const Example = () => {
        const [disableAutoFocus, setDisableAutoFocus] = React.useState(false);
        return (
          <>
            <button id="toggle-autofocus" onClick={() => setDisableAutoFocus(value => !value)}>
              Toggle autofocus
            </button>
            <Menu unstable_disableAutoFocus={disableAutoFocus}>
              <MenuTrigger disableButtonEnhancement>
                <button id={menuTriggerId}>Menu</button>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Item</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </>
        );
      };
      const assertBodyFocus = () => {
        cy.document().should(doc => expect(doc.activeElement).to.equal(doc.body));
      };
      mount(<Example />);
      cy.get(menuTriggerSelector).focus().blur();
      assertBodyFocus();
      cy.get('#toggle-autofocus').trigger('click');
      assertBodyFocus();
      cy.get('#toggle-autofocus').trigger('click');
      assertBodyFocus();
      cy.get(menuTriggerSelector).click();
      cy.contains('[role="menuitem"]', 'Item').should('be.focused').realPress('Escape');
      cy.get(menuTriggerSelector).should('be.focused').blur();
      assertBodyFocus();
      cy.get('#toggle-autofocus').trigger('click');
      assertBodyFocus();
      cy.get(menuSelector).should('not.exist');
    });

    it('supports an editable input-anchored menu without MenuTrigger', () => {
      const AnchoredExample = () => {
        const [input, setInput] = React.useState<HTMLInputElement | null>(null);
        const [open, setOpen] = React.useState(false);
        const restoreFocusTarget = useRestoreFocusTarget();
        return (
          <>
            <input
              ref={setInput}
              {...restoreFocusTarget}
              aria-label="Find actions"
              aria-haspopup="menu"
              aria-expanded={open}
              onChange={() => setOpen(true)}
              onKeyDown={event => {
                if (event.key === 'Escape' || event.key === 'Tab') {
                  setOpen(false);
                }
              }}
            />
            <Menu
              open={open}
              onOpenChange={(_, data) => setOpen(data.open)}
              unstable_disableAutoFocus
              positioning={{ target: input }}
            >
              <MenuPopover>
                <MenuList>
                  <MenuItem>New document</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </>
        );
      };
      mount(<AnchoredExample />);
      cy.get('input').focus();
      cy.realType('new');
      cy.get(menuSelector).should('be.visible');
      cy.get('input').should('be.focused').should('have.value', 'new');
      cy.contains('[role="menuitem"]', 'New document').focus().realPress('Escape');
      cy.get(menuSelector).should('not.exist');
      cy.get('input').should('be.focused');
      cy.realType('x');
      cy.get(menuSelector).should('be.visible');
      cy.get('input').should('be.focused').should('have.value', 'newx').realPress('Escape');
      cy.get(menuSelector).should('not.exist');
      cy.get('input').should('be.focused');
    });

    const Example = ({
      disableAutoFocus,
      initiallyOpen = false,
    }: {
      disableAutoFocus?: boolean;
      initiallyOpen?: boolean;
    }) => {
      const [open, setOpen] = React.useState(initiallyOpen);
      const [items, setItems] = React.useState(['Alpha', 'Beta']);
      return (
        <>
          <button id="before-editor">Before</button>
          <Menu open={open} onOpenChange={(_, data) => setOpen(data.open)} unstable_disableAutoFocus={disableAutoFocus}>
            <MenuTrigger disableButtonEnhancement>
              <input
                id="editor"
                aria-label="Find actions"
                defaultValue="abcdef"
                autoFocus
                onChange={() => setOpen(true)}
                onKeyDown={event => {
                  switch (event.key) {
                    case 'F2':
                      setItems(current => [...current].reverse());
                      break;
                    case 'F3':
                      setItems(['Gamma', 'Delta']);
                      break;
                    case 'F4':
                      setItems([]);
                      break;
                    case 'F5':
                      setItems(['Alpha', 'Beta']);
                      break;
                    case 'F8':
                      setOpen(current => !current);
                      break;
                    case 'Tab':
                      // Dismissal while focus is outside MenuPopover is the consumer's responsibility.
                      setOpen(false);
                      break;
                  }
                }}
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {items.map(item => (
                  <MenuItem key={item}>{item}</MenuItem>
                ))}
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <MenuItem>More actions</MenuItem>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem>Nested action</MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </MenuList>
            </MenuPopover>
          </Menu>
          <input id="unrelated-control" aria-label="Unrelated control" />
        </>
      );
    };

    const assertSelection = (start: number, end: number, direction: string) => {
      cy.get<HTMLInputElement>('#editor')
        .should('be.focused')
        .should(([input]) => {
          expect(input.selectionStart).to.equal(start);
          expect(input.selectionEnd).to.equal(end);
          expect(input.selectionDirection).to.equal(direction);
        });
    };

    [undefined, false].forEach(disableAutoFocus => {
      it(`autofocuses when the option is ${String(disableAutoFocus)}`, () => {
        mount(<Example disableAutoFocus={disableAutoFocus} />);
        cy.get('#editor').trigger('keydown', { key: 'F8' });
        cy.contains('[role="menuitem"]', 'Alpha').should('be.focused');
      });
    });

    it('preserves backward selection through opening, result updates, closing and reopening, and permits typing', () => {
      mount(<Example disableAutoFocus />);
      cy.get<HTMLInputElement>('#editor').then(([input]) => input.setSelectionRange(1, 4, 'backward'));
      cy.get('#editor').trigger('keydown', { key: 'F8' });
      cy.get(menuSelector).should('be.visible');
      assertSelection(1, 4, 'backward');

      ['F2', 'F3', 'F4', 'F5'].forEach((key, index) => {
        cy.get('#editor').trigger('keydown', { key });
        cy.get('[role="menuitem"]').should('have.length', index === 2 ? 1 : 3);
        cy.get('[role="menuitem"]').first().should('have.text', ['Beta', 'Gamma', 'More actions', 'Alpha'][index]);
        assertSelection(1, 4, 'backward');
      });

      cy.get('#editor').trigger('keydown', { key: 'F8' });
      cy.get(menuSelector).should('not.exist');
      assertSelection(1, 4, 'backward');
      cy.get('#editor').trigger('keydown', { key: 'F8' });
      cy.get(menuSelector).should('be.visible');
      assertSelection(1, 4, 'backward');
      cy.realType('x');
      cy.get('#editor').should('have.value', 'axef');
      assertSelection(2, 2, 'forward');
    });

    it('preserves a collapsed caret when initially open and typing updates the controlled menu', () => {
      mount(<Example disableAutoFocus initiallyOpen />);
      cy.get(menuSelector).should('be.visible');
      cy.get<HTMLInputElement>('#editor')
        .should('be.focused')
        .then(([input]) => input.setSelectionRange(3, 3, 'forward'));
      cy.get('#editor').trigger('keydown', { key: 'F3' });
      assertSelection(3, 3, 'forward');
      cy.realType('x');
      cy.get('#editor').should('have.value', 'abcxdef').should('be.focused');
    });

    it('supports navigation, typeahead, submenu autofocus, Escape restoration and selection after deliberate entry', () => {
      mount(<Example disableAutoFocus />);
      cy.get('#editor').trigger('keydown', { key: 'F8' });
      cy.contains('[role="menuitem"]', 'Alpha').focus().realPress('ArrowDown');
      cy.contains('[role="menuitem"]', 'Beta').should('be.focused');
      cy.realPress('A');
      cy.contains('[role="menuitem"]', 'Alpha').should('be.focused');
      cy.contains('[role="menuitem"]', 'More actions').focus().realPress('ArrowRight');
      cy.contains('[role="menuitem"]', 'Nested action').should('be.focused').realPress('Escape');
      cy.contains('[role="menuitem"]', 'More actions').should('be.focused').realPress('Escape');
      cy.get(menuSelector).should('not.exist');
      cy.get('#editor').should('be.focused').trigger('keydown', { key: 'F8' });
      cy.contains('[role="menuitem"]', 'Alpha').focus().realPress('Enter');
      cy.get(menuSelector).should('not.exist');
      cy.get('#editor').should('be.focused');
    });

    [false, true].forEach(shift => {
      it(`preserves native ${shift ? 'Shift+Tab' : 'Tab'} after deliberate entry and from the textbox`, () => {
        mount(<Example disableAutoFocus />);
        const keys = shift ? ['Shift' as const, 'Tab' as const] : 'Tab';
        const destination = shift ? '#before-editor' : '#unrelated-control';
        cy.get('#editor').trigger('keydown', { key: 'F8' });
        cy.contains('[role="menuitem"]', 'Alpha').focus().realPress(keys);
        cy.get(destination).should('be.focused');
        cy.get(menuSelector).should('not.exist');
        cy.get('#editor').focus().trigger('keydown', { key: 'F8' }).realPress(keys);
        cy.get(destination).should('be.focused');
        cy.get(menuSelector).should('not.exist');
      });
    });

    it('does not restore focus over an unrelated control on outside dismissal', () => {
      mount(<Example disableAutoFocus />);
      cy.get('#editor').trigger('keydown', { key: 'F8' });
      cy.get(menuSelector).should('be.visible');
      cy.get('#unrelated-control').realClick().should('be.focused');
      cy.get(menuSelector).should('not.exist');
      cy.get('#unrelated-control').should('be.focused');
    });

    it('respects the option for an initially open uncontrolled menu and subsequent reopen', () => {
      mount(
        <Menu defaultOpen unstable_disableAutoFocus>
          <MenuTrigger disableButtonEnhancement>
            <input id="editor" aria-label="Find actions" defaultValue="abcdef" autoFocus />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Alpha</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );
      cy.get(menuSelector).should('be.visible');
      cy.get<HTMLInputElement>('#editor')
        .should('be.focused')
        .then(([input]) => input.setSelectionRange(2, 2, 'forward'));
      cy.get('#editor').realPress('Escape');
      cy.get(menuSelector).should('not.exist');
      cy.get('#editor').trigger('click');
      cy.get(menuSelector).should('be.visible');
      assertSelection(2, 2, 'forward');
    });
  });

  it('should be dismissed with Escape', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .click()
      .focused()
      .type('{esc}')
      .get(menuSelector)
      .should('not.exist')
      .get(menuTriggerSelector)
      .should('be.focused');
  });

  it('should be dismissed on outside click', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector).click().get('body').click('bottomRight').get(menuSelector).should('not.exist');
  });

  it('should be dismissed on with {leftarrow} when not a submenu', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector).click().focused().type('{leftarrow}').get(menuSelector).should('be.visible');
  });

  it('should dismiss when clicking a menu item', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector).click().get(menuItemSelector).first().click().get(menuSelector).should('not.exist');
  });

  it('should not dismiss when clicking a group header', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Header</MenuGroupHeader>
              <MenuItem>Item</MenuItem>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .contains('Header')
      .click()
      .get(menuSelector)
      .should('be.visible');
  });

  it('should close on scroll when closeOnScroll is set', () => {
    mount(
      <Menu closeOnScroll>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .should('exist')
      .get('body')
      .trigger('wheel')
      .get(menuSelector)
      .should('not.exist');
  });

  it('should be able to tab to next element after the root trigger', () => {
    mount(
      <>
        <Menu closeOnScroll>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <button>After</button>
      </>,
    );

    cy.get(menuTriggerSelector).click().get(menuSelector).should('exist').realPress('Tab');
    cy.contains('After').should('be.focused').get(menuSelector).should('not.exist');
  });

  it('should be able to shift tab to previous element after the root trigger', () => {
    mount(
      <>
        <button>Before</button>
        <Menu closeOnScroll>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </>,
    );

    cy.get(menuTriggerSelector).click().get(menuSelector).should('exist').realPress(['Shift', 'Tab']);
    cy.contains('Before').should('be.focused').get(menuSelector).should('not.exist');
  });

  (['Enter', 'Space'] as const).forEach(key => {
    it(`should close menu and focus trigger on ${key}`, () => {
      mount(
        <Menu>
          <MenuTrigger>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      cy.get(menuTriggerSelector).click().get(menuSelector).should('exist').realPress(key);
      cy.get(menuSelector).should('not.exist').get(menuTriggerSelector).should('be.focused');
    });
  });
});

describe('SplitMenuItem', () => {
  const example = (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <button id={menuTriggerId}>Menu</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Item</MenuItem>
          <MenuSplitGroup>
            <MenuItem>Split item</MenuItem>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuItem />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Item</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuSplitGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
  it('should be able to reach the trigger with down arrow', () => {
    mount(example);
    cy.get(menuTriggerSelector).focus();

    // Can't find a better way than hard code the number of tabstops
    for (let i = 0; i < 3; i++) {
      cy.focused().focus().type('{downarrow}');
    }

    cy.focused().focus().type('{rightarrow}');
    cy.get(menuSelector).should('have.length', 2);
  });

  it('should be able to navigate horizontally within split item', () => {
    mount(example);
    cy.get(menuTriggerSelector).focus();

    // Can't find a better way than hard code the number of tabstops
    for (let i = 0; i < 3; i++) {
      cy.focused().focus().type('{downarrow}');
    }

    cy.focused()
      .focus()
      .type('{leftarrow}') // focus main action of split item
      .focused()
      .should('have.text', 'Split item')
      .focus()
      .type('{rightarrow}')
      .focused()
      .type('{rightarrow}'); // open submenu

    cy.get(menuSelector).should('have.length', 2);
  });
});

// [nestedMenuStory, nestedMenuControlledStory].forEach(story => {
describe(`Nested Menus`, () => {
  const MenuL22Uncontrolled = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem id="menu-l2-2-trigger">Editor Layout</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList id="menu-l2-2">
          <MenuItem>Split Up</MenuItem>
          <MenuItem>Split Down</MenuItem>
          <MenuItem>Single</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const MenuL21Uncontrolled = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem id="menu-l2-1-trigger">Appearance</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList id="menu-l2-1">
          <MenuItem>Centered Layout</MenuItem>
          <MenuItem>Zen</MenuItem>
          <MenuItem disabled>Zoom In</MenuItem>
          <MenuItem>Zoom Out</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const MenuL1Uncontrolled = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem id="menu-l1-trigger">Preferences</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList id="menu-l1">
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <MenuL21Uncontrolled />
          <MenuL22Uncontrolled />
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const UncontrolledExample = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <button id={menuTriggerId}>Toggle menu</button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
          <MenuL1Uncontrolled />
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const MenuL21Controlled = () => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
      setOpen(data.open);
    };

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem id="menu-l2-1-trigger">Editor Layout</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList id="menu-l2-1">
            <MenuItem>Split Up</MenuItem>
            <MenuItem>Split Down</MenuItem>
            <MenuItem>Single</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const MenuL22Controlled = () => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
      setOpen(data.open);
    };

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem id="menu-l2-2-trigger">Appearance</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList id="menu-l2-2">
            <MenuItem>Centered Layout</MenuItem>
            <MenuItem>Zen</MenuItem>
            <MenuItem disabled>Zoom In</MenuItem>
            <MenuItem>Zoom Out</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const MenuL1Controlled = () => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
      setOpen(data.open);
    };

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem id="menu-l1-trigger">Preferences</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList id="menu-l1">
            <MenuItem>Settings</MenuItem>
            <MenuItem>Online Services Settings</MenuItem>
            <MenuItem>Extensions</MenuItem>
            <MenuL21Controlled />
            <MenuL22Controlled />
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const ControlledExample = () => {
    return (
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New</MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
            <MenuL1Controlled />
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  ['controlled', 'uncontrolled'].forEach(scenario => {
    const Example = scenario === 'uncontrolled' ? UncontrolledExample : ControlledExample;

    describe(scenario, () => {
      it('should open on trigger hover and focus first item', () => {
        mount(<Example />);
        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).trigger('mousemove');
          })
          .get(menuSelector)
          .should('have.length', 2)
          .get(menuSelector)
          .eq(1)
          .within(() => {
            cy.get(menuItemSelector).first().should('be.focused');
          });
      });

      ['{rightarrow}', '{enter}', ' '].forEach(key => {
        it(`should open on trigger ${key === ' ' ? 'space' : key} and focus first item`, () => {
          mount(<Example />);
          cy.get(menuTriggerSelector)
            .click()
            .get(menuSelector)
            .within(() => {
              cy.get(menuItemSelector).eq(4).focus().type(key);
            })
            .get(menuSelector)
            .eq(1)
            .within(() => {
              cy.get(menuItemSelector).first().should('be.focused');
            })
            .get(menuSelector)
            .should('have.length', 2);
        });
      });

      it('should close on mouse enter parent menu', () => {
        mount(<Example />);
        cy.get(menuTriggerSelector).click();

        cy.get(menuSelector).within(() => {
          cy.get(menuItemSelector).eq(4).trigger('mousemove');
        });
        cy.get(menuSelector).should('have.length', 2);

        // Mouseout is necessary because internally it will set a flag
        cy.get(menuSelector)
          .eq(0)
          .within(() => {
            cy.get(menuItemSelector).eq(4).trigger('mouseout');
          });

        // move mouse over first element in nested menu
        cy.get(menuSelector)
          .eq(1)
          .within(() => {
            cy.get(menuItemSelector).eq(0).trigger('mouseover');
          });

        // move mouse back to the first element in the root menu
        cy.get(menuItemSelector).first().trigger('mouseover');
        cy.get(menuSelector).should('have.length', 1);
      });

      it('should focus first menuitem in an open submenu with right arrow from the trigger', () => {
        mount(<Example />);
        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).click().focus().type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .within(() => {
            cy.get(menuItemSelector).first().should('be.focused');
          })
          .get(menuSelector)
          .should('have.length', 2);
      });

      ['{leftarrow}', '{esc}'].forEach(key => {
        it(`should close on ${key}`, () => {
          mount(<Example />);
          cy.get(menuTriggerSelector)
            .click()
            .get(menuSelector)
            .within(() => {
              cy.get(menuItemSelector).eq(4).focus().type('{rightarrow}').focused().type(key);
            })
            .get(menuSelector)
            .should('have.length', 1);
        });
      });

      it(`should all close when a menu item in the nested menu is clicked`, () => {
        mount(<Example />);
        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .within(() => {
            cy.get(menuItemSelector).first().click();
          })
          .get(menuSelector)
          .should('not.exist');
      });

      it('should be able to tab to next element after the root trigger', () => {
        mount(
          <>
            <Example />
            <button>After</button>
          </>,
        );

        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .realPress('Tab');

        cy.contains('After').should('be.focused').get(menuSelector).should('not.exist');
      });

      it('should move focus out of document if menu trigger is the last focusable element in DOM', () => {
        mount(<Example />);

        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .realPress('Tab');

        cy.realPress(['Shift', 'Tab']);
        cy.get(menuTriggerSelector).should('be.focused');
      });

      it('should be able to shift tab to previous element after the root trigger', () => {
        mount(
          <>
            <button>Before</button>
            <Example />
          </>,
        );

        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .realPress(['Shift', 'Tab']);
        cy.contains('Before').should('be.focused').get(menuSelector).should('not.exist');
      });

      it('respects ".hoverDelay" for opening via hover', () => {
        mount(<Example />);

        cy.get(menuTriggerSelector).click();

        cy.get('#menu-l1-trigger').realHover();
        cy.get('#menu-l1').should('be.visible');

        cy.get('#menu-l2-2-trigger').realHover();
        cy.get('#menu-l2-2').should('be.visible');

        // Quickly hover over the second item to ensure it doesn't open due to the timeout
        cy.get('#menu-l2-1-trigger').realHover();
        cy.get('#menu-l2-2-trigger').realHover();

        cy.get('#menu-l2-1').should('not.exist');
        cy.get('#menu-l2-2').should('be.visible');
      });
    });
  });
});

describe('Context menu', () => {
  const ContextMenuExample = () => (
    <Menu openOnContext>
      <MenuTrigger disableButtonEnhancement>
        <button id={menuTriggerId}>trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  it('should open on right click ', () => {
    mount(<ContextMenuExample />);

    cy.get(menuTriggerSelector).rightclick().get(menuSelector).should('exist');
  });

  it('should not open if event is prevented', () => {
    mount(<ContextMenuExample />);
    cy.get(menuTriggerSelector).then(([trigger]) => {
      trigger.addEventListener('contextmenu', e => e.preventDefault(), { capture: true, once: true });
    });
    cy.get(menuTriggerSelector).rightclick().get(menuSelector).should('not.exist');
  });

  it('should close when the trigger is clicked', () => {
    mount(<ContextMenuExample />);

    cy.get(menuTriggerSelector)
      .rightclick()
      .get(menuSelector)
      .should('exist')
      .get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .should('not.exist')
      .get(menuTriggerSelector)
      .should('have.focus');
  });

  it('should close on scroll outside', () => {
    mount(<ContextMenuExample />);
    cy.get(menuTriggerSelector)
      .rightclick()
      .get(menuSelector)
      .should('exist')
      .get('body')
      .trigger('wheel')
      .get(menuSelector)
      .should('not.exist')
      .get(menuTriggerSelector)
      .should('have.focus');
  });

  it('should restore focus on escape', () => {
    mount(<ContextMenuExample />);
    cy.get(menuTriggerSelector)
      .rightclick()
      .get(menuSelector)
      .should('exist')
      .focused()
      .type('{esc}')
      .should('not.exist')
      .get(menuTriggerSelector)
      .should('have.focus');
  });
});

/**
 * Cypress doesn't display the cursor position in the viewport, this component shows a red dot at the mouse position.
 */
const DebugPointer: React.FC = () => {
  const styles = useStyles();
  const pointerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      if (pointerRef.current) {
        pointerRef.current.style.left = `${event.x - 2}px`;
        pointerRef.current.style.top = `${event.y - 2}px`;
      }
    }

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <Portal mountNode={{ className: styles.pointerPortal }}>
      <div
        style={{
          borderRadius: '4px',
          pointerEvents: 'none',
          background: 'red',
          height: '4px',
          width: '4px',
          position: 'fixed',
        }}
        ref={pointerRef}
      />
    </Portal>
  );
};

const MenuWithSafeZoneExample = () => {
  // TODO: remove once "safeZone" is enabled by default
  const menuProps = { safeZone: true } as unknown as MenuProps;

  return (
    <Menu {...menuProps} open>
      <MenuTrigger disableButtonEnhancement>
        <button>root trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>item 1</MenuItem>
          <Menu {...menuProps}>
            <MenuTrigger>
              <MenuItem id="item-2">item 2</MenuItem>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem id="secondary-item-2a">secondary item 1A</MenuItem>
                <MenuItem>secondary item 1B</MenuItem>
                <MenuItem>secondary item 1C</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <Menu {...menuProps}>
            <MenuTrigger>
              <MenuItem id="item-3">item 3</MenuItem>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem id="secondary-item-3a">secondary item 1A</MenuItem>
                <MenuItem>secondary item 1B</MenuItem>
                <MenuItem>secondary item 1C</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <MenuItem id="item-4">item 4</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

describe('safeZone', () => {
  it('safe zone prevents a submenu from being closed', () => {
    mount(
      <>
        <DebugPointer />
        <MenuWithSafeZoneExample />
      </>,
    );

    cy.get('#item-2').should('be.visible');

    cy.get('#item-2').realHover();
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.get('#item-4').realHover();
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.clock(0).then(() => {
      cy.tick(500);
      cy.get('#secondary-item-2a').should('be.visible');
      cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

      cy.tick(2000);
      cy.get('#secondary-item-2a').should('not.exist');
      cy.get('[data-safe-zone]').should('not.exist');
    });
  });

  it('should not be able to open the menu if the safe zone is clicked', () => {
    mount(
      <>
        <DebugPointer />
        <MenuWithSafeZoneExample />
      </>,
    );

    cy.get('#item-2').should('be.visible');

    cy.get('#item-2').realHover();
    cy.get('#secondary-item-2a').should('be.visible');
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.clock(0).then(() => {
      cy.tick(500);
      cy.get('#secondary-item-2a').should('be.visible');
      cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

      cy.get('#secondary-item-2a').realHover();
      cy.get('[data-safe-zone]').should('have.css', 'display', 'none');
    });
  });

  it('another submenu could be opened once a safe zone timeouts', () => {
    mount(
      <>
        <DebugPointer />
        <MenuWithSafeZoneExample />
      </>,
    );

    cy.get('#item-2').should('be.visible');

    cy.get(`#item-2 .${menuItemClassNames.submenuIndicator}`).realHover();
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.get(`#item-3 .${menuItemClassNames.submenuIndicator}`).realHover();
    cy.get('#secondary-item-2a').should('be.visible');
    cy.get('#secondary-item-3a').should('not.exist');

    cy.clock(0).then(() => {
      cy.tick(2000);

      cy.get('#secondary-item-2a').should('not.exist');
      cy.get('#secondary-item-3a').should('be.visible');
    });
  });
});
