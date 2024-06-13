import { FluentProviderState } from './FluentProvider.types';

const noopResult = { styleTag: '', rule: '' };

export const useFluentProviderThemeStyleTag = (
  options: Pick<FluentProviderState, 'theme' | 'targetDocument'> & { rendererAttributes: Record<string, string> },
) => {
  return noopResult;
};
