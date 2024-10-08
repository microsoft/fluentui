export {};

// Enquirer Type definitions are not in best state - https://github.com/enquirer/enquirer/pull/307
declare module 'enquirer' {
  import { Prompt } from 'enquirer';

  type Choice = {
    name: string;
    message?: string;
    value: string;
  };

  export class Confirm extends Prompt {
    constructor(options: { name: string; message: string });
  }

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
    footer?: string | (() => string);
    suggest?: (input: string, choices: Array<Choice<T>>) => Array<Choice> | [];
  }

  export class AutoComplete extends Prompt {
    constructor(options: AutoCompleteOptions);
  }

  interface InputOptions {
    name: string;
    message: string;
    initial?: string;
    hint?: string;
    header?: string;
    footer?: string;
  }
  export class Input extends Prompt {
    constructor(options: InputOptions);
  }

  interface SelectOptions {
    name: string;
    message: string;
    choices: Array<string | Choice>;
    footer?: string;
  }

  export class Select extends Prompt {
    constructor(options: SelectOptions);
  }

  interface NumberPromptOptions {
    name: string;
    message: string;
    footer?: string;
  }

  export class NumberPrompt extends Prompt {
    constructor(options: NumberPromptOptions);
  }
}
