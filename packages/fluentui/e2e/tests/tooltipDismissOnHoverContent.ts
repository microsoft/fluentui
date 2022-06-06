import { selectors } from './tooltipDismissOnHoverContent-example';

const trigger = `.${selectors.triggerClassName}`;
const content = `.${selectors.contentClassName}`;

describe('Tooltip', () => {
  beforeEach(() => {
    cy.gotoTestCase(__filename, trigger);
  });

  it('Should close on content hover', () => {
    cy.clickOn(trigger);

    cy.exist(content);

    cy.hoverOn(content);

    cy.notExist(content);
  });
});
