// Regex that finds { and } so they can be removed on a lookup for string format
const FORMAT_ARGS_REGEX = /[\{\}]/g;

// Regex that finds {#} so it can be replaced by the arguments in string format
const FORMAT_REGEX = /\{\d+\}/g;

/**
 * String format method, used for scenarios where at runtime you
 * need to evaluate a formatted string given a tokenized string. This
 * usually only is needed in localization scenarios.

 * @example
 * ```tsx
 * "I love {0} every {1}".format("CXP")
 * ```
 * will result in a Debug Exception.
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function format(s: string, ...values: any[]): string {
  const args = values;
  // Callback match function
  function replaceFunc(match: string): string {
    // looks up in the args
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let replacement = args[match.replace(FORMAT_ARGS_REGEX, '') as any];

    // catches undefined in nondebug and null in debug and nondebug
    if (replacement === null || replacement === undefined) {
      replacement = '';
    }

    return replacement;
  }
  return s.replace(FORMAT_REGEX, replaceFunc);
}
