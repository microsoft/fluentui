import type { ArgumentsCamelCase } from 'yargs';

/**
 * A command handler function that receives parsed CLI arguments.
 */
export type CommandHandler<T = {}> = (argv: ArgumentsCamelCase<T>) => Promise<void>;
