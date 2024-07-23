import type { ValueConverter } from '@microsoft/fast-element';

/**
 * A {@link ValueConverter} that makes sure the attribute and property values
 * are a string representation of a number, e.g. `'10'` instead of `10`.
 *
 * @remarks
 * This converter allows any data type, but if the data is evaluated as `NaN`
 * by `Number.isNaN()`, it’d be converted to an empty string. Otherwise, the
 * converted value is a string of number.
 *
 * It is useful for somm  custom element’s attributes and properties, e.g.
 * `min`, `max`, `step` on an `<input type=range>`-like element, to align with
 * the built-in HTML element behavior, those property values should be strings.
 *
 * @public
 */
export const numberLikeStringConverter: ValueConverter = {
  fromView(value: string): string {
    const valueAsNumber = parseFloat(value);
    return Number.isNaN(valueAsNumber) ? '' : valueAsNumber.toString();
  },
  toView(value: any): string | undefined {
    const valueAsNumber = parseFloat(value);
    return Number.isNaN(valueAsNumber) ? undefined : valueAsNumber.toString();
  },
};
