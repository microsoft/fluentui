import type { Locator, Page } from '@playwright/test';

/**
 * A fixture for testing FAST components.
 */
export class FASTFixture {
  /**
   * The Playwright locator for the custom element.
   */
  public readonly element: Locator;

  /**
   * The tag name of the custom element.
   */
  private readonly tagName: string;

  /**
   * The inner HTML of the custom element.
   */
  private readonly innerHTML: string;

  constructor(public readonly page: Page, tagName: string, innerHTML: string) {
    this.tagName = tagName;
    this.innerHTML = innerHTML;
    this.element = this.page.locator(this.tagName);
  }

  async goto() {
    await this.page.goto('/');
  }

  private defaultTemplate(
    tagName: string = this.tagName,
    attributes: Record<string, string | true> = {},
    innerHTML: string = this.innerHTML,
  ) {
    const attributesString = Object.entries(attributes)
      .map(([key, value]) => {
        if (value === true) {
          return key;
        }

        return `${key}="${value.replace(/"/g, '')}"`;
      })
      .join(' ');

    return `<${tagName} ${attributesString}>${innerHTML}</${tagName}>`;
  }

  async setTemplate(
    templateOrOptions?:
      | string
      | {
          attributes?: Record<string, string | true>;
          innerHTML?: string;
        },
  ): Promise<void> {
    const template =
      typeof templateOrOptions === 'string'
        ? templateOrOptions
        : this.defaultTemplate(this.tagName, templateOrOptions?.attributes, templateOrOptions?.innerHTML);

    const body = this.page.locator('body');

    await body.evaluateHandle((node, template) => {
      const fragment = document.createRange().createContextualFragment(template);
      node.innerHTML = '';
      node.append(fragment);
    }, template);

    const bodyHandle = await body.elementHandle();
    if (bodyHandle) {
      await bodyHandle.waitForElementState('stable');
    }
  }

  async waitForCustomElement(tagName: string = this.tagName, ...tagNames: string[]) {
    if (!tagName && !tagNames.length) {
      return;
    }

    await this.page.waitForFunction(
      (tagNames: string[]) => Promise.all(tagNames.map(t => customElements.whenDefined(t))),
      [tagName, ...tagNames],
    );
  }
}
