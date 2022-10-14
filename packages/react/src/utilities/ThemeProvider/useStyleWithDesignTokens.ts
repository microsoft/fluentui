import { useContext } from 'react';
import { DesignTokensContext } from '../../index.bundle';

/**
 * React hook for programmatically accessing the styleWithDesignTokens on context.
 */
export const useStyleWithDesignTokens = (): boolean => {
  const context = useContext(DesignTokensContext);

  return context?.styleWithDesignTokens ?? false;
};
