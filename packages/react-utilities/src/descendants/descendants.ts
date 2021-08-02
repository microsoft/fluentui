import * as React from 'react';
import { useFirstMount, useIsomorphicLayoutEffect, useForceUpdate } from '../hooks/index';

export type Descendant = () => void;
export type Descendants = Descendant[];
export type SetDescendant = (descendant: Descendant) => number;

export interface DescendantsContextValue {
  /**
   * A record of descendants that have been registered by their id
   */
  descendants: Descendants;
  /**
   * add a descendant, if it hasn't been added before
   * @returns index of descendant
   */
  setDescendant: SetDescendant;
}

const DescendantsContext = React.createContext<DescendantsContextValue | undefined>(undefined);

/**
 * hook to initialize descendants,
 * Adding descendants with setDescendant will not trigger re-renders.
 * A component that wants to update its list of descendants should force
 * itself to re-render to get the latest order of descendants
 * @returns the record of descendants and a function to add new descendants
 */
export const useDescendants = () => {
  const isFirstMount = useFirstMount();
  const descendants = React.useRef<Descendants>([]);
  const setDescendant = React.useCallback(
    (descendant: Descendant) => {
      const index = descendants.current.indexOf(descendant);
      return index === -1 ? descendants.current.push(descendant) - 1 : index;
    },
    [descendants],
  );
  useIsomorphicLayoutEffect(() => {
    if (!isFirstMount) {
      for (const descendant of descendants.current) {
        descendant();
      }
      descendants.current = [];
    }
  });
  return [descendants.current, setDescendant] as const;
};

/**
 * @returns index of the current item within its parent's descendants list
 */
export function useIndex() {
  const forceUpdate = useForceUpdate();
  const context = React.useContext(DescendantsContext);
  const [index, setIndex] = React.useState(-1);
  useIsomorphicLayoutEffect(() => {
    if (context) {
      const nextIndex = context.setDescendant(forceUpdate);
      if (nextIndex !== index) {
        setIndex(nextIndex);
      }
    }
  });
  return index;
}

export const DescendantsProvider = DescendantsContext.Provider;
