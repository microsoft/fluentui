import * as React from 'react';

export type SubtreeContextValue = {
  contextType: 'subtree';
  level: number;
};

/**
 * @internal
 */
const defaultSubTreeContextValue: SubtreeContextValue = {
  level: 0,
  contextType: 'subtree',
};

/**
 * @internal
 */
export const SubtreeContext: React.Context<SubtreeContextValue> = React.createContext<SubtreeContextValue | undefined>(
  undefined,
) as React.Context<SubtreeContextValue>;

export const useSubtreeContext_unstable = () => {
  return React.useContext(SubtreeContext) ?? defaultSubTreeContextValue;
};
