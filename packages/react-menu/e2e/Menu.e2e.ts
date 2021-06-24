const menuTriggerSelector = '[aria-haspopup="true"]';
const menuItemSelector = '[role="menuitem"]';
const menuItemCheckboxSelector = '[role="menuitemcheckbox"]';
const menuItemRadioSelector = '[role="menuitemradio"]';
const menuSelector = '[role="menu"]';

const defaultStory = 'Default';
const groupsStory = 'WithGroups';
const customTriggerStory = 'CustomTrigger';
const selectionGroupStory = 'SelectionGroup';
const nestedMenuStory = 'NestedSubmenus';
const nestedMenuControlledStory = 'NestedSubmenusControlled';

const menuStoriesTitle = 'Components/Menu';
const defaultMouseOverDelay = 250;

describe('Menu', () => {
  before(() => {
    cy.visitStorybook();
  });

  describe('MenuTrigger', () => {
    it('should open menu when clicked', () => {
      cy.loadStory(menuStoriesTitle, defaultStory)
        .get(menuTriggerSelector)
        .click()
        .get(menuSelector)
        .should('be.visible');
    });

    it('should focus first menu item on down arrow when focus is on the trigger', () => {
      cy.loadStory(menuStoriesTitle, defaultStory)
        .get(menuTriggerSelector)
        .click()
        .get(menuSelector)
        .should('be.visible')
        .get(menuTriggerSelector)
        .type('{downarrow}')
        .get(menuItemSelector)
        .first()
        .should('be.focused');
    });

    it('should close menu on escape when focus is on the trigger', () => {
      cy.loadStory(menuStoriesTitle, defaultStory)
        .get(menuTriggerSelector)
        .click()
        .get(menuSelector)
        .should('be.visible')
        .get(menuTriggerSelector)
        .type('{esc}')
        .get(menuSelector)
        .should('not.exist');
    });

    ['downarrow', 'enter', ' '].forEach(key => {
      it(`should open menu with ${key === ' ' ? 'space' : key} and focus first menuitem`, () => {
        cy.loadStory(menuStoriesTitle, defaultStory)
          .get(menuTriggerSelector)
          .focus()
          .type(`{${key}}`)
          .get(menuSelector)
          .should('be.visible')
          .get(menuItemSelector)
          .first()
          .should('be.focused');
      });
    });
  });

  describe('Custom Trigger', () => {
    it('should open menu when clicked', () => {
      cy.loadStory(menuStoriesTitle, customTriggerStory)
        .contains('Custom Trigger')
        .click()
        .get(menuSelector)
        .should('be.visible');
    });

    it('should dismiss the menu when click outside', () => {
      cy.loadStory(menuStoriesTitle, customTriggerStory)
        .contains('Custom Trigger')
        .click()
        .get('body')
        .click('bottomRight')
        .get(menuSelector)
        .should('not.exist');
    });
  });

  describe('MenuItem', () => {
    it('should close the menu when clicked', () => {
      cy.loadStory(menuStoriesTitle, defaultStory)
        .get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemSelector)
        .first()
        .click()
        .get(menuSelector)
        .should('not.be.exist');
    });

    it('should not close the menu when disabled on click', () => {
      cy.loadStory(menuStoriesTitle, defaultStory)
        .get(menuTriggerSelector)
        .trigger('click')
        .get('[aria-disabled="true"]')
        .first()
        .click()
        .get(menuSelector)
        .should('be.visible');
    });

    it('should focus on hover', () => {
      cy.loadStory(menuStoriesTitle, defaultStory)
        .get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemSelector)
        .each(el => {
          cy.wrap(el).trigger('mouseover').should('be.focused');
        });
    });
  });

  describe('MenuItemCheckbox', () => {
    it('should be selected on click', () => {
      cy.loadStory(menuStoriesTitle, selectionGroupStory)
        .get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemCheckboxSelector)
        .first()
        .click()
        .should('have.attr', 'aria-checked', 'true');
    });

    ['enter', ' '].forEach(key => {
      it(`should be selected on ${key === ' ' ? 'space' : key} key`, () => {
        cy.loadStory(menuStoriesTitle, selectionGroupStory)
          .get(menuTriggerSelector)
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
      cy.loadStory(menuStoriesTitle, selectionGroupStory)
        .get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemRadioSelector)
        .first()
        .click();

      cy.get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemRadioSelector)
        .first()
        .should('have.attr', 'aria-checked', 'true');
    });

    ['enter', ' '].forEach(key => {
      it(`should be selected on ${key === ' ' ? 'space' : key} key`, () => {
        cy.loadStory(menuStoriesTitle, selectionGroupStory)
          .get(menuTriggerSelector)
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
      cy.loadStory(menuStoriesTitle, selectionGroupStory)
        .get(menuTriggerSelector)
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

  describe(menuStoriesTitle, () => {
    it('should be dismissed with Escape', () => {
      cy.loadStory(menuStoriesTitle, defaultStory)
        .get(menuTriggerSelector)
        .click()
        .focused()
        .type('{esc}')
        .get(menuSelector)
        .should('not.exist');
    });

    it('should be dismissed on outside click', () => {
      cy.loadStory(menuStoriesTitle, defaultStory)
        .get(menuTriggerSelector)
        .click()
        .get('body')
        .click('bottomRight')
        .get(menuSelector)
        .should('not.exist');
    });

    it('should be dismissed on with {leftarrow} when not a submenu', () => {
      cy.loadStory(menuStoriesTitle, defaultStory)
        .get(menuTriggerSelector)
        .click()
        .focused()
        .type('{leftarrow}')
        .get(menuSelector)
        .should('be.visible');
    });

    it('should dismiss when clicking a menu item', () => {
      cy.loadStory(menuStoriesTitle, defaultStory)
        .get(menuTriggerSelector)
        .click()
        .get(menuItemSelector)
        .first()
        .click()
        .get(menuSelector)
        .should('not.exist');
    });

    it('should not dismiss when clicking a group header', () => {
      cy.loadStory(menuStoriesTitle, groupsStory)
        .get(menuTriggerSelector)
        .click()
        .get(menuSelector)
        .contains('header')
        .click()
        .get(menuSelector)
        .should('be.visible');
    });
  });

  // [nestedMenuStory, nestedMenuControlledStory].forEach(story => {
  [nestedMenuStory, nestedMenuControlledStory].forEach(story => {
    describe(`Nested Menus (${story.includes('Controlled') ? 'Controlled' : 'Uncontrolled'})`, () => {
      it('should open on trigger hover', () => {
        cy.loadStory(menuStoriesTitle, story)
          .get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuTriggerSelector).trigger('mousemove');
          })
          .get(menuSelector)
          .should('have.length', 2);
      });

      ['{rightarrow}', '{enter}', ' '].forEach(key => {
        it(`should open on trigger ${key === ' ' ? 'space' : key}`, () => {
          cy.loadStory(menuStoriesTitle, story)
            .get(menuTriggerSelector)
            .click()
            .get(menuSelector)
            .within(() => {
              cy.get(menuTriggerSelector).focus().type(key);
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
        // mocking the clock due to setTimeout used for mouseenter and mouseleave
        cy.loadStory(menuStoriesTitle, story).get(menuTriggerSelector).click();

        cy.get(menuSelector).within(() => {
          cy.get(menuTriggerSelector).trigger('mousemove');
        });
        cy.get(menuSelector).should('have.length', 2);

        // Mouseout is necessary because internally it will set a flag
        cy.get(menuSelector)
          .eq(0)
          .within(() => {
            cy.get(menuTriggerSelector).trigger('mouseout');
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
        cy.loadStory(menuStoriesTitle, story)
          .get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuTriggerSelector).click().focus().type('{rightarrow}');
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
          cy.loadStory(menuStoriesTitle, story)
            .get(menuTriggerSelector)
            .type('{rightarrow}')
            .get(menuSelector)
            .within(() => {
              cy.get(menuTriggerSelector).focus().type('{rightarrow}').focused().type(key);
            })
            .get(menuSelector)
            .should('have.length', 1);
        });
      });

      it(`should all close when a menu item in the nested menu is clicked`, () => {
        cy.loadStory(menuStoriesTitle, story)
          .get(menuTriggerSelector)
          .type('{rightarrow}')
          .get(menuSelector)
          .within(() => {
            cy.get(menuTriggerSelector).type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .within(() => {
            cy.get(menuItemSelector).first().click();
          })
          .get(menuSelector)
          .should('not.exist');
      });
    });
  });
});
