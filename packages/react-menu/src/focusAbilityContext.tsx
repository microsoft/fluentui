import * as React from 'react';
import { Types, getDeloser, getModalizer, createAbilityHelpers } from 'ability-helpers';

const FocusAbilityContext = React.createContext<FocusAbilityContext | null>(null);

export interface FocusAbilityContext {
  ah: Types.AbilityHelpersCore;
  deloser: Types.DeloserAPI;
  modalizer: Types.ModalizerAPI;
}

export const useFocusAbilityContext = () => React.useContext(FocusAbilityContext);
export const FocusAbilityContextProvider = (props: { children: React.ReactNode }) => {
  const context = useFocusAbilityContext();
  let value = context;

  if (value === null) {
    const ah = createAbilityHelpers(window, { autoRoot: true });
    value = {
      ah,
      deloser: getDeloser(ah),
      modalizer: getModalizer(ah),
    };
  }

  return <FocusAbilityContext.Provider value={value}>{props.children}</FocusAbilityContext.Provider>;
};
