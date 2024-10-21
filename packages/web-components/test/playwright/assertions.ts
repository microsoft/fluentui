import { expect as baseExpect, ExpectMatcherState, type Locator } from '@playwright/test';

/**
 * Evaluate whether an element has the given state or not on its `elementInternals` property.
 *
 * @param locator - The Playwright locator for the element.
 * @param state - The name of the state.
 * @param expected - Whether the given state is expected to exist.
 * @param has - Whether the element is expected to have or not have the given state, defaults to `true`.
 */
export async function toHaveCustomState(
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
