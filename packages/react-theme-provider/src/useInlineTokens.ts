import { TokenSet } from './types';
import { tokensToStyleObject } from './tokensToStyleObject';

/**
 * Hook which given draftState, will ensure that tokens are spit out to inline styles.
 * @param draftState - state to read and manipulate. Expected to have `tokens` prop, will
 * transform into inline
 * @param prefix - prefix to prepend to variables (e.g. "--button")
 */
export const useInlineTokens = (draftState: { style?: React.CSSProperties; tokens?: TokenSet }, prefix: string) => {
  const { tokens, style } = draftState;

  if (tokens) {
    draftState.style = style || {};
    tokensToStyleObject(tokens, prefix, draftState.style);
  }
};
