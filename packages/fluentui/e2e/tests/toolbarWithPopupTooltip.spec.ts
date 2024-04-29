import { clickSelectors, hoverSelectors } from './toolbarWithPopupTooltip-example';

const firstItem = `#${clickSelectors.triggerId}`;
const secondItem = `#${hoverSelectors.triggerId}`;

const firstTooltip = `#${clickSelectors.contentId}`;
const secondTooltip = `#${hoverSelectors.contentId}`;

const firstPopup = `#${clickSelectors.popupId}`;
const secondPopup = `#${hoverSelectors.popupId}`;

describe('Toolbar with popup and Tooltip', () => {
  beforeEach(() => {
    cy.gotoTestCase(__filename, firstItem);
  });

  it('Tooltip can be dismissed on ESC', () => {
    cy.focusOn(firstItem); // focus on 1st item

    cy.realPress('{rightarrow}'); // focus on 2nd item
    cy.isFocused(secondItem);
    cy.visible(secondTooltip); // expect tooltip for 2nd item visible
    cy.waitForSelectorAndPressKey(secondTooltip, '{esc}');
    cy.notVisible(secondTooltip); // expect tooltip dismiss

    cy.realPress('{leftarrow}'); // focus back on 1st item
    cy.visible(firstTooltip); // expect tooltip for 1st item visible
    cy.waitForSelectorAndPressKey(firstTooltip, '{esc}');
    cy.notVisible(firstTooltip); // expect tooltip dismiss
  });

  it('Tooltip can be dismissed on arrow navigation', () => {
    cy.focusOn(firstItem); // focus on 1st item

    cy.realPress('{rightarrow}'); // focus on 2nd item
    cy.isFocused(secondItem);
    cy.visible(secondTooltip); // expect tooltip for 2nd item visible

    cy.realPress('{leftarrow}'); // focus back on 1st item
    cy.visible(firstTooltip); // expect tooltip for 1st item visible
    cy.notVisible(secondTooltip); // expect tooltip for 2nd item dismiss

    cy.realPress('{rightarrow}'); // focus on 2nd item again
    cy.visible(secondTooltip); // expect tooltip for 2nd item visible
    cy.notVisible(firstTooltip); // expect tooltip for 1st item dismiss
  });

  it('Popup still works as expected', () => {
    cy.clickOn(firstItem);
    cy.visible(firstPopup);
    cy.waitForSelectorAndPressKey(firstPopup, '{esc}');

    cy.hoverOn(secondItem);
    cy.visible(secondPopup);
  });
});
