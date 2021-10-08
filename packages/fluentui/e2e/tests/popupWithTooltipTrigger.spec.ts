import { selectors } from './popupWithTooltipTrigger-example';

describe('Popup without `trigger`', () => {
  const trigger = `#${selectors.trigger}`;
  const content = `#${selectors.content}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, trigger);
  });

  it('Tooltip on trigger can be dismissed on ESC', () => {
    cy.hover(trigger);
    cy.visible(content);
    cy.type('{esc}');
    cy.notExist(content);
  });
});
