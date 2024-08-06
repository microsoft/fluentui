// Enquirer Type definitions are not in best state - https://github.com/enquirer/enquirer/pull/307
declare module 'enquirer' {
  type Choice = {
    name: string;
    message?: string;
    value: string;
  };
  export interface AutoCompleteOptions {
    name: string;
    message: string;
    choices: Array<string | Choice>;
    /**
     * Preselected item in the list of choices.
     * @default 0
     */
    initial?: number;
    limit?: number;
    header?: string;
    footer?: () => string;
    suggest?: (input: string, choices: Array<Choice>) => Array<Choice> | [];
  }

  export class AutoComplete {
    constructor(options: AutoCompleteOptions);
    public run(): Promise<string>;
  }
}
