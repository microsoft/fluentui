import { selectors } from './popupDismissScroll-example';

describe('Popup - dismiss on scroll container', () => {
  beforeEach(() => {
    cy.gotoTestCase(__filename, `#${selectors.simplePopup.triggerId}`);
  });

  it('simple popup does not dismiss content on scroll', () => {
    cy.clickOn(`#${selectors.simplePopup.triggerId}`); // opens popup
    cy.visible(`#${selectors.simplePopup.contentId}`); // popup visible
    cy.get('body').trigger('wheel'); // page scroll
    cy.visible(`#${selectors.simplePopup.contentId}`); // popup still visible
  });

  it('popup on context dismiss content on scroll', () => {
    cy.get(`#${selectors.contextPopup.triggerId}`).rightclick(); // opens popup
    cy.visible(`#${selectors.contextPopup.contentId}`); // popup visible
    cy.get('body').trigger('wheel'); // page scroll
    cy.notExist(`#${selectors.contextPopup.contentId}`); // popup dismissed
  });

  it('popup with closeOnScroll prop dismiss content on scroll', () => {
    cy.clickOn(`#${selectors.dismissScrollPopup.triggerId}`); // opens popup
    cy.visible(`#${selectors.dismissScrollPopup.contentId}`); // popup visible
    cy.get('body').trigger('wheel'); // page scroll
    cy.notExist(`#${selectors.dismissScrollPopup.contentId}`); // popup dismissed
  });
});
