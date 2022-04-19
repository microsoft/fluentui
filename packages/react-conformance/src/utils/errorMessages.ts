import chalk from 'chalk';
import { EOL } from 'os';

/** Console message colors used in the test. */
export const errorMessageColors = {
  // Colors for the defaultErrorMessage section.
  testErrorText: chalk.yellow,
  testErrorName: chalk.white,
  testErrorInfo: chalk.green,
  testErrorPath: chalk.green.italic,
  // Colors for the resolveErrorMessages section.
  resolveText: chalk.cyan,
  resolveInfo: chalk.hex('#e00000'),
  // Colors for the receivedErrorMessage section.
  receivedErrorHeader: chalk.white.bold.bgRed,
  // Other colors.
  failedError: chalk.red,
  // Color for section headers.
  sectionBackground: chalk.white.bold.italic.bgHex('#2e2e2e'),
};

export function getErrorMessage(params: {
  /** Component display name */
  displayName: string;
  /** Overall error description */
  overview: string;
  /** More details about the error (single line spacing, so include empty strings for blank lines) */
  details?: string[];
  /** Suggestions for fixing the error */
  suggestions?: string[];
  /** Original error */
  error?: Error;
}) {
  const { testErrorText, testErrorName, resolveText, sectionBackground, receivedErrorHeader } = errorMessageColors;
  const { displayName, overview, details = [], error, suggestions } = params;

  const messageParts = [testErrorText(`It appears that ${testErrorName(displayName)} ${overview}`)];
  if (details) {
    messageParts.push(details.join(EOL));
  }

  if (suggestions) {
    messageParts.push(
      sectionBackground('Possible solutions:'),
      suggestions.map((msg, i) => resolveText(`${i + 1}. ${msg}`)).join(EOL),
    );
  }

  if (error) {
    messageParts.push(
      `Also check the ${receivedErrorHeader('original error message')} in case there's some other issue:`,
      error.stack || error.message || String(error),
    );
  }

  return messageParts.join(EOL + EOL);
}

/**
 * Formats an array of strings to be displayed in the console.
 */
export function formatArray(arr: string[] | undefined) {
  return arr ? arr.map(value => `    ${value}`).join(EOL) : 'received undefined';
}

/**
 * Formats an object with props & errors strings to be displayed in the console.
 */
export function formatErrors(value: Record<string, Error> | undefined) {
  return value
    ? Object.entries(value)
        .map(([propName, error]) => `    ${propName}: ${error.message}`)
        .join(EOL)
    : 'received undefined';
}
