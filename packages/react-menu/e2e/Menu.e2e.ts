const menuTriggerSelector = '[aria-haspopup="true"]';
const menuItemSelector = '[role="menuitem"]';
const menuItemCheckboxSelector = '[role="menuitemcheckbox"]';
const menuItemRadioSelector = '[role="menuitemradio"]';
const menuSelector = '[role="menu"]';

describe('MenuTrigger', () => {
  it('should open menu when clicked', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .should('be.visible')
      .get(menuItemSelector)
      .first()
      .should('be.focused');
  });

  ['downarrow', 'enter', ' '].forEach(key => {
    it(`should open menu with ${key === ' ' ? 'space' : key}`, () => {
      cy.visitStory('Menu', 'TextOnly')
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
    cy.visitStory('Menu', 'CustomTrigger')
      .contains('Custom Trigger')
      .click()
      .get(menuSelector)
      .should('be.visible');
  });

  it('should dismiss the menu when click outside', () => {
    cy.visitStory('Menu', 'CustomTrigger')
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
    cy.visitStory('Menu', 'TextOnly')
      .get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemSelector)
      .first()
      .click();

    cy.get(menuSelector).should('not.be.exist');
  });

  it('should not close the menu when disabled on click', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get(menuTriggerSelector)
      .trigger('click')
      .get('[aria-disabled="true"]')
      .first()
      .click();

    cy.get(menuSelector).should('be.visible');
  });

  it('should focus on hover', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemSelector)
      .each(el => {
        cy.wrap(el)
          .trigger('mouseover')
          .should('be.focused');
      });
  });
});

describe('MenuItemCheckbox', () => {
  it('should be selected on click', () => {
    cy.visitStory('Menu', 'SelectionGroup')
      .get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemCheckboxSelector)
      .first()
      .click();

    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemCheckboxSelector)
      .first()
      .should('have.attr', 'aria-checked', 'true');
  });

  ['enter', ' '].forEach(key => {
    it(`should be selected on ${key === ' ' ? 'space' : key} key`, () => {
      cy.visitStory('Menu', 'SelectionGroup')
        .get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemCheckboxSelector)
        .first()
        .click();

      cy.get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemCheckboxSelector)
        .first()
        .should('have.attr', 'aria-checked', 'true');
    });
  });
});

describe('MenuItemRadio', () => {
  it('should be selected on', () => {
    cy.visitStory('Menu', 'SelectionGroup')
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
      cy.visitStory('Menu', 'SelectionGroup')
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
  });

  it('should only have one item selected', () => {
    cy.visitStory('Menu', 'SelectionGroup')
      .get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .first()
      .click();

    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .eq(1)
      .click();

    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .eq(2)
      .click();

    cy.get(menuTriggerSelector)
      .trigger('click')
      .get('[aria-checked="true"]')
      .should('have.length', 1);
  });
});

describe('Menu', () => {
  it('should be dismissed with Escape', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get(menuTriggerSelector)
      .click()
      .focused()
      .type('{esc}')
      .get(menuSelector)
      .should('not.exist');
  });

  it('should be dismissed on outside click', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get(menuTriggerSelector)
      .click();

    cy.get('body').click('bottomRight');

    cy.get(menuSelector).should('not.exist');
  });

  it('should be dismissed on with {leftarrow} when not a submenu', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get(menuTriggerSelector)
      .click()
      .focused()
      .type('{leftarrow}')
      .get(menuSelector)
      .should('be.visible');
  });
});

describe('Nested menu', () => {
  it('should open on trigger hover', () => {
    cy.visitStory('Menu', 'NestedSubmenus')
      .get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .within(() => {
        cy.get(menuTriggerSelector).trigger('mouseover');
      })
      .get(menuSelector)
      .should('have.length', 2);
  });

  ['{rightarrow}', '{enter}', ' '].forEach(key => {
    it(`should open on trigger ${key === ' ' ? 'space' : key}`, () => {
      cy.visitStory('Menu', 'NestedSubmenus')
        .get(menuTriggerSelector)
        .click()
        .get(menuSelector)
        .within(() => {
          cy.get(menuTriggerSelector)
            .type(key)
            .get(menuSelector)
            .within(() => {
              cy.get(menuItemSelector)
                .first()
                .should('be.focused');
            });
        })
        .get(menuSelector)
        .should('have.length', 2);
    });
  });

  it('should close on hover parent menu item', () => {
    cy.visitStory('Menu', 'NestedSubmenus')
      .get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .within(() => {
        cy.get(menuTriggerSelector).click();
      })
      .get(menuItemSelector)
      .first()
      .trigger('mouseover')
      .get(menuSelector)
      .should('have.length', 1);
  });

  ['{leftarrow}', '{esc}'].forEach(key => {
    it(`should close on ${key}`, () => {
      cy.visitStory('Menu', 'NestedSubmenus')
        .get(menuTriggerSelector)
        .type('{rightarrow}')
        .get(menuSelector)
        .within(() => {
          cy.get(menuTriggerSelector)
            .type('{rightarrow}')
            .focused()
            .type(key);
        })
        .get(menuSelector)
        .should('have.length', 1);
    });
  });
});
