type E2EKeys =
  | '{downarrow}'
  | '{leftarrow}'
  | '{rightarrow}'
  | '{uparrow}'
  | '{end}'
  | '{enter}'
  | '{esc}'
  | '{home}'
  | 'Tab'
  | '{pagedown}'
  | '{pageup}'
  | 'NumpadEnter'
  | 'F'
  | 'O'
  | '*'
  | 'T'
  | 'H'
  | CyrillicLetters;

type CyrillicLetters = 'т';

type modifier = 'Alt' | 'Control' | 'Meta' | 'Shift';

declare namespace Cypress {
  interface Chainable {
    gotoTestCase(testFilePath: string, waitForSelector: string): Chainable<Element>;
    goto(docsUrl: string, waitForSelector: string): Chainable<Element>;
    exist(selector: string): Chainable<Element>;
    notExist(selector: string): Chainable<Element>;
    nothingIsFocused(): Chainable<Element>;
    simulatePageMove(): Chainable<Element>;
    clickOn(selector: string): Chainable<Element>;
    mouseDownOn(selector: string): Chainable<Element>;
    focusOn(selector: string): Chainable<Element>;
    hoverOn(selector: string): Chainable<Element>;
    resizeViewport(width: number): Chainable<Element>;
    isFocused(selector: string): Chainable<Element>;
    expectTextOf(selector: string, text: string): Chainable<Element>;
    expectCount(selector: string, count: number): Chainable<Element>;
    notVisible(selector: string): Chainable<Element>;
    visible(selector: string): Chainable<Element>;
    waitForSelectorAndPressKey(selector: string, key: E2EKeys, modifier?: modifier): Chainable<Element>;
    hasComputedStyle(selector: string, property: keyof CSSStyleDeclaration, value: string): Chainable<Element>;
    hasPropertyValue(selector: string, property: string, value: string | number): Chainable<Element>;
  }
}
