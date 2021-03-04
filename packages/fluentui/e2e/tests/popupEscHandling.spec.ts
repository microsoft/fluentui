import { selectors } from './popupEscHandling-example';

const popupTrigger = `#${selectors.popupTriggerId}`;
const popupContent = `.${selectors.popupContentClass}`;
const dropdownTriggerButton = `.${selectors.dropdownTriggerClass}`;
const dropdownList = `.${selectors.dropdownListClass}`;

// https://github.com/microsoft/fluent-ui-react/issues/1079
describe('Popup - on ESC key press', () => {
  beforeEach(() => {
    cy.gotoTestCase(__filename, popupTrigger);
  });

  it('is not closed if ESC is handled by children', () => {
    cy.clickOn(popupTrigger);
    cy.visible(popupContent);

    cy.clickOn(dropdownTriggerButton); // opens dropdown list
    cy.visible(dropdownList);

    cy.waitForSelectorAndPressKey(dropdownList, '{esc}'); // closes dropdown list
    cy.visible(dropdownTriggerButton);
    cy.visible(popupContent);
    cy.isFocused(dropdownTriggerButton);
  });
});
