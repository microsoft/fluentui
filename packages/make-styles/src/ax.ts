import { DEFINITION_LOOKUP_TABLE } from './constants';

/**
 * Function can take any number of arguments, joins classes together and deduplicates atomic declarations.
 *
 * Atomic declarations take the form of `f{property}{value}`, where both `property` and `value` are hashes **four**
 * characters long.
 *
 * Classnames can be of any length, this function can take both atomic declarations and class names.
 *
 * Input:
 * ```
 * ax('ui-button', 'faaaabbbb', 'faaaadddd')
 * ```
 *
 * Output:
 * ```
 * 'ui-button faaaadddd'
 * ```
 */
export function ax(...classNames: (string | undefined)[]): string;

export function ax(): string {
  // arguments are parsed manually to avoid double loops as TS & Babel transforms rest via an additional loop
  // @see https://babeljs.io/docs/en/babel-plugin-transform-parameters

  const atomicProperties: Record<string, string> = {};
  let resultClassName = '';

  for (let i = 0; i < arguments.length; i++) {
    // eslint-disable-next-line prefer-rest-params
    const argument = arguments[i];

    if (typeof argument === 'string') {
      const classNames = argument.split(' ');

      for (let x = 0; x < classNames.length; x++) {
        const atomicClassName = classNames[x];
        const cssProperty = DEFINITION_LOOKUP_TABLE[atomicClassName];

        if (cssProperty) {
          atomicProperties[cssProperty] = atomicClassName;
        } else {
          resultClassName += atomicClassName + ' ';
        }
      }
    }
  }

  // eslint-disable-next-line guard-for-in
  for (const property in atomicProperties) {
    resultClassName += atomicProperties[property] + ' ';
  }

  return resultClassName.slice(0, -1);
}
