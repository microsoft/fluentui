import { selectors } from './tooltipUnhandledProps-example';

const trigger = `.${selectors.triggerClassName}`;
const menuItem = `.${selectors.menuItemClassName}`;

describe('Tooltip', () => {
  beforeEach(() => {
    cy.gotoTestCase(__filename, trigger);
  });

  it('Should spread unhandled props', () => {
    cy.clickOn(trigger);

    cy.exist(menuItem);
  });
});
