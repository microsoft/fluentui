import { DEFINITION_LOOKUP_TABLE, SEQUENCE_PREFIX } from './constants';
import { hashString } from './runtime/utils/hashString';
import { MakeStylesMatchedDefinitions } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cachedResults: any = {};

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

  let resultClassName = '';

  let sequenceMatch = '';
  const sequenceMappings: MakeStylesMatchedDefinitions[] = [];

  for (let i = 0; i < arguments.length; i++) {
    // eslint-disable-next-line prefer-rest-params
    const argument = arguments[i];

    if (typeof argument === 'string') {
      const sequenceIndex = argument.indexOf(SEQUENCE_PREFIX);

      if (sequenceIndex === -1) {
        resultClassName += argument + ' ';
      } else {
        const sequenceId = argument.slice(sequenceIndex, sequenceIndex + 9);
        const sequenceMapping = DEFINITION_LOOKUP_TABLE[sequenceId];

        if (sequenceIndex > 0) {
          resultClassName += argument.slice(0, sequenceIndex);
        }

        if (sequenceMapping) {
          sequenceMatch += sequenceId;
          sequenceMappings.push(sequenceMapping);
        }
      }
    }
  }

  const cachedResult = cachedResults[sequenceMatch];

  if (cachedResult) {
    return resultClassName + cachedResult;
  }

  const mergedSequences: MakeStylesMatchedDefinitions = {};

  for (let k = 0, v = sequenceMappings.length; k < v; k++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.assign(mergedSequences, sequenceMappings[k]);
  }

  let kk = '';

  // eslint-disable-next-line guard-for-in
  for (const property in mergedSequences) {
    kk += mergedSequences[property][0] + ' ';
  }

  const zk = kk.slice(0, -1);
  const zkk = zk.length > 0 ? SEQUENCE_PREFIX + hashString(zk) + ' ' + zk : '';
  cachedResults[sequenceMatch] = zkk;
  DEFINITION_LOOKUP_TABLE[SEQUENCE_PREFIX + hashString(zk)] = mergedSequences;

  return zk.length > 0 ? resultClassName + zkk : resultClassName.slice(0, -1);
}
