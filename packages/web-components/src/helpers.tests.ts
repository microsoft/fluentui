import qs from 'qs';
import AxeBuilder from '@axe-core/playwright';
import { expect as baseExpect, type ExpectMatcherState, type Locator, type Page } from '@playwright/test';

/**
 * Returns a formatted URL for a given Storybook fixture.
 *
 * @param id - the Storybook fixture ID
 * @param args - Story args
 * @returns - the local URL for the Storybook fixture iframe
 */
export function fixtureURL(id: string = 'debug--blank', args?: Record<string, any>): string {
  const params: Record<string, any> = { id };
  if (args) {
    params.args = qs
      .stringify(args, {
        allowDots: true,
        delimiter: ';',
        format: 'RFC1738',
        encode: false,
      })
      .replace(/=/g, ':')
      .replace(/\//g, '--');
  }

  const url = qs.stringify(params, {
    addQueryPrefix: true,
    format: 'RFC1738',
    encode: false,
  });

  return url;
}

/**
 * Evaluate whether an element has the given state or not on its `elementInternals` property.
 *
 * @param locator - The Playwright locator for the element.
 * @param state - The name of the state.
 * @param expected - Whether the given state is expected to exist.
 * @param has - Whether the element is expected to have or not have the given state, defaults to `true`.
 */
async function toHaveCustomState(
  this: ExpectMatcherState,
  locator: Locator,
  state: string,
  options?: { timeout?: number },
) {
  const assertionName = 'toHaveCustomState';
  let pass: boolean;
  let matcherResult: any;
  const expected: boolean = !this.isNot;

  try {
    baseExpect(await locator.evaluate((el, state) => el.matches(`:state(${state})`), state, options)).toEqual(true);
    pass = true;
  } catch (err: any) {
    matcherResult = err.matcherResult;
    pass = false;
  }

  const message = pass
    ? () =>
        this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
        '\n\n' +
        `Locator: ${locator}\n` +
        `Expected: ${this.isNot ? 'not' : ''}${this.utils.printExpected(expected)}\n` +
        (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '')
    : () =>
        this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
        '\n\n' +
        `Locator: ${locator}\n` +
        `Expected: ${this.utils.printExpected(expected)}\n` +
        (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '');

  return {
    name: assertionName,
    message,
    pass,
    expected,
    actual: matcherResult?.actual,
  };
}

export const expect = baseExpect.extend({
  toHaveCustomState,
});

/**
 * A helper function to override the built-in `HTMLElement.prototype.attachInternals()`
 * method, the overridden `attachInternals()` would set ARIA-related attributes
 * on the host element when they are set on the `ElementInternals` object, so that
 * Axe is able to assess the element’s accessibility properly.
 * @see https://github.com/dequelabs/axe-core/issues/4259
 *
 * This function should be called before calling `page.goto(..)`. And it should
 * be contained in 1-2 tests per suite. It shouldn’t be used casually due to the
 * heavy-handedness of modifying built-in API.
 */
export async function createElementInternalsTrapsForAxe(page: Page) {
  await page.addInitScript(() => {
    function getAriaAttrName(prop: string | symbol): string | null {
      return typeof prop === 'string' && (prop === 'role' || prop.startsWith('aria'))
        ? prop.replace(/(?:aria)(\w+)/, (_, w) => `aria-${w.toLowerCase()}`)
        : null;
    }

    const original = HTMLElement.prototype.attachInternals;
    HTMLElement.prototype.attachInternals = function () {
      const originalInternals = original.call(this);

      return new Proxy({} as ElementInternals, {
        get(target, prop) {
          if (getAriaAttrName(prop)) {
            return Reflect.get(target, prop) ?? null;
          }

          const propValue = Reflect.get(originalInternals, prop);

          if (typeof propValue === 'function') {
            return propValue.bind(originalInternals);
          }

          return propValue;
        },
        set(target, prop, value) {
          const attrName = getAriaAttrName(prop);
          if (attrName) {
            Reflect.set(target, prop, value);
            const host = originalInternals.shadowRoot?.host;
            if (value !== null && value !== undefined) {
              host?.setAttribute(attrName, value.toString());
            } else {
              host?.removeAttribute(attrName);
            }
          }

          return Reflect.set(originalInternals, prop, value);
        },
      });
    };
  });
}

interface AnalyzePageWithAxeOptions {
  exclude: string[];
}
/**
 * Helper function to run Axe analysis. The main motivation of creating this
 * function is to centralize the `.include('.sb-story')` call in case Storybook
 * changes the class name in future.
 */
export async function analyzePageWithAxe(
  page: Page,
  options?: AnalyzePageWithAxeOptions,
): Promise<ReturnType<AxeBuilder['analyze']>> {
  let builder = new AxeBuilder({ page }).include('.sb-story');
  if (options?.exclude?.length) {
    for (const exclude of options.exclude) {
      builder = builder.exclude(exclude);
      console.log(builder);
    }
  }
  return await builder.analyze();
}
