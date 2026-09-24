import type * as Enquirer from 'enquirer';

export type PromptQuestions = Parameters<Enquirer['prompt']>[0];

export type PromptFunction = <T extends Record<string, unknown>>(questions: PromptQuestions) => Promise<T>;

/** Lazy-load interactive prompting so analyze and lint startup do not load Enquirer. */
export const prompt: PromptFunction = async <T extends Record<string, unknown>>(
  questions: PromptQuestions,
): Promise<T> => {
  type EnquirerModule = typeof import('enquirer');
  const imported = (await import('enquirer')) as EnquirerModule & { default?: EnquirerModule };
  const EnquirerLazy = imported.default ?? imported;
  return EnquirerLazy.prompt<T>(questions);
};
