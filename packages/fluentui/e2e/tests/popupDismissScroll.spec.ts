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

  describe('nested popup on context', () => {
    const openNestedPopups = () => {
      cy.get(`#${selectors.nestedPopup.parentPopupTriggerId}`).rightclick(); // opens popup 1
      cy.visible(`#${selectors.nestedPopup.childPopupTriggerId}`); // popup 1 visible

      cy.get(`#${selectors.nestedPopup.childPopupTriggerId}`).click(); // opens popup 2
      cy.visible(`#${selectors.nestedPopup.childPopupContentId}`); // nested popup 2 visible
    };

    it('dismiss on scroll document', () => {
      openNestedPopups();

      cy.get('body').trigger('wheel'); // page scroll
      cy.notExist(`#${selectors.nestedPopup.childPopupTriggerId}`);
      cy.notExist(`#${selectors.nestedPopup.childPopupContentId}`); // both popups dismissed
    });

    it('does not dismiss on scroll child popup', () => {
      openNestedPopups();

      cy.get(`#${selectors.nestedPopup.childPopupContentId}`).trigger('wheel'); // popup 2 scroll
      cy.wait(100);

      cy.visible(`#${selectors.nestedPopup.childPopupTriggerId}`);
      cy.visible(`#${selectors.nestedPopup.childPopupContentId}`); // both popups still visible
    });
  });
});
