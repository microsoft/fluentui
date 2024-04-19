import * as React from 'react';
import { ActiveDescendantImperativeRef } from './types';

export type ActiveDescendantContextValue = {
  controller: ActiveDescendantImperativeRef;
};

const noop = () => undefined;

const activeDescendantContextDefaultValue: ActiveDescendantContextValue = {
  controller: {
    active: noop,
    blur: noop,
    find: noop,
    first: noop,
    focus: noop,
    last: noop,
    next: noop,
    prev: noop,
    showAttributes: noop,
    hideAttributes: noop,
  },
};

const ActiveDescendantContext = React.createContext<ActiveDescendantContextValue | undefined>(undefined);

export const ActiveDescendantContextProvider = ActiveDescendantContext.Provider;
export const useActiveDescendantContext = () =>
  React.useContext(ActiveDescendantContext) ?? activeDescendantContextDefaultValue;
export const useHasParentActiveDescendantContext = () => !!React.useContext(ActiveDescendantContext);
