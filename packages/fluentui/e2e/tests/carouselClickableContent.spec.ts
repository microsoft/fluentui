import { selectors } from './carouselClickableContent-example';

describe('Carousel with clickable content', () => {
  const carousel = `.${selectors.CarouselClass}`;
  const button = `.${selectors.ItemButton}`;
  const hiddenContent = `.${selectors.HiddenContent}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, carousel);
  });

  it('Click the button should trigger callback showing previously hidden content', () => {
    cy.get(hiddenContent).should('not.exist');
    cy.clickOn(button);
    cy.get(hiddenContent).should('be.visible');
  });
});
