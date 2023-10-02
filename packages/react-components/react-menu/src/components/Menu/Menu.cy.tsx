import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import {
  menuItemRadioSelector,
  menuItemCheckboxSelector,
  menuTriggerSelector,
  menuItemSelector,
  menuSelector,
  menuTriggerId,
} from '../../testing/selectors';

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
} from '@fluentui/react-menu';
import type { MenuProps } from '@fluentui/react-menu';
const mount = (element: JSX.Element) => {
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
        <MenuItem>Editor Layout</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Split Up</MenuItem>
          <MenuItem>Split Down</MenuItem>
          <MenuItem>Single</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const MenuL2Uncontrolled = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Appearance</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
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
        <MenuItem>Preferences</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <MenuL2Uncontrolled />
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
          <MenuItem>New </MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
          <MenuL1Uncontrolled />
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const MenuL22Controlled = () => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
      setOpen(data.open);
    };

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem>Editor Layout</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Split Up</MenuItem>
            <MenuItem>Split Down</MenuItem>
            <MenuItem>Single</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const MenuL2Controlled = () => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
      setOpen(data.open);
    };

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem>Appearance</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
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
          <MenuItem>Preferences</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Online Services Settings</MenuItem>
            <MenuItem>Extensions</MenuItem>
            <MenuL22Controlled />
            <MenuL2Controlled />
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
            <MenuItem>New </MenuItem>
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
