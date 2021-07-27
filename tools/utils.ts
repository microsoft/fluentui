import * as yargsParser from 'yargs-parser';
import type * as Enquirer from 'enquirer';

/**
 *
 * Manual parser of CLI flags which follows similar definition like nx tao. @see https://github.com/nrwl/nx/blob/master/packages/tao/src/commands/generate.ts#L41
 *
 * Use this only if you need to setup manual dynamic prompts within your generator.
 * - prompts should be turned off whenever`--no-interactive` is used
 * - turning off prompts is usually what is expected when invoking generator via Nx Console
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseArgs<T extends Record<string, any>>(args: string[]) {
  type ParsedArguments = yargsParser.Arguments &
    T & {
      interactive: boolean;
    };

  const parsedArguments = yargsParser(args, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    boolean: ['interactive'],
    default: {
      interactive: process.env.NODE_ENV !== 'test',
    },
  }) as ParsedArguments;

  return parsedArguments;
}

export async function prompt<T extends Record<string, unknown>>(questions: Parameters<Enquirer['prompt']>[0]) {
  const enquirer = await await import('enquirer');

  const response = await enquirer.prompt<T>(questions);

  return response;
}

export { updateJestConfig } from '@nrwl/jest/src/generators/jest-project/lib/update-jestconfig';
