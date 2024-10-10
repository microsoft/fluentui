import { expect as baseExpect, test as baseTest } from '@playwright/test';
import { FASTFixture } from './fixtures/fast-fixture.js';
import { toHaveCustomState } from './assertions/to-have-custom-state.js';

type FixtureOptions = {
  /**
   * Additional HTML to insert into the element.
   */
  innerHTML: string;
  /**
   * The tag name of the custom element to test.
   */
  tagName: string;
  /**
   * Additional custom elements to wait for before running the test.
   */
  waitFor: string[];
};

type Fixtures = {
  fastPage: FASTFixture;
};

export const test = baseTest.extend<Fixtures & FixtureOptions>({
  innerHTML: ['', { option: true }],

  tagName: ['', { option: true }],

  waitFor: [[], { option: true }],

  fastPage: async ({ page, innerHTML, tagName, waitFor, baseURL }, use) => {
    const fastPage = new FASTFixture(page, tagName, innerHTML, baseURL ?? 'http://localhost:5173');
    await fastPage.goto();
    await fastPage.waitForCustomElement(tagName, ...waitFor);
    await fastPage.setTemplate();

    await use(fastPage);
  },
});

export const expect = baseExpect.extend({
  toHaveCustomState,
});
