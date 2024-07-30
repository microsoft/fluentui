import qs from 'qs';
import { expect, type Locator } from '@playwright/test';

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

interface FluentElement extends HTMLElement {
  elementInternals: ElementInternals;
}
/**
 * Evaluate whether an element has the given state or not on its `elementInternals` property.
 *
 * @param locator - The Playwright locator for the element.
 * @param state - The name of the state.
 * @param has - Whether the element is expected to have or not have the given state, defaults to `true`.
 */
export async function expectToHaveState(locator: Locator, state: string, has: boolean = true) {
  expect(await locator.evaluate((el: FluentElement, state: string) => el.elementInternals.states.has(state), state)).toBe(has);
}
