// Regex that finds { and } so they can be removed on a lookup for string format
const FORMAT_ARGS_REGEX = /[\{\}]/g;

// Regex that finds {#} so it can be replaced by the arguments in string format
const FORMAT_REGEX = /\{\d+\}/g;

/**
 * String Format is like C# string format.
 * Usage Example: "hello {0}!".format("mike") will return "hello mike!"
 * Calling format on a string with less arguments than specified in the format is invalid
 * Example "I love {0} every {1}".format("CXP") will result in a Debug Exception.
 *
 * @public
 */
export function format(s: string, ...values: any[]): string {
  'use strict';

  let args = values;
  // Callback match function
  function replace_func(match: string) {
    // looks up in the args
    let replacement = args[match.replace(FORMAT_ARGS_REGEX, '') as any];

    // catches undefined in nondebug and null in debug and nondebug
    if (replacement === null || replacement === undefined) {
      replacement = '';
    }

    return replacement;
  }
  return (s.replace(FORMAT_REGEX, replace_func));
}