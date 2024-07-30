// Enquirer Type definitions are not in best state - https://github.com/enquirer/enquirer/pull/307
declare module 'enquirer' {
  export interface AutoCompleteOptions {
    name: string;
    message: string;
    choices: Array<string | { name: string; value: string }>;
    limit?: number;
    footer?: () => string;
  }

  export class AutoComplete {
    constructor(options: AutoCompleteOptions);
    public run(): Promise<string>;
  }
}
