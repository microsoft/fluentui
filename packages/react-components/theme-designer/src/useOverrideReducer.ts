import * as React from 'react';
import type { Theme } from '@fluentui/react-components';

export type OverrideState = {
  teamsLight: Partial<Theme>;
  teamsDark: Partial<Theme>;
  webLight: Partial<Theme>;
  webDark: Partial<Theme>;
  customLight: Partial<Theme>;
  customDark: Partial<Theme>;
};

export type DispatchOverride = { type: string; overrides: Partial<Theme> };

export const useOverrideReducer = () => {
  const initialState = {
    teamsLight: {},
    teamsDark: {},
    webLight: {},
    webDark: {},
    customLight: {},
    customDark: {},
  };

  const overrideReducer = (state: OverrideState, action: DispatchOverride) => {
    switch (action.type) {
      case 'Teams Light':
        return { ...state, teamsLight: { ...state.teamsLight, ...action.overrides } };
      case 'Teams Dark':
        return { ...state, teamsDark: { ...state.teamsDark, ...action.overrides } };
      case 'Web Light':
        return { ...state, webLight: { ...state.webLight, ...action.overrides } };
      case 'Web Dark':
        return { ...state, webDark: { ...state.webDark, ...action.overrides } };
      case 'Custom Light':
        return { ...state, customLight: { ...state.customLight, ...action.overrides } };
      case 'Custom Dark':
        return { ...state, customDark: { ...state.customDark, ...action.overrides } };
      default:
        return state;
    }
  };

  return React.useReducer(overrideReducer, initialState);
};
