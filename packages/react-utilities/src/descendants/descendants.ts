import * as React from 'react';
import { useId, useFirstMount, useIsomorphicLayoutEffect } from '../hooks/index';

export type Descendant = { id: string; forceUpdate: () => void };
export type Descendants = Record<string, Descendant>;
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
  const descendants = React.useRef<Descendants>({});
  const order = React.useRef<string[]>([]);
  const setDescendant = React.useCallback((descendant: Descendant) => {
    descendants.current[descendant.id] = descendant;
    const index = order.current.indexOf(descendant.id);
    return index === -1 ? order.current.push(descendant.id) - 1 : index;
  }, []);
  useIsomorphicLayoutEffect(() => {
    if (!isFirstMount) {
      order.current = [];
      for (const key in descendants.current) {
        if (descendants.current.hasOwnProperty(key)) {
          descendants.current[key].forceUpdate();
        }
      }
    }
  });
  return [descendants.current, setDescendant] as const;
};

/**
 * @returns index of the current item within its parent's descendants list
 */
export function useIndex(providedID?: string) {
  const forceUpdate = useForceUpdate();
  const context = React.useContext(DescendantsContext);
  const id = useId('descendant-', providedID);
  return context ? context.setDescendant({ id, forceUpdate }) : -1;
}

export const DescendantsProvider = DescendantsContext.Provider;

/**
 * Forces a re-render, similar to `forceUpdate` in class components.
 */
function useForceUpdate() {
  return React.useReducer(() => ({}), {})[1];
}
